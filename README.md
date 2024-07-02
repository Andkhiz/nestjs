# Nest
<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="https://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This backend API is built using NestJS and provides functionalities for user registration and management of watchlists. Users can register, log in, and manage their watchlists, which consist of various assets they wish to track.

## Features

- **User Registration**: Allow users to create a new account.
- **User Authentication**: Users can log in to their account and receive a JWT token.
- **Watchlist Management**: Users can add, view, and manage their watchlists.
- **API Documentation**: Comprehensive API documentation available through Swagger.

## Setup and Installation

1. Clone the repository:
```
git clone https://github.com/Andkhiz/nestjs.git
cd nestjs
```

2. Install dependencies:
```
npm install
```
or
```
npm ci
```

3. Setup and Installation Docker. Run Docker Compose and run docker container in test folder:
```
cd test
docker-compose up
```

4. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
PORT=yuor_backend_port
DB_PODR=your_database_port
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
SECRET=your_jwt_secret
EXPIRE_JWT=your_jwt_secret_expire
```

5. Start the server:
```
npm run start
```

## Deployment 

Build the project and create an image in docker.
```
npm run build
docker-compose up
```


## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Sequelize**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Swagger**: API documentation and testing.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the [MIT licensed](LICENSE). See the LICENSE file for details.
