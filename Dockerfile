FROM node:latest

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm i

# uncomment this if you use only container
# EXPOSE 3000 

# CMD [ "npm", "run", "dev" ]

# CMD [ "npm", "run", "dev:custom" ]

CMD [ "npm", "run", "start" ]