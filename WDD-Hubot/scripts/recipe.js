//Description
//Script to have Hubot generate a dinner recipe
//
//Dependencies
//Request
//
//Commands
//Hubot dinner - displays a dinner recipe
//
//Author
//Nicole Snow

var request = require('request');
var key = process.env.RECIPE_KEY;

function recipe(msg) {
    //Variable for the api url
    var apiURL = 'http://api.campbellskitchen.com/brandservice.svc/api/search?keywords=chicken&format=json&app_id=8ca03727&app_key=' + key;
    // API request
    request(apiURL, function (error, response, body) {
        if (!error && response.statusCode < 300) {
            //parse the json
            var json = JSON.parse(body);
            //generate a random number
            var rand = Math.floor(Math.random() * 20) + 1;
            //generate random recipe from the api and brings back the name, url and image
            var recipe = json.recipes[rand].recipelink + "\n" + json.recipes[rand].name + "\n" + "http://www.campbellskitchen.com" + json.recipes[rand].thumbimg;
            //display the random recipe
            msg.send(recipe);
        } else {
            //sends an error message if something goes wrong
            msg.send(response.statusCode);
        }
    });//end request
}
//Listens for the dinner string and executes the function
module.exports = function (robot) {
    return robot.respond(/dinner$/i, function (msg) {
        recipe(msg);
    });
}