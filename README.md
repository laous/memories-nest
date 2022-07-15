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

## Memories : /memories/

### Get all memories

`GET /memories/`

#### Response

`Status: 201 CREATED`

```bash
  # array of memories
  [
    {
        "memorieId": "uuid",
        "title": "First memorie",
        "description": "This is the description of my first memorie.",
        "image": "image_link",
        "hashtags": [
            "tag1",
            "tag2"
        ],
        "ownerId": "uuid",
        "owner": {
            "email": "tony@thesopranos.com",
            "username": "tony",
            "profile": {
                "image": "image_link",
                "bio": "This is my bio!",
                "name": "Tony Soprano"
            }
        },
        "_count": {
            "comments": 0 , # number of comments
            "likedBy": 2    # number of likes
        }
    }
  ]
```

### Create a new memorie

`POST /auth/memories`

```console
  Authorization header(Bearer) required. (access_token)
```

```bash
    {
      # all fields are required
      "title":"New memorie",
      "description":"This is a description!",
      "image":"iamge_link",
      "hashtags":["afc","pl"]
    }
```

#### Response

`Status: 201 CREATED`

```bash
{
    "memorieId": "uuid",
    "title": "New memorie",
    "description": "This is the description!!",
    "image": "image_link",
    "hashtags": [
        "afc",
        "pl"
    ],
    "ownerId": "uuid"
}
```

### Get all memories

`GET /memories/:id`

```bash
# id (valid uuid) required
```

#### Response

`Status: 201 CREATED`

```bash
  # array of memories
  {
    "memorieId": "uuid",
    "title": "New memorie",
    "description": "This is the description!!",
    "image": "image_link",
    "hashtags": [
        "afc",
        "pl"
    ],
    "ownerId": "uuid"
    "owner": {
        "userId": "uuid",
        "email": "tony@thesopranos.com",
        "username": "tony",
        "profile": {
            "image": "image_link",
            "bio": "This is a bio",
            "name": "Tony Soprano"
        }
    },
    "comments": [ # array of comments
      {
        "commentId": "uuid",
        "title": "New comment",
        "content": "Content of the new comment",
        "authorId": "uuid",
        "memorieId": "uuid"
      }
    ],
    "likedBy": [ # array of users who liked the memorie
      {
        "userId": "uuid",
        "username": "oussama",
        "profile": {
            "image": "image_link"
        }
      }
    ]
}
```

## Stay in touch

- Author - [Oussama Lamnaouer](https://linktr.ee/laous)
- Website - [https://laous.netlify.app](https://laous.netlify.app)
- Twitter - [@oussamalm\_\_](https://twitter.com/nestframework)
