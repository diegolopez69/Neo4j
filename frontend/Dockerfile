FROM node:13.7-alpine as develop-stage
WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]