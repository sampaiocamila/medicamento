# base image
FROM node:12.2.0

###config ###
FROM nginx:1.13.3-alpine

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app-biologicos

RUN chmod -R 777 node_modules/
RUN chmod -R 777 /app-biologicos/

# add `/app-biologicos/node_modules/.bin` to $PATH
ENV PATH /app-biologicos/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app-biologicos/package.json
RUN npm i --verbose --force

# add app
COPY . /app-biologicos

## Build da aplicação
RUN $(npm bin)/ npm run build:p --verbose

## copia o pacote 'dist/app-biologicos' e cola no diretorio do html do nginx
COPY dist/app-biologicos  /usr/share/nginx/html/biologicos

# start app ambiente de dev
# CMD npm run start --verbose

## copiando configurações do nginx
COPY scripts/nginx.conf /etc/nginx/conf.d/

## limpa diretorio html
RUN rm -rf /usr/share/nginx/html/*

CMD ["nginx", "-g", "daemon off;"]
