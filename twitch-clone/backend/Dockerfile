FROM node:18-bullseye
RUN apt-get update && apt-get install -y ffmpeg
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --production
COPY . .
EXPOSE 3000 1935 8000
CMD ["node", "server.js"]
