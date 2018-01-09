

function init() {
	var canvas = document.getElementById("easel");
	var stage = new createjs.Stage(canvas);
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	
	//variable to hold our animation
	var swirl;
	
	//Setup our Sprite Sheet
	var ss=new createjs.SpriteSheet({
		//Images - location of our sprite sheet
		images:["images/sonic.png"],
		
		//Frames - how large is a frame 
		frames:{
			height:100,
			width:100,
			regX: 50,
			regY:50
			
			}
		
		});


		//After we setup the sprite sheet, wrap it inside of a bitmap animation
		swirl= new createjs.BitmapAnimation(ss);
		
		//Center it on our stage
		swirl.x=centerX;
		swirl.y=centerY;
		
		//Play the animation
		swirl.play();
		
		
		//Add swirl to the stage
		stage.addChild(swirl);
		
		//Setup our ticker
		
		//Set the frame rate
		
		createjs.Ticker.setFPS(25);
		
		createjs.Ticker.addListener(function(){
				
				stage.update();
			
			});

	
	
} //end of init

	