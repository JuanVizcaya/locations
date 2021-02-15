FROM python:3.8.5

ENV PYTHONUNBUFFERED 1
ENV POSTGRES_PASSWORD postgres

RUN mkdir /data
COPY data/. /data/

RUN mkdir /app
COPY app/. /app/

RUN apt-get update &&\
    apt-get install -y binutils libproj-dev gdal-bin postgresql-client

RUN pip install --upgrade pip \
    && pip install -r app/requirements.txt
