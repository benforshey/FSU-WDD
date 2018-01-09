//Description: play radom videos about yoga
//Author: Ednalda Fakira ednaldafakira@yahoo.com
//Command:yoga

var yogavideos = ["https://youtu.be/q5nyrD4eM64", "https://youtu.be/MreWx8FhruI", "https://youtu.be/ps3vmnVsnF8"];

module.exports = function (robot){
	return robot.respond(/yoga/i, function (msg){
	  //hubot radom display a video about yoga
	  msg.send(msg.random(yogavideos));
	});
};