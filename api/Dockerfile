FROM python:3.9
WORKDIR /var/www/html
# RUN pip install fastapi uvicorn fastapi_csrf_protect motor PyJWT passlib python-decouple dnspython gunicorn
COPY requirements.txt .
RUN pip install -r requirements.txt
