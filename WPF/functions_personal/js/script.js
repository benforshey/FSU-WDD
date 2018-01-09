/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	25 March 2014					*
*	Personal Functions		*
************************/

/******************************
* Bulk Coverage Calculator		*
******************************/
// create a calculator that can accept (and validate) input for a bulk material that will be spread (like mulch or gravel), which is usually sold in cubic yards
// declare variables
var materialSpread;
var passLogic;
var width;
var length;
var depth;
var validateString;
var validateNumber;
var materialValid;
var widthValid;
var lengthValid;
var depthValid;
var calcCubic;
var cubicTotal;

// initialize anonymous functions for use later in program
// validates strings against numeric and blank inputs; doesn't guard against errors like "as234$#$" or "#($#"
validateString = function(input){
	if (input === " " || input <=0 || input >= 0) {
		passLogic = false;
		return passLogic;
	} else {
		passLogic = true;
		return passLogic;
	}
};
// validates numbers against strings and negative floating-point numbers
validateNumber = function(input){
	if (isNaN(input) || input <= 0) {
		passLogic = false;
		return passLogic;
	} else {
		passLogic = true;
		return passLogic;
	}
};
// calculates the cubic yards of bulk material needed
calcCubic = function(ftWidth, ftLength, inDepth) {
	// converts inches (most likely unit of measurement for depth) into feet
	var ftDepth = inDepth / 12;
	// gets cubic feet total
	var cubicFeet = ftDepth * ftLength * ftWidth;
	// divides cubic feet total by 27 (because there are 27 cubic feet in a cubic yard)
	var cubicYards = cubicFeet / 27;
	return cubicYards;
};

// prompt the user for what type of material is being spread
materialSpread = prompt("What material would you like to spread?", "gravel");
// bring input to lower case for consistency in the output below
materialSpread = materialSpread.toLowerCase();
// returns pass logic for ternary operator
materialValid = validateString(materialSpread);
// ternary operator decision on which story to print
materialValid ? console.log("You will be spreading " +materialSpread+ ".") : console.log("You did not enter a material that could be spread. Please reload the page and enter a non-numeric value.");

// prompt for dimensions of area to have material spread upon
width = prompt("What is the width, in feet, of the area you are going to cover with " +materialSpread+ "?");
// convert to floating-point number and round to three decimal places for output below
width = parseFloat(width).toFixed(3);
// validate input with my shiny new function
widthValid = validateNumber(width);
// ternary operator decision on which story to print
widthValid ? console.log("Your width is " +width+ " feet.") : console.log("You did not enter a width that I could calculate. Please reload the page and enter a positive numeric value.");

// prompt for dimensions of area to have material spread upon
length = prompt("What is the length, in feet, of the area you are going to cover with " +materialSpread+ "?");
// convert to floating-point number and round to three decimal places for output below
length = parseFloat(length).toFixed(3);
// validate input with my shiny new function
lengthValid = validateNumber(length);
// ternary operator decision on which story to print
lengthValid ? console.log("Your length is " +length+ " feet.") : console.log("You did not enter a length that I could calculate. Please reload the page and enter a positive numeric value.");

// prompt for dimensions of area to have material spread upon
depth = prompt("What is the depth, in inches, of the area you are going to cover with " +materialSpread+ "?");
// convert to floating-point number and round to three decimal places for output below
depth = parseFloat(depth).toFixed(3);
// validate input with my shiny new function
depthValid = validateNumber(depth);
// ternary operator decision on which story to print
depthValid ? console.log("Your depth is " +depth+ " inches.") : console.log("You did not enter a depth that I could calculate. Please reload the page and enter a positive numeric value.");

// do the math, using already validated inputs and output the result into a story
cubicTotal = calcCubic(width, length, depth);
// convert cubic total into a more readable output
cubicTotal = cubicTotal.toFixed(3);
// the story
console.log("You are going to need to order " +cubicTotal+ " cubic yards of " +materialSpread+ " in order to cover the area you have measured.");































