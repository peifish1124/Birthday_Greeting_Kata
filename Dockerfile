FROM node:20-alpine

RUN mkdir /Birthday_Greeting_Kata

COPY . /Birthday_Greeting_Kata

WORKDIR /Birthday_Greeting_Kata

RUN npm install -g typescript

RUN npm install -g pnpm
RUN pnpm install

RUN tsc -p tsconfig.build.json

CMD node ./dist/index.js
