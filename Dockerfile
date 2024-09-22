FROM node:21-alpine

# CLIENT
WORKDIR /
COPY ./client ./client
WORKDIR /client
RUN npm install
ARG VITE_APP_TITLE
RUN VITE_APP_TITLE=$VITE_APP_TITLE npm run build

# SERVER
WORKDIR /app
COPY ./server/package*.json .
RUN npm install

CMD [ "npm", "start" ]
