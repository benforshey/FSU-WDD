//Description
//Hubot will roll a 20 sided die for you
//
//Dependencies
//None
//
//Configuration
//None
//
//Command
//Hubot roll d20
//
//Author
//Ritchie Soricelli


module.exports = function (robot) {
    //Tell hubot to roll the die
    return robot.respond(/roll d20/i, function (res) {
        //Generate the random number from 1 - 20 and display the response
    res.send(Math.floor(Math.random()*20)+1);
    });
};
