


// A named function
function calcArea(width, height){
	var area = width * height;
	console.log("Named Function was invoked.")
	return area;

}

var calcAreaResult1 = calcArea(10, 2);
console.log(calcAreaResult1);

// An anonymous function
var calcArea = function(width, height){
	var area = width * height;
	console.log("Anonymous Function was invoked.");
	return area;

}

var calcAreaResult2 = calcArea(10, 10);
console.log(calcAreaResult2);