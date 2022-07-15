<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Memories API - Nest.js + Typescript + Prisma + PostgreSQL /p>

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

* The application will run at 8080, you can chnage the port from ./src/main.ts
* This is a short documentation for the all routes handled.
* The errors are handled - More infos will be added to the documentation later.

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
# Authorization header(Bearer) required. (refresh_token)
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

`Status: 200 OK`

```json
# array of memories
[
  {
    "memorieId": "",
    "title": "",
    "description": "",
    "image": "",
    # array of strings
    "hashtags": [],
    "ownerId": "",
    "owner": {
        "email": "",
        "username": "",
        "profile": {
            "image": "",
            "bio": "",
            "name": ""
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
  "image":"image_link",
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

### Get detailed informations of a single memorie

`GET /memories/:id`

```json
# id (valid uuid ) required
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
  "ownerId": "",
  "owner": {
      "userId": "",
      "email": "",
      "username": "",
      "profile": {
          "image": "",
          "bio": "",
          "name": ""
      }
  },
  "comments": [ # array of comments
    {
      "commentId": "",
      "title": "",
      "content": "",
      "authorId": "",
      "memorieId": ""
    }
  ],
  "likedBy": [ # array of users who liked the memorie
    {
      "userId": "",
      "username": "",
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
  "title":"",
  "description":"",
  "image":"",
  "hashtags":[]
}
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
  "title": "",
  "description": "",
  "image": "",
  "hashtags": [],
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
  "title": "",
  "description": "",
  "image": "",
  "hashtags": [],
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
  "title": "",
  "description": "",
  "image": "",
  "hashtags": [],
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
  "title":"",
  "content":""
}
```

#### Response

`Status: 201 CREATED`

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

### Get informations about the current user

`Get /me/`

```json
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

---

### Get memories of the current user

`Get /me/`

```json
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
[
  {
    "memorieId": "",
    "title": "",
    "description": "",
    "image": "",
    "hashtags": [],
    "ownerId": ""
  }
]
```

---

### Update user's profile

- Update an exisiting profile, or create one if it doesn't exist.

`PUT /me/profile`

```json
# Authorization header(Bearer) required. (access_token)
```

```json
{
  "name": "",
  "bio": "",
  "image": ""
}
```

#### Response

`Status: 200 OK`

```json
{
  "profileId": "",
  "name": "",
  "bio": "",
  "image": "",
  "userId": ""
}
```

---

### Get current user's followers

`GET /me/followers`

```json
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
[
  # array of users
]
```

---

### Remove a follower

`DELETE /me/followers/:id`

```json
# id (valid uuid) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  # follower(user) removed
}
```

---

### Get current user's following

`GET /me/following`

```json
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
[
  # array of users
]
```

---

### Follow a user

`POST /me/following/:id`

```json
# id (valid uuid) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  # user followed
}
```

---

### Unfollow a user

`DELETE /me/following/:id`

```json
# id (valid uuid) required
# Authorization header(Bearer) required. (access_token)
```

#### Response

`Status: 200 OK`

```json
{
  # user unfollowed
}
```

## Stay in touch

- Author - [Oussama Lamnaouer](https://linktr.ee/laous)
- Website - [https://laous.netlify.app](https://laous.netlify.app)
- Twitter - [@oussamalm\_\_](https://twitter.com/nestframework)
