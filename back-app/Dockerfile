FROM python:3.8.5

ENV PYTHONUNBUFFERED 1
ENV POSTGRES_PASSWORD postgres

RUN mkdir /data
COPY data/. /data/

RUN mkdir /back-app
COPY . /back-app/

RUN apt-get update &&\
    apt-get install -y binutils libproj-dev gdal-bin postgresql-client

RUN pip install --upgrade pip \
    && pip install -r back-app/requirements.txt

# docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
