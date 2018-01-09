//Description: play radom videos about the universe
//Author: Ednalda Fakira ednaldafakira@yahoo.com
//Command: universe

var universevideos = ["https://youtu.be/hG6KvMG1k4c", "https://youtu.be/yXOTzUXPY7k", "https://youtu.be/lGEH4bTwaCo"];

module.exports = function(robot){
	return robot.respond(/universe/i, function (msg){
	  //hubot radom display a video about the universe
	  msg.send(msg.random(universevideos));
	});
};