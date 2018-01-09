//Description: Animated Unicorn
//Author Ednalda Fakira ednaldafakira@yahoo.com
//Command: unicorn

module.exports = function(robot){
	return robot.respond(/unicorn/i, function (msg){
	  //hubot retuns an animated picture of a unicorn
	  msg.send('http://www.picgifs.com/animal-graphics/animal-graphics/unicorn/animal-graphics-unicorn-276301.gif');
	});
};