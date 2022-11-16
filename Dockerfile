FROM node:16.14.2-alpine

WORKDIR /app

COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development"] ;\
    then npm install ;\
    else npm install --only=production ;\
    fi ; 

COPY . ./
ENV PORT 3030 
EXPOSE $PORT

RUN npm run build
CMD [ "npm","run", "start" ]