window.onload = function() {
	
	var canvas = document.getElementById("canvas1");
	var stage = new createjs.Stage(canvas);
	
	//Create a graphic shape
	var shape = new createjs.Shape();
	
	//Starting Commands (Normal)
	
	//Create a stroke
	shape.graphics.beginStroke("blue");
	shape.graphics.setStrokeStyle(10, "round", "round");
	
	//Draw a triangle
	shape.graphics.moveTo(50,50);
	shape.graphics.lineTo(250,250);
	shape.graphics.lineTo(50,250);
	shape.graphics.closePath();
	
	
	//Compacted Code
	shape.graphics.beginStroke("red").setStrokeStyle(10, "round", "round").moveTo(50,50).lineTo(250,250).lineTo(50,250).closePath();
	
	//Compact it more by using shortcuts
	shape.graphics.s("purple").ss(10,1, 1).mt(50,50).lt(250,250).lt(50,250).cp();
	
	
	stage.addChild(shape);
	stage.update();

}