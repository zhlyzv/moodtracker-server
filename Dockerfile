FROM node:10-alpine

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]