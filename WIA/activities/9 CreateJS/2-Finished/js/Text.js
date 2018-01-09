window.onload = function() {
	
	var canvas = document.getElementById("canvas1");
	var stage = new createjs.Stage(canvas);
	
	
	//Text class is for working text
	var sentence = new createjs.Text();
	
	//Modify the text property
	sentence.text = "This is a sentence about nothing....or is it?";
	
	//Font property - takes most normall css strings
	sentence.font = "bold 30px Times";
	
	//Specify a color
	sentence.color= "blue";
	
	//Text IS a display object
	//It inherets all of the normal properties
	sentence.x = 150;
	sentence.y = 50;
	//sentence.rotation = 45;
	
	
	//Text has more properties
	//textAlign - "left", "right", "center"
	sentence.textAlign = "left";
	
	//lineWidth - wraps the text.
	sentence.lineWidth = 200;
	
	//Space inbetween those line
	//lineHeight
	sentence.lineHeight = 40;
	
	//Stroke the outside of the text
	//outline - boolean
	sentence.outline = false;
	
	//Combine them into one line
	var sentence2 = new createjs.Text("This is our 2nd text", "bold 30px Times", "blue");
	
	stage.addChild(sentence2);
	
	stage.addChild(sentence);
	stage.update();
	
}