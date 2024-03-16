FROM node:20.11

WORKDIR /usr/src/home_library

COPY package*.json /usr/src/home_library/

RUN npm ci

COPY . /usr/src/home_library

EXPOSE ${PORT}

CMD ["npm", "start"]
