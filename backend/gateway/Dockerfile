FROM node:20.12.2-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD npm run start:watch
