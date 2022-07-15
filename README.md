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
        "memorieId": "",
        "title": "First memorie",
        "description": "This is the description of my first memorie.",
        "image": "",
        "hashtags": [
            "tag1",
            "tag2"
        ],
        "ownerId": "",
        "owner": {
            "email": "tony@thesopranos.com",
            "username": "tony",
            "profile": {
                "image": "",
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
  "memorieId": "",
  "title": "New memorie",
  "description": "This is the description!!",
  "image": "",
  "hashtags": ["afc", "pl"],
  "ownerId": ""
}
```

---

### Get all memories

`GET /memories/:id`

```json
# id (valid uuid ) required
```

#### Response

`Status: 200 OK`

```json
  # get detailed informations of a single memorie
  {
    "memorieId": "",
    "title": "New memorie",
    "description": "This is the description!!",
    "image": "",
    "hashtags": [
        "afc",
        "pl"
    ],
    "ownerId": ""
    "owner": {
        "userId": "",
        "email": "tony@thesopranos.com",
        "username": "tony",
        "profile": {
            "image": "",
            "bio": "This is a bio",
            "name": "Tony Soprano"
        }
    },
    "comments": [ # array of comments
      {
        "commentId": "",
        "title": "New comment",
        "content": "Content of the new comment",
        "authorId": "",
        "memorieId": ""
      }
    ],
    "likedBy": [ # array of users who liked the memorie
      {
        "userId": "",
        "username": "oussama",
        "profile": {
            "image": ""
        }
      }
    ]
}
```

---

### Update an existing memorie

`PUT /memories/:id`

```json
# id (valid uuid ) required
# Authorization header(Bearer) required. (access_token)
```

```json
{
    # all fields are required
    "title":"New title",
    "description":"This is a new description!",
    "image":"",
    "hashtags":["afc","pl"]
}
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "",
    "title":"New title",
    "description":"This is a new description!",
    "image":"",
    "hashtags":["afc","pl"]
    "ownerId": ""
}
```

---

### Delete a memorie

`DELETE /memories/:id`

```json
# id (valid uuid ) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "",
    "title":"New title",
    "description":"This is a new description!",
    "image":"",
    "hashtags":["afc","pl"]
    "ownerId": ""
}
```

---

### Like a memorie

`POST /memories/:id/like`

```json
# id (valid uuid ) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "",
    "title":"New title",
    "description":"This is a new description!",
    "image":"",
    "hashtags":["afc","pl"]
    "ownerId": ""
}
```

---

### Unlike a memorie (Remove like)

`DELETE /memories/:id/like`

```json
# id (valid uuid ) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
    "memorieId": "",
    "title":"New title",
    "description":"This is a new description!",
    "image":"",
    "hashtags":["afc","pl"]
    "ownerId": ""
}
```

---

### Create a new comment

`POST /memories/:id/comments`

```json
# id (valid uuid ) is required. (id of the memorie)
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
  "memorieId": "",
  "title": "New memorie",
  "description": "This is the description!!",
  "image": "",
  "hashtags": ["afc", "pl"],
  "ownerId": ""
}
```

---

### Delete a comment

`DELETE /memories/:id/comments/:commentId`

```json
# id (valid uuid ) is required. (id of the memorie)
# commentId (valid uuid ) is also required.
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  "memorieId": "",
  "title": "",
  "description": "",
  "image": "",
  "hashtags": [],
  "ownerId": ""
}
```

---

## Authenticated user: /me/

### Get inforamtions about the current user

`Get /me/`

```json
# id (valid uuid ) is required.
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  "userId": "",
  "email": "",
  "username": "",
  "profile": {
      "bio": "",
      "image": "",
      "name": ""
  },
  # array of liked memories
  "likedMemories": [],
  # array of current user's memories
  "memories": [],
  # array of users who follow the current user
  "followers": [],
  # array of users whom the current user follow
  "following": []
}
```

## Stay in touch

- Author - [Oussama Lamnaouer](https://linktr.ee/laous)
- Website - [https://laous.netlify.app](https://laous.netlify.app)
- Twitter - [@oussamalm\_\_](https://twitter.com/nestframework)
