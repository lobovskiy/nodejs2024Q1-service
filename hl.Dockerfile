FROM node:20.11.1-alpine

WORKDIR /usr/src/home_library

COPY package*.json /usr/src/home_library/

RUN npm ci && npm cache clean --force

COPY . /usr/src/home_library

EXPOSE ${PORT}

CMD ["npm", "run", "start:db"]
