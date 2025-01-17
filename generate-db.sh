# !/bin/bash
apt update
apt install -y postgresql postgresql-contrib python3 python3-venv dbus-x11
python3 -m ensurepip --upgrade
python3 -m venv venv
python3 -m pip install psycopg2-binary Flask Flask-Cors Flask-JWT-Extended
source venv/bin/activate
systemctl start postgresql.service
sudo -u postgres psql -c "CREATE ROLE hyl3rid WITH SUPERUSER LOGIN CREATEDB CREATEROLE REPLICATION BYPASSRLS PASSWORD 'passw0rd';"
sudo -u postgres createdb hyl3rid
export DB_USERNAME=hyl3rid; export DB_PASSWORD=passw0rd; export JWT_PASSWORD=1234567890;
sudo sed -z -i 's/peer/md5/3' /etc/postgresql/16/main/pg_hba.conf | sudo sed -z -i 's/peer/md5/3' /etc/postgresql/16/main/pg_hba.conf 
service postgresql restart
python3 init_db.py
gnome-terminal -- bash -c "cd frontend-api; npm install; npm run start" && flask run