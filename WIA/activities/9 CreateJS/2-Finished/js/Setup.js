window.onload = function() {
	//First we will create a stage
	// The stage contains all of the display objects
	
	var canvas= document.getElementById("canvas1");
	
	//Create our stage
	var stage = new createjs.Stage(canvas);
	
	//Add a blue circle to our stage
	
	//Start with a new graphic
	var circleGraphic = new createjs.Graphics();
	
	
	//Draw a circle with a radius of 50, centered at 0,0 , blue
	
	circleGraphic.beginFill("blue");
	circleGraphic.drawCircle(0,0, 50);
	
	
	//Create a shape instance
	//Shapes are display object that draw vector graphics
	
	var circleShape = new createjs.Shape(circleGraphic);
	
	//All display objects share common properties
	// x, y, alpha , etc...
	circleShape.x = 50;
	circleShape.y = 50;
	

	// In order to show, must add to the stage's display list
	// .addChild() method
	
	stage.addChild(circleShape);
	
	//.update the stage to draw on to the canvas
	stage.update();
	
			
}