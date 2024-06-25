FROM node:20.12.2-slim

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD npm run start:watch
