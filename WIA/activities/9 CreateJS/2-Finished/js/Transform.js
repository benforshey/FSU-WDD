window.onload = function() {
	
	var canvas = document.getElementById("canvas1");
	var stage = new createjs.Stage(canvas);
	
	//Create a shape
	var shape = new createjs.Shape();
	
	//Setup our fill
	shape.graphics.beginFill("red");
	
	//Draw a rectangle
	shape.graphics.drawRect(50,50, 100, 100);
	
	//Lets rotate
	//shape.rotation = 30;
	
	//Move Registration Point
	shape.regX = 100;   //Origin point + width/2  
	shape.regY = 100;  //Origin point + height/2  
	//shape.rotation = 30;
	
	shape.x = 200;
	shape.y = 100;
	
	// start the rect at (0,0, 100, 100) , regX & regY = 50, 50
	
	
	//Scaling
	shape.scaleX = .5;
	shape.scaleY = .5;
	
	//Alpha   0 - 1
	shape.alpha = .5;
	
	//Visible
	// 0 - not visible
	//1 - visible
	shape.visible = 1; 
	//When not visible - not drawn and not clickable
	
	
	//Skewing 
	shape.skewX = 200;
	shape.skewY= 200;
	
	stage.addChild(shape);
	stage.update();
	
	
	
}