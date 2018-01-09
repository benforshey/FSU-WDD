var ctx;
var canvas = document.getElementById("canvas");
ctx=canvas.getContext("2d");


//Create a variable to keep track of our count
var count=0;

//Variables x& y coordinates where in the sprite sheet is our frame

var x;
var y;

//Create the movement or position x, y variables
var xPos=800;
var yPos=600;


//Import our image

var img = new Image();
img.src="images/doggy.png";


//Once it loads , then call the draw function
img.onload=draw;

function draw(){
	
	//Request an animation frame, and pass this function to create a loop
	requestAnimationFrame(draw);
	
	//Clear the rectangle on our canvas
	ctx.clearRect(0,0,800, 600);
	
	
	//Setup the count, x, and y
	
	//Sprite Sheet is 9 columns, 150 frames total  width - 213 height-201
	
	//Gives us what column we are in
	x = (count%9)*213;
	
	//Gives the row
	y = Math.floor(count/9)*201;
	
	
	//Draw the image on to the canvas
	ctx.drawImage(img, x, y, 213, 201, xPos--, yPos-- ,213,201);
	
	
	//Setup the count
	if(count==149){
		//Reset the count
		count=0;
		
		}else{
			count++;
			}
	
	
	
	}
