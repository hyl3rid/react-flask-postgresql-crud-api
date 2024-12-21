from flask import Flask, jsonify, request, redirect
import psycopg2
from flask_cors import CORS
import os

import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

# add authentication use environment variables

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.environ["JWT_PASSWORD"]
jwt = JWTManager(app)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
                            database='hyl3rid',
                            # host='127.0.0.1',
                            # port='5432',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD']
                            )
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute('SELECT * FROM book_shelf;')
        books = cur.fetchall()
        row_headers=[x[0] for x in cur.description]
    conn.close()
    json_data=[]
    for result in books:
        json_data.append(dict(zip(row_headers,result)))
    response =  jsonify(json_data)
    return response

@app.route('/add', methods=['POST'])
def add():
    if request.method == 'POST':
        book_name = request.json['bookName']
        author = request.json['author']
        cover_image = request.json['coverImage']    
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO book_shelf (book_name, author, cover_image)'
                    'VALUES(%s, %s, %s);',
                    (book_name, author, cover_image))
        conn.commit()
        cur.close()
        conn.close()
        return redirect("/")

@app.route('/delete/<id>', methods=["DELETE"])
def delete(id):
    if request.method == 'DELETE':
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM book_shelf WHERE id = %s;',
                    (id,))
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM book_shelf;')
            books = cur.fetchall()
            row_headers=[x[0] for x in cur.description]
        json_data=[]
        for result in books:
            json_data.append(dict(zip(row_headers,result)))
        conn.commit()
        conn.close()
        return jsonify(json_data)

@app.route('/update/<id>/<index>', methods=['PUT'])
def update(id, index):
    if request.method == 'PUT':
        conn = get_db_connection()
        book_name = request.json[int(index)]['book_name']
        author = request.json[int(index)]['author']
        cover_image = request.json[int(index)]['cover_image']
        with conn.cursor() as cur:
            if book_name:
                cur.execute('UPDATE book_shelf SET book_name = %s WHERE id = %s;',
                            (book_name, id))
            if author:
                cur.execute('UPDATE book_shelf SET author = %s WHERE id = %s;',
                            (author, id))
            if cover_image:
                cur.execute('UPDATE book_shelf SET cover_image = %s WHERE id = %s;',
                            (cover_image, id))
        conn.commit()
        conn.close()
        return jsonify("Success updating", 204)

@app.errorhandler(Exception)
def handle_exception(e):
    response = {
        "error": str(e),
        "message": "An error occured. Please try again."
    }
    return jsonify(response), 500
    
# Authentication with JWT
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json["email"]
    password = request.json["password"]
    if email != "test" or password != "test":
        return jsonify({"msg": "Wrong email or password"}), 401
    
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return jsonify(response)

@app.route('/profile')
@jwt_required() 
def my_profile():
    response_body = {
        "name": "Clifford",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body

@app.route("/logout")
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response