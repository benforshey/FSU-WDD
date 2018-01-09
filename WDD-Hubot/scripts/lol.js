//Description: Woman laughing
//Author Ednalda Fakira ednaldafakira@yahoo.com
//Command: lol

module.exports = function (robot){
	return robot.respond(/lol/i, function (msg){
	  //hubot retuns an animated picture of women laughting
	  msg.send('http://www.picgifs.com/reaction-gifs/reaction-gifs/lol-laughing/lol091%20watermark.gif');
	});
};