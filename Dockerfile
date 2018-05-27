FROM node:latest

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

ADD . /app

EXPOSE 4509
