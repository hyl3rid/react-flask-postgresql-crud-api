import os 
import psycopg2

conn = psycopg2.connect(
    host="127.0.0.1",
    database="hyl3rid",
    user=os.environ['DB_USERNAME'],
    password=os.environ['DB_PASSWORD']
)

cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS book_shelf;')
cur.execute('CREATE TABLE book_shelf (id serial PRIMARY KEY,'
                'book_name varchar (50) NOT NULL,'
                'author varchar (30) NOT NULL,'
                'cover_image varchar (500) NOT NULL'
            ');')
cur.execute('INSERT INTO book_shelf (book_name, author, cover_image)'
            'VALUES (%s, %s, %s);',
            ('Lord of the Rings',
             'J.R.R. Tolkien',
             'https://s26162.pcdn.co/wp-content/uploads/2017/05/the-lord-of-the-rings-book-cover.jpg')
            )

cur.execute('INSERT INTO book_shelf (book_name, author, cover_image)'
            'VALUES (%s, %s, %s);',
            ('Harry Potter And The Sorcerer\'s Stone',
             'J.K. Rowling',
             'https://m.media-amazon.com/images/I/81DI+BAN2SL._SL1200_.jpg')
            )

cur.execute('INSERT INTO book_shelf (book_name, author, cover_image)'
            'VALUES (%s, %s, %s);',
            ('Paradise Lost',
             'John Milton',
             'https://m.media-amazon.com/images/I/91VLH-RiffL._SL1500_.jpg')
            )
            
cur.execute('INSERT INTO book_shelf (book_name, author, cover_image)'
            'VALUES (%s, %s, %s);',
            ('The Call Of Cthulhu',
             'H.P. Lovecraft',
             'https://m.media-amazon.com/images/I/51qP5hBDVqL.jpg')
            )
            
cur.execute('INSERT INTO book_shelf (book_name, author, cover_image)'
            'VALUES (%s, %s, %s);',
            ('Divine Comedy',
             'Dante Alighieri',
             'https://m.media-amazon.com/images/I/91YRDOLJNGL._SL1500_.jpg')
            )
            
cur.execute('SELECT * FROM book_shelf;')
db = cur.fetchall()
print(db)
conn.commit()

cur.close()
conn.close()
