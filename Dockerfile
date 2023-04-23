FROM node:14

WORKDIR /usr/src/app

COPY src ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]