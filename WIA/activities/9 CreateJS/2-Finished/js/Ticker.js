window.onload = function() {
	
	var canvas = document.getElementById("canvas1");
	var stage = new createjs.Stage(canvas);
	
	//Create a red rectangle
	var shape = new createjs.Shape();
	
	//Fill 
	shape.graphics.beginFill("red");
	
	//Draw out the rectanlge
	shape.graphics.rect(0,0, 100, 100);
	
	//Change its registeration point
	shape.regX = 50;
	shape.regY= 50;
	
	//Move the rect to (100,100)
	shape.x = 100;
	shape.y = 100;
	
	stage.addChild(shape);
	
	//stage.update();
	
	
	//Ticker class controls time 
	//A centrallized heart beat that makes a "tick"
	//Create a listener for that tick
	
	//Set our frame rate.  FPS frames per second
	//Default value is 20 fps
	createjs.Ticker.setFPS(30); 
	//30 Frames per second
	
	
	//Create a listener
	createjs.Ticker.addEventListener("tick", ticks);
	
	
	function ticks(e){
		
			//console.log("tick");
			
			shape.rotation +=8;
			
			//shape.alpha -=.05;
			
			//shape.x +=5;
			//shape.y +=5;
			
			//shape.skewX +=20;
			//shape.skewY +=20;
			
			shape.scaleX +=.2;
			shape.scaleY +=.2;
			
						
			stage.update();
		
		}
	
			
}