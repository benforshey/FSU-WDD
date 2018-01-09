/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	24 March 2014					*
*	Functions Worksheet		*
************************/

/************************
*	Circumference					*
************************/
// Calculate the circumference of a circle, using the radius (2piR)
// initializing my function, with parameter for radius
var caclCircumference = function(radius){
	// simple equation to calculate the circumference of a circle, which is 2 * pi * radius
	var circumference = 2 * radius * Math.PI; // Used "Math.PI" as learned from MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI). Could have also used Pi as a floating point number (3.141592653589793).
	return circumference;
}

// assign variable for function's value to be stored in, while also calling/invoking the function
var circResult = caclCircumference(12); // given or changeable value (can assume whatever unit of measurement you'd like)
// output result, with an optional unit of measurement
var unitOfMeasurement = "inches";
// optional rounding of numbers
circResult = circResult.toFixed(3);
// log to the console
console.log("The circumference of your circle is " +circResult+ " " +unitOfMeasurement+".");

/************************
*	Stung!								*
************************/
// Calculate the number of bee stings required to bring down an animal, if it takes 8.666666667 bee stings per pound of flesh.
// declare my variables
var victimWeight = 30; // changeable value, or given; assume pounds; passed as argument in function call
var animal = "honey badger" // optional given, for output in console

// create function for calculation, with parameter for weight
var caclBeeStingsTillDeath = function(weight) {
	// number of stings per pound required
	var stings = 8.666666667;
	var result = stings * weight;
	return result;
}

// create variable to store returned function value and call/invoke function
var stingsTillDeath = caclBeeStingsTillDeath(victimWeight);
// optional rounding of stings till death
stingsTillDeath = stingsTillDeath.toFixed(3);
// output the story
console.log("It takes " +stingsTillDeath+ " bee stings to kill this " +animal+ ".");











