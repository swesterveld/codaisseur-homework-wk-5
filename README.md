# Codaisseur Homework Week 5

The assignment is to make some sort of "Spotify API";
You'll make an API to manage your playlists with different songs, stored in a Postgres database.

## Requirements

The requirements are listed below.

### Authentication

  * A user should be able to sign up by posting `email`, `password`, and `password_confirmation` to `/users`
  * A user should be able to sign in by posting to `/tokens` and get a response `{ token: "<JWT>" }`
  * A user should be able to authenticate using an `Authorization` header with a `Bearer <JWT>`

### Playlists

  * `POST /playlists`: A user should be able to create a playlist (with just a name)
  * `GET /playlists`: A user should be able to retrieve all their playlists
  * `GET /playlists/:id`: A user should be able to get a single one of their playlists, with all the songs on it (but no others).
  * `DELETE /playlists/:id`: A user may delete their playlists, and all songs on it.

### Songs

  * `POST /playlists/:id/songs`: A user should be able to add songs to their playlists. A song has:
    * A title
    * An artist (name)
    * An album (title)
  * A song can only be on one playlist.

### Authorization

All data should be scoped to the user doing the request. E.g. a user may only see their own playlists. If a resource does not
exist, or if it does not belong to the authenticated user, you return a 404. So there is no need to return a 401 if the resource
does exist, but may not be accessible by that user.

### Other status codes

Make sure to return the right one of these status codes: 200 (ok), 201 (created), 204 (no content), 422 (if a resource can't be saved or updated because it's invalid), 404 (not found), 401 (not authorized, not authenticated).

### Handing In

  * Deploy to Heroku
  * Send the link to your Heroku app, as well as the link to your Github repo to teachers@codaisseur.com

## Bonus

As a bonus, some other endpoints can be implemented:

  * `GET /artists`: A user should be able to retrieve a list of artists, with all their songs (from the different playlists).
  * `PUT /playlists/:id/songs/:id`: A user should be able to change song information, even move it to another playlist.
  * `DELETE /playlists/:id/songs/:id`: A user should be able to delete songs from their playlist.
