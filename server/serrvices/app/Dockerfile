FROM node:18.17.1

WORKDIR /server/services/app

ENV PORT=4002
COPY package*.json ./
RUN npm install && npm cache clean --force
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]