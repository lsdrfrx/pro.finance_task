FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

CMD ["node", "./dist/main"]