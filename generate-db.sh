#!/bin/bash
apt update
apt install postgresql postgresql-contrib python3
systemctl start postgresql.service
sudo -u postgres createdb hyl3rid
export DB_USERNAME="hyl3rid"
export DB_PASSWORD="1234567890"
python3 -m venv venv
source venv/bin/activate
python3 init_db.py