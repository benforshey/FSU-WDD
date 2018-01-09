/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	18 March 2014					*
*	Personal Conditionals	*
*************************/
// Write a conditional to calculate how much my daughter will get paid for chores, if at all.

// declare my variables
var choresDone;
var numChores;
var payRate;
var moneyMade;

// prompt for and set if chores have been done this week
choresDone = prompt("If you have completed any chores this week, enter \"yes\"\nIf you have completed no chores this week, enter \"no\".", "yes");

// validation: check for blank entry / incorrect entry by first checking for the correct input
if (choresDone.toLowerCase() === "yes") {
	numChores = prompt("How many chores did you complete this week?", "3");
	numChores = parseInt(numChores);
	// nesting conditional for natural flow of logic into best case scenario of getting paid
	// Setting up validation for either an zero / empty numerical input, something that isn't a number, or a ridiculous amount of chores that couldn't have been completed by my child.
	if ((isNaN(numChores)) || (numChores > 20) || (numChores < 1)) {
		// Just learned that NaN can't be equal to anything, even itself. To find out if something is not a number, I have to use isNan(). Thanks StackOverflow!
		alert("Sorry, I didn't get a whole number between 1 and 20 as a response.\nPlease reload the page and try again.");
	} else {
		// This is the best case scenario: the user has completed chores and will now have calculated what should be paid her.
		console.log("Great job on doing " +numChores+ " chores!");
		// prompt for pay rate, based on the current free market value of a small child's chore-accomplishing talent, in dollars
		payRate = prompt("How much do you get paid per chore, in dollars?", "0.5"); // changeable value or given
		// parse the result from a string into a floating-point number
		payRate = parseFloat(payRate);
		// validate pay rate
		if (isNaN(payRate) || payRate <= 0) {
			alert("Sorry, you need to enter a positive number.\nPlease reload the application and try again.");
		} else {
			// the calculation of how much money was made for the week's chores
			moneyMade = numChores * payRate;
			// the output
			console.log("You earned $" +moneyMade+ " this week!");
		}
	}
} else if (choresDone.toLowerCase() === "no") {
	// and if no chores were done, stop the conditional logic
	alert("Sorry, if you don't do chores, you don't get paid.");
} else {
	// catch-all for non-valid inputs
	alert("Sorry, I didn't get \"yes\" or \"no\" as a response.\nPlease reload the page and try again.");
}













