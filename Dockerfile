FROM node:latest

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm i

# EXPOSE 8000 # uncomment this if you use only container

# CMD [ "npm", "run", "dev" ]

CMD [ "npm", "run", "dev:custom" ]