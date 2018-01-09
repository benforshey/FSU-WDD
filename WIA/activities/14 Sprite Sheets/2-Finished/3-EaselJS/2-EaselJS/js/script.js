var ship;


function init() {
	
	var canvas = document.getElementById("easel");
	var stage=new createjs.Stage(canvas);
	
	//Find center of stage
	var centerX = canvas.width/2;
	var centerY= canvas.height/2;
	
	//Create sprite sheet
	
	var ss = new createjs.SpriteSheet({
		
		//Animations variable - allows us to name different section of our total sprite sheet
		
		animations:{
			//Written sort of JSON data
			//Sequence names
			fly:[0,6],
			explode:[7,11, "fly"]
			
			
			},
		
		//images is a variable that takes the location of our sprite sheet image
		
		images:["images/Ship-Blink.png"],
		
		//Frames - how do we break up the image?
		//Registration point in the center of our image
		// 110 by 80 px
		frames:{
			regX:55,
			regY:40,
			height:80,
			width:110
			
			}
		
		
		
		
		}); //End of sprite sheet
	
	
	//Wrap the sprite sheet inside of a bitmap animation
	ship= new createjs.BitmapAnimation(ss);
	
	//Center the ship on the screen
	
	ship.x = centerX;
	ship.y= centerY;
	
	//.play() plays the WHOLE animation
	//ship.play();
	
	//Play a named sequence 
	ship.gotoAndPlay("fly");
	
	//Add ship to the stage
	stage.addChild(ship);
	
	//setup ticker
	//Set our frame rate
	createjs.Ticker.setFPS(15);
	
	createjs.Ticker.addListener(function(){
		stage.update();
		
		});
	
	
} //end of init


function blowUp(){
	
	ship.gotoAndPlay("explode");
	
	}