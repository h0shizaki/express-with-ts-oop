FROM node:16.14.2-alpine

WORKDIR /app

COPY package.json .
RUN npm install 
COPY . ./
ENV PORT 3030 
EXPOSE $PORT

RUN npm run build
CMD [ "npm","run", "start:prod" ]