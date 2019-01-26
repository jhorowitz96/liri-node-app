require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var inquirer = require("inquirer");
var bandsintown = require("bandsintown");
var omdb = require("omdb");
var moment = require('moment');
moment().format();
var action = process.argv[2];
var item = process.argv[3];


switch (action) {
    case "movie-this":
        movie();
        break;

    case "concert-this":
        artist();
        break;

    case "spotify-this-song":
        song();
        break;

    case "do-what-it-says":
        says();
        break;
}

function artist(band) {
    var artistName = "";
    var nodeArgs = process.argv;
    if (band === undefined) {
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                artistName = artistName + "+" + nodeArgs[i];
                console.log(artistName);
            }

            else {
                artistName += nodeArgs[i];
            }
        }
    } else {
        artistName = band;
    }

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=trilogy").then(
        function (response) {

            console.log(artistName + " is playing at: " + response.data[0].venue.name);
            console.log("This is located in: " + response.data[0].venue.city);

            var date = response.data[0].datetime;
            var momentTime = moment(date).format('MM/DD/YYYY')

            console.log("The date of the show is: " + momentTime);

        }
    )
}





function movie(movies) {

    // var nodeArgs = process.argv;
    // var movieName = "";
    // for (var i = 3; i < nodeArgs.length; i++) {
    //     if (i > 3 && i < nodeArgs.length) {
    //         movieName = movieName + "+" + nodeArgs[i];
    //     }
    //     else {
    //         movieName += nodeArgs[i];
    //     }
    // }

    var movieName = "";
    var nodeArgs = process.argv;
    if (movies === undefined) {
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
                console.log(movieName);
            }
            else {
                movieName += nodeArgs[i];
                console.log(movieName);
            }
        }
    } else {
        movieName = movies;

    }

    if (movieName === "") {
        axios.get("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {

                //title of the movie
                console.log("Title: " + response.data.Title);
                //year the movie came out
                console.log("Year: " + response.data.Year);
                //IMDB rating of the movie
                console.log("IMDB Rating: " + response.data.imdbRating);
                //rotten tomatoes rating of the movie
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                //country where the movie was produced
                console.log("Country: " + response.data.Country);
                //language of the movie
                console.log("Language: " + response.data.Language);
                //plot of the movie
                console.log("Plot: " + response.data.Plot);
                //actors in the movie
                console.log("Actors: " + response.data.Actors);
            }

        )
    }

    else {
        axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
            function (response) {

                //title of the movie
                console.log("Title: " + response.data.Title);
                //year the movie came out
                console.log("Year: " + response.data.Year);
                //IMDB rating of the movie
                console.log("IMDB Rating: " + response.data.imdbRating);
                //rotten tomatoes rating of the movie
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                //country where the movie was produced
                console.log("Country: " + response.data.Country);
                //language of the movie
                console.log("Language: " + response.data.Language);
                //plot of the movie
                console.log("Plot: " + response.data.Plot);
                //actors in the movie
                console.log("Actors: " + response.data.Actors);
            }

        )
    }
}






function song(songs) {
    console.log(songs);
    var Spotify = require("node-spotify-api");
    var keys = require("./keys.js")
    var spotify = new Spotify(keys.spotify);
    var name;
    if (songs === undefined) {
        name = process.argv[3]
    }
    else { name = songs };




    // var nodeArgs = process.argv;

    // for (var i = 3; i < nodeArgs.length; i++) {
    //     if (i > 3 && i < nodeArgs.length) {
    //         name = name + "+" + nodeArgs[i];
    //     }
    //     else {
    //         name += nodeArgs[i];
    //     }
    // }

    spotify.search({ type: 'track', query: name || "Ace-of-Base", limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var key in data.tracks.items) {
            console.log(data.tracks.items[key].artists[0].name);
            console.log(data.tracks.items[key].preview_url);
            console.log(data.tracks.items[key].album.name);

        }

        // axios.get("https://api.spotify.com/v1/search?q=" + name +  process.env.SPOTIFY_ID).then(
        //         function (response) {
        //             console.log(response)
        //             console.log(song)

        //             console.log(process.env.SPOTIFY_ID);
    });
}



function says() {
    // Includes the FS package for reading and writing packages
    var fs = require("fs");

    // Running the readFile module that's inside of fs.
    // Stores the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);

        var output = data.split(",");
        // var songs = output[1];
        // var band = output[1];
        var actions = output[0];


        if (actions === "spotify-this-song") {
            var songs = output[1].trim();//trim to remove white spaces
            song(songs);
        }
        if (actions === "movie-this") {
            var movies = output[1].trim();
            //console.log(movies)
            movie(movies);
        }


        if (actions === "concert-this") {
            var band = output[1].trim();
            artist(band);
        }





    });
}