/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	19 March 2014					*
*	Industry Conditionals	*
*************************/
// perform px to em / em to px conversion
// declare my variables
var unitEnd;
var convertBoolean;
var scriptFill;
var basePixel;
var convertingUnit;
var convertedUnit;

// prompt user for which unit to be converted
unitEnd = prompt("Would you like to convert into Pixels or EMs?\nEnter \"PX\" for Pixels or \"EM\" for EMs.");
// remove case sensitivity for validation
unitEnd = unitEnd.toLowerCase();
// validate the response
if (unitEnd === "px") {
	// using a boolean value of true (primarily for my ternary operator) for conversion into pixels
	convertBoolean = true;
	// Use a ternary operator to assign a string of text to my variable, which will be used in the console.log(), below.
	scriptFill = convertBoolean ? "You have chosen to convert EMs into Pixels." : "You have chosen to convert Pixels into EMs.";
	// print out decision
	console.log(scriptFill);
	// get base pixel size
	basePixel = prompt("What is your base Pixel size?\nMost modern browsers have a default size of 16px.", "16");
	// parse into integer
	basePixel = parseInt(basePixel);
	// set up validation for input of base pixels, guarding against non numbers and negative inputs
	if (isNaN(basePixel) || basePixel <= 0) {
		alert("Sorry, but you have to enter base Pixel size that is a positive whole number.\nPlease reload the application and try again.");
	} else {
		// get input for em conversion
		convertingUnit = prompt("What size EM would you like to convert into Pixels?");
		// parse ems into floating point number (since ems can have several decimal places)
		convertingUnit = parseFloat(convertingUnit);
		// round decimal places off to a maximum of three
		convertingUnit = convertingUnit.toFixed(3);
		// set up validation for non numbers and negative inputs
		if (isNaN(convertingUnit) || convertingUnit <= 0) {
			alert("Sorry, but you have to enter an EM size that is a positive rational number.\nPlease reload the application and try again.");
		} else {
			// math for em to px conversion
			convertedUnit = basePixel * convertingUnit;
			// output of results in dialog
			console.log("At a base Pixel size of " +basePixel+ "PX, " +convertingUnit+ "EMs is " +convertedUnit+ "PX.");
		}
	}
} else if (unitEnd === "em") {
	// using a boolean value of false (primarily for my ternary operator) for conversion into ems
	convertBoolean = false;
	// Use a ternary operator to assign a string of text to my variable, which will be used in the console.log(), below.
	scriptFill = convertBoolean ? "You have chosen to convert EMs into Pixels." : "You have chosen to convert Pixels into EMs.";
	// print out decision
	console.log(scriptFill);
	// get base pixel size
	basePixel = prompt("What is your base Pixel size?\nMost modern browsers have a default size of 16px.", "16");
	// parse into integer
	basePixel = parseInt(basePixel);
	// set up validation for input of base pixels, guarding against non numbers and negative inputs
	if (isNaN(basePixel) || basePixel <=0) {
		alert("Sorry, but you have to enter base Pixel size that is a positive whole number.\nPlease reload the application and try again.");
	} else {
		// get input for px conversion
		convertingUnit = prompt("What size Pixels would you like to convert into EMs?");
		// parse into integer (because pixels are represented as whole numbers)
		convertingUnit = parseInt(convertingUnit);
		// set up validation for non numbers and negative inputs
		if (isNaN(convertingUnit) || convertingUnit <= 0) {
			alert("Sorry, but you have to enter an Pixel size that is a positive whole number.\nPlease reload the application and try again.");
		} else {
			// math for px to em conversion
			convertedUnit = convertingUnit / basePixel;
			// output of results in dialog
			console.log("At a base Pixel size of " +basePixel+ "PX, " +convertingUnit+ "PX is " +convertedUnit+ "EMs.");
		}
	}
} else {
	// validation forcing the user to restart if anything other than a valid input was entered
	alert("Sorry, I didn't get a valid response.\nPlease reload the application and enter either \"PX\" for Pixels or \"EM\" for EMs (without the quotation marks).");
}