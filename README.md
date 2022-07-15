<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Memories API - Nest.js + Prisma+ PostgreSQL</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# RestAPI

This is a short documentation for the all routes handled.

## Authentication : /auth/

### Register a new account

`POST /auth/register`

```bash
    {
      # all fields are required
      "email":"tony@thesopranos.com",
      "username":"tony",
      "password":"tony123"
    }
```

#### Response

`Status: 201 CREATED`

```bash
    {
      "access_token": "jwt_token",
      "refresh_token": "jwt_token"
    }
```

### Signin

`GET /auth/signin`

```bash
    {
      # all fields are required
      "email":"tony@thesopranos.com",
      "password":"tony123"
    }
```

#### Response

`Status: 200 OK`

```bash
    {
      "access_token": "jwt_token",
      "refresh_token": "jwt_token"
    }
```

### Logout

`POST /auth/logout`

```console
    Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```bash
    {
      "message": "Logged out!"
    }
```

### Refresh tokens

`POST /auth/refresh`

```console
    Authorization header(Bearer) required. (refresh_token)
```

#### Response

`Status: 200 OK`

```bash
    {
      "access_token": "jwt_token",
      "refresh_token": "jwt_token"
    }
```

## Stay in touch

- Author - [Oussama Lamnaouer](https://linktr.ee/laous)
- Website - [https://laous.netlify.app](https://laous.netlify.app)
- Twitter - [@oussamalm\_\_](https://twitter.com/nestframework)
