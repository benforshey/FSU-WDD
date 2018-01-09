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
	
	stage.update();
	
	
			
}