FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install express --save && npm install
EXPOSE 3000
CMD [ "node", "app" ] 