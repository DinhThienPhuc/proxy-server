FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV NODE_ENV production

# Bundle app source
COPY . /usr/src/app

RUN npm install

EXPOSE 8000

CMD [ "node", "./server" ]