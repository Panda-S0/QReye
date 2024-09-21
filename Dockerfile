FROM node:19.8.1-alpine3.17

WORKDIR /app

RUN npm install -g expo-cli

RUN npm install -g ngrok

COPY package.json .

RUN npm install

COPY . .

EXPOSE 19000 19001 19002 80

CMD ["npx", "expo", "start", "--dev-client", "--port", "80", "--host", "tunnel"]
