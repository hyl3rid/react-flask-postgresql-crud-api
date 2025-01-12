#!/bin/bash
apt update
apt install -y postgresql postgresql-contrib python3
python3 -m ensurepip --upgrade
python3 -m pip install psycopg2-binary Flask Flask-Cors Flask-JWT-Extended
systemctl start postgresql.service
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'newpassword';"
sudo -u postgres createdb hyl3rid
export DB_USERNAME="postgres"
export DB_PASSWORD="newpassword"
python3 -m venv venv
source venv/bin/activate
python3 init_db.py