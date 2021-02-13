FROM python:3.8.5

ENV PYTHONUNBUFFERED 1
RUN mkdir /data

COPY data/. /data/
RUN pip install --upgrade pip \
    && pip install -r data/requirements.txt

RUN mkdir /app

RUN apt-get update &&\
    apt-get install -y binutils libproj-dev gdal-bin

WORKDIR /app
COPY app/. /app/

RUN pip install -r requirements.txt
    