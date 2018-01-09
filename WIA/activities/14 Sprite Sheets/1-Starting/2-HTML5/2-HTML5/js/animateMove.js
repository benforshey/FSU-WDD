
var ctx;

var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	

//Create a var to keep track of frame we are on or frame count
var count=0;

//create x and y variable - this will be where in sprite sheet we want the pixels from.
var x;
var y;

//Create variables for x & y positions to move the aniamtion
var xpos=0;
var ypos=0;

var img = new Image();
img.src = "images/sprite_sheet.png";


//once image is loaded then load Draw function
img.onload = draw;

function draw(){
	
	//Call requestAnimationFrame and pass in function that calls it to create a loop
	requestAnimationFrame(draw);
	
	//Clear canvas so image won't stack
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	//Set up count, x, y variables
	//Our sprite sheet is 9 columns accross and total of 150 images
	x = (count%9)*212; //gives us the row.  Each frame is 212 px wide by 201 px high
	y= Math.floor(count/9)* 201;  //each 9 frames accross go down 201
	
	//The we draw image
	ctx.drawImage(img, x, y, 212, 201, xpos++, ypos++, 212, 201);
	
	//Increase the count----but don't go past the number of frames (150)
	if(count ==149){
			count=0;
		}else{
			count++;
			}
}

function init() {
	
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	

}


