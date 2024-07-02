FROM node:18-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Устанавливаем переменные окружения
ARG DB_HOST=localhost
ENV DB_HOST=${DB_HOST}

# Экспортируем переменную окружения для контейнера
ENV DB_HOST=postgresql

RUN npm run build

CMD [ "node", "dist/main.js" ]

# Expose the port the app runs on
EXPOSE 3000