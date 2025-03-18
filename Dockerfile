FROM node:20.17.0

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

RUN npm run build

CMD [ "npm", "run", "start:prod" ]