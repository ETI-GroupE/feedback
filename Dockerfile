FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
WORKDIR ./dist

# Ignoreed when also specified in docker-compose.
ENV API_PORT=5001

EXPOSE 5001

CMD node app.js