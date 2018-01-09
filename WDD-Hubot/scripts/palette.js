// Description:
// Hubot gives you a random color palette.
//
// Dependencies:
// Request
//
// Configuration:
// None
//
// Commands:
// Hubot palette - Returns a random color palette
//
// Author:
// Devin Metivier

var request = require('request'); //Requires request

var apiUrl = 'http://www.colourlovers.com/api/palettes/random?format=json'; //URL to API

function getPallete(msg){
    //Make request to API
    request(apiUrl, function (error, response, body) {

        if (!error && response.statusCode < 300){
            //Parse JSON
            var json = JSON.parse(body);
            var json = json[0]; //set to new value due to array definition in API

            msg.send(
                "Title: " + json.title + "\n"
                + "Colors: " + json.colors + " \n"
                + "Direct Link: " + json.url + "\n"
                + json.imageUrl
            );

        }else{
            //Throw the error
            msg.send("Something went wrong.");
            msg.send(response);
            msg.send(response.statusCode);
            msg.send(error);
        }
    });//end request
}//close function

module.exports = function (robot) {
    return robot.respond(/palette/i, function(msg){
        getPallete(msg);
    })
};
