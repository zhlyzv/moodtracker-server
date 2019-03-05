FROM node:10-alpine

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .

# Enables us to use the WAIT_HOSTS key in docker-compose so we can wait for mongo before starting the node app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start