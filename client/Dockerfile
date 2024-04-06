FROM node:21-alpine as base
VOLUME [ "/app" ]
WORKDIR /app
COPY package*.json .
RUN npm install

FROM base as development
CMD ["npm", "start"]

FROM base as build
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine as production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
