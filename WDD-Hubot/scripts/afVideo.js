//Description
//Simple script to show random Air Force videos
//
//Dependencies
//none
//
//Commands
//Hubot Aim High - displays random Air Force video
//
//Author
//Nicole Snow

//Array of videos
var videos = [
    'https://www.youtube.com/watch?v=mGeDf9KiPV0',
    'https://www.youtube.com/watch?v=UTH-7nRKI7k',
    'https://www.youtube.com/watch?v=RtFrAx8ZTgI',
    'https://www.youtube.com/watch?v=4rj9-fmxbUg'
];

module.exports = function (robot) {
    return robot.respond(/Aim High$/i, function (msg) {
        //Sends a random youtube link
        msg.send(msg.random(videos));
    });
};