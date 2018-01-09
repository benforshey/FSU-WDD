//  Description:
//   Ask Hubot whats up and he will talk to you.
//
//  Dependencies:
//    None
//
//  Configuration:
//    None
//
//  Commands:
//    Hubot wassup - returns an answer to your question.
//
//  Author:
//    Unknown
//

module.exports = function(robot) {

  robot.respond(/WASSUP$/i, function(msg) {
    return msg.send("Chilling, whats good with you?");
  });

  robot.hear(/^WASSUP$/i, function(msg) {
    return msg.send("You talking to me?");
  });

};
