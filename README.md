# liri-node-app
liri-node-app

# Instructions
1. Run node liri.js concert-this "artist name" to output the following:
    * Name of the venue.
    * Venue location.
    * Date of the Event.
2. Run node liri.js spotify-this-song "song name" to output the following:
    * Artist(s).
    * The song's name.
    * A preview link of the song from Spotify.
    * The album that the song is from.
3. Run node liri.js movie-this "movie name" to output the following:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
4. Run node liri.js do-what-it-says to output the data above based on the string in random.txt

#Requirements:
require("dotenv")
require("fs")
require("axios")
require("inquirer")
require("bandsintown")
require("omdb")
require("moment")
require("node-spotify-api")
require("./keys.js")

#Sample Recording:
https://www.screencast.com/t/1tiixL2o 