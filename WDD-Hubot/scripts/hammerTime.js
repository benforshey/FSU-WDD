//  Description:
//    This is a hammer time give given by the command STOP!
//
//  Dependencies:
//    None
//
//  Configuration:
//    None
//
//  Commands:
//    Hubot stop - displays hammer time gif.
//
//  Author:
//    Unknown
//
module.exports = function (robot) {
    return robot.respond(/stop$/i, function (msg) {
        //hubot displays gif
        msg.send('http://media.giphy.com/media/Xdcj75alQutVe/giphy.gif');
        //hubot displays message
        msg.send('HAMMER-TIME!');
    });
};
