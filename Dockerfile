FROM node:20-alpine

WORKDIR /home/node

COPY . .

RUN npm install

CMD node ./mhlc-content-api/src/index.js
