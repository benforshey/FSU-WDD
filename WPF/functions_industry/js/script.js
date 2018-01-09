/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	25 March 2014					*
*	Industry Functions		*
************************/

/**************************************
* Allowable Nicked or Broken Strands	*
***************************************/
// receives the number of nicked wire strands that you report and compares it to a workcenter standard
// declare my variables
var strandsInWire;
var damagedStrands;
var passLogic;
var validWire;
var validDamaged;
var allowableNicked;

// initialize functions for later use in application
// named function that validates numbers against strings and negative floating-point numbers (reused, but I wouldn't write it any other way for this program)
function validateNumber(input){
	if (isNaN(input) || input <= 0) {
		passLogic = false;
		return passLogic;
	} else {
		passLogic = true;
		return passLogic;
	}
};

// get number of strands the wire in question has
strandsInWire = prompt("How many strands does your wire have?", "24");
// parse string to an integer
strandsInWire = parseInt(strandsInWire);
// validate the integer
validWire = validateNumber(strandsInWire);

// ternary to continue with story
validWire ? console.log("You are checking a " +strandsInWire+ " strand wire for nicks.") : console.log("I didn't receive an valid input. Please enter a positive whole number.");

// get number of damaged strands the wire in question has
damagedStrands = prompt("How many of those " +strandsInWire+ " strands are nicked?", "1");
// parse sting into an integer
damagedStrands = parseInt(damagedStrands);
// validate the integer
validDamaged = validateNumber(damagedStrands);

// ternary to continue with the story
validDamaged ? console.log("You have " +damagedStrands+ " nicked strand(s) in your " +strandsInWire+ "-strand wire.") : console.log("I didn't receive an valid input. Please enter a positive whole number. If you have no nicked strands, then your wire passes inspection.");

// conditional logic to determine number of nicked strands against workcenter data
if (strandsInWire > 37) {
	allowableNicked = 6;
} else if (strandsInWire > 19) {
	allowableNicked = 4;
} else if (strandsInWire > 7) {
	allowableNicked = 2;
} else {
	allowableNicked = 0;
}

// conditional logic to determine if the wire passes inspection, then writes appropriate story
if (damagedStrands > allowableNicked) {
	console.log("Sorry, but you need to replace that section of damaged wire. " +damagedStrands+ " nicked strand(s) of wire in a " +strandsInWire+ "-strand wire is just too many.");
} else {
	console.log("Your wire passes inspection!");
}
























