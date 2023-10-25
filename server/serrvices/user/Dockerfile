FROM node:18.17.1

WORKDIR /server/services/users

ENV PORT=4001
COPY package*.json ./
RUN npm install && npm cache clean --force
RUN npm install
COPY ./ ./
EXPOSE 4001
CMD ["npm", "run", "dev"]