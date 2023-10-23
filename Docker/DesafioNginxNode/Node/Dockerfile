FROM node:latest

ENV DOCKERIZE_VERSION v0.6.1
RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

# se o id da maquina for diferente de 1000 ou o id do container for diferente de 1000
# RUN usermod -u 1000 node

USER node

WORKDIR /usr/src/app
# COPY ./package*.json /usr/src/app/

# RUN npm install