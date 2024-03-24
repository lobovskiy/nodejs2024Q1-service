# Home Library Service

This service allows you to manage lists of artists, albums and tracks.
Also, you can add them all to the favorites list and delete them from it.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/lobovskiy/nodejs2024Q1-service.git
```

## Setup environment config 

Change the file name `.env.example` to `.env`

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Using application

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Also, you can use [Postman](https://www.postman.com/) or develop your own web client app
to interact with all the API endpoints.

## API

* `Users` (`/user` route)
    * `GET /user` - get all users
    * `GET /user/:id` - get single user by id
    * `POST /user` - create user (following DTO should be used) `CreateUserDto`
    * `PUT /user/:id` - update user's password `UpdatePasswordDto` (with attributes):
    * `DELETE /user/:id` - delete user

* `Tracks` (`/track` route)
    * `GET /track` - get all tracks
    * `GET /track/:id` - get single track by id
    * `POST /track` - create new track
    * `PUT /track/:id` - update track info
    * `DELETE /track/:id` - delete track

* `Artists` (`/artist` route)
    * `GET /artist` - get all artists
    * `GET /artist/:id` - get single artist by id
    * `POST /artist` - create new artist
    * `PUT /artist/:id` - update artist info
    * `DELETE /artist/:id` - delete album

* `Albums` (`/album` route)
    * `GET /album` - get all albums
    * `GET /album/:id` - get single album by id
    * `POST /album` - create new album
    * `PUT /album/:id` - update album info
    * `DELETE /album/:id` - delete album

* `Favorites`
    * `GET /favs` - get all favorites
    * `POST /favs/track/:id` - add track to the favorites
    * `DELETE /favs/track/:id` - delete track from favorites
    * `POST /favs/album/:id` - add album to the favorites
    * `DELETE /favs/album/:id` - delete album from favorites
    * `POST /favs/artist/:id` - add artist to the favorites
    * `DELETE /favs/artist/:id` - delete artist from favorites

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
