FROM node:20-alpine

RUN npm install -g typescript pnpm

COPY package*.json ./
RUN pnpm install

USER node
COPY --chown=node:node . .

USER root
RUN tsc -p tsconfig.build.json
USER node

EXPOSE 3000
ENTRYPOINT ["node", "./dist/index.js"] 
