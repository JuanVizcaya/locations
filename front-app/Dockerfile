FROM node:alpine

RUN mkdir /front-app
COPY . /front-app/
WORKDIR /front-app

RUN npm install

CMD [ "npm", "start" ]