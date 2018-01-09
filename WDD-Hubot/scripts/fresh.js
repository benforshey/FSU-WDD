// Description:
// Pulls the Fresh Prince theme song from YouTube.
//
// Dependencies:
// none
//
// Configuration:
// none
//
// Commands:
// Hubot fresh - hubot will bring up the Fresh Prince theme song for you.
//
// Author:
// Unknown
//
// Modified:
// Ben Forshey (removed nonfunctional and conflicting code)

module.exports = function(robot) {

  robot.respond(/FRESH$/i, function(msg) {
    return msg.send("https://www.youtube.com/watch?v=hBe0VCso0qs");
  });

};
