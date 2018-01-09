//Description: Picture of a Blue Moon
//Author: Ednalda Fakira ednaldafakira@yahoo.com
//Command: bluemoon

module.exports = function(robot){
	return robot.respond(/bluemoon/i, function (msg){
	//hubot returns a blue moon title, website address and a picture.
	   msg.send('http://apod.nasa.gov/apod/image/1507/STACKED-COLOUR-ISS-ODonnell.jpg', 'http://apod.nasa.gov/apod/astropix.html', 'Blue Moon');
	});
};