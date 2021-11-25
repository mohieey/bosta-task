FROM node:16.13-alpine

WORKDIR /monitorbot

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

