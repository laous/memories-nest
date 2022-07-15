<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Memories API - Nest.js + Prisma+ PostgreSQL</p>

## Installation

```json
$ npm install
```

## Running the app

```json
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

---

### Register a new account

`POST /auth/register`

```json
    {
      # all fields are required
      "email":"tony@thesopranos.com",
      "username":"tony",
      "password":"tony123"
    }
```

#### Response

`Status: 201 CREATED`

```json
{
  "access_token": "jwt_token",
  "refresh_token": "jwt_token"
}
```

---

### Signin

`GET /auth/signin`

```json
    {
      # all fields are required
      "email":"tony@thesopranos.com",
      "password":"tony123"
    }
```

#### Response

`Status: 200 OK`

```json
{
  "access_token": "jwt_token",
  "refresh_token": "jwt_token"
}
```

---

### Logout

`POST /auth/logout`

```json
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  "message": "Logged out!"
}
```

---

### Refresh tokens

`POST /auth/refresh`

```json
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  "access_token": "jwt_token",
  "refresh_token": "jwt_token"
}
```

## Memories : /memories/

---

### Get all memories

`GET /memories/`

#### Response

`Status: 201 CREATED`

```json
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

---

### Create a new memorie

`POST /memories`

```json
# Authorization header(Bearer) required. (access_token)
```

```json
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

```json
{
  "memorieId": "uuid",
  "title": "New memorie",
  "description": "This is the description!!",
  "image": "image_link",
  "hashtags": ["afc", "pl"],
  "ownerId": "uuid"
}
```

---

### Get all memories

`GET /memories/:id`

```json
# id (valid uuid) required
```

#### Response

`Status: 200 OK`

```json
  # get detailed informations of a single memorie
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

---

### Update an existing memorie

`PUT /memories/:id`

```json
# id (valid uuid) required
# Authorization header(Bearer) required. (access_token)
```

```json
{
    # all fields are required
    "title":"New title",
    "description":"This is a new description!",
    "image":"image_link",
    "hashtags":["afc","pl"]
}
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "uuid",
    "title":"New title",
    "description":"This is a new description!",
    "image":"image_link",
    "hashtags":["afc","pl"]
    "ownerId": "uuid"
}
```

---

### Like a memorie

`POST /memories/:id/like`

```json
# id (valid uuid) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "uuid",
    "title":"New title",
    "description":"This is a new description!",
    "image":"image_link",
    "hashtags":["afc","pl"]
    "ownerId": "uuid"
}
```

### Unlike a memorie

`DELETE /memories/:id/like`

```json
# id (valid uuid) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "uuid",
    "title":"New title",
    "description":"This is a new description!",
    "image":"image_link",
    "hashtags":["afc","pl"]
    "ownerId": "uuid"
}
```

### Create a new comment

`POST /memories/:id/comments`

```json
# id (valid uuid) is required. (id of the memorie)
# Authorization header(Bearer) required. (access_token)
```

```json
{
  # all fields are required
  "title":"New comment from other user",
  "content":"This is the content of my comment"
}
```

#### Response

`Status: 201 CREATED`

```json
{
  "memorieId": "uuid",
  "title": "New memorie",
  "description": "This is the description!!",
  "image": "image_link",
  "hashtags": ["afc", "pl"],
  "ownerId": "uuid"
}
```

### Delete a comment

`DELETE /memories/:id/comments/:commentId`

```json
# id (valid uuid) is required. (id of the memorie)
# commentId (valid uuid) is also required.
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  "memorieId": "uuid",
  "title": "New memorie",
  "description": "This is the description!!",
  "image": "image_link",
  "hashtags": ["afc", "pl"],
  "ownerId": "uuid"
}
```

## Stay in touch

- Author - [Oussama Lamnaouer](https://linktr.ee/laous)
- Website - [https://laous.netlify.app](https://laous.netlify.app)
- Twitter - [@oussamalm\_\_](https://twitter.com/nestframework)
