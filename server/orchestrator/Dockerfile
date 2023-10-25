FROM node:18.17.1

WORKDIR /server/orchestrator

ENV PORT=4000
COPY package*.json ./
RUN npm install && npm cache clean --force
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]