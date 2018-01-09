/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	26 March 2014					*
*	Wacky functions				*
************************/

/******************************
*		Misconception Perception	*
******************************/
// quiz on "common" misconceptions
// declare my variables
var trueFalse;
var convert;
var q1;
var a1;
var q2;
var a2;
var q3;
var a3;
var tally;

// function to convert input into lowercase (used for prompt answers, in this case)
convert = function(input){
	input = input.toLowerCase();
	return input;
};
// function to match and validate answers; can be true or false, other answers return an error
trueFalse = function(input){
	switch(input){
		case "true":
			return true;
		case "false":
			return false;
		default:
			console.log("Please answer with \"true\" or \"false\" (without quotation marks). Please reload the page and try again.");
			return "error";
	}
};

// alert, setting up ground rules
alert("For each question, please answer \"true\" or \"false\". For references, please view the source code.");

// give tally a value of 0, so that it can be iterated to the number of correct answers
tally = 0;

// prompt question #1
q1 = prompt("In a freefall (without wind resistance), the larger an object is, the faster it will fall.");
// convert question to lower case
q1 = convert(q1);
// send question to function to return answer as boolean
a1 = trueFalse(q1);
// ternary statement to give reply
a1 ? console.log("Incorrect; without wind resistance, all objects on earth fall at 9.8m/s/s.") : (tally++, console.log("Correct!")); // http://www.physicsclassroom.com/class/1DKin/Lesson-5/How-Fast-and-How-Far

// prompt question #2
q2 = prompt("High-voltage electrocution is more dangerous than low-voltage electrocution.");
// convert question to lower case
q2 = convert(q2);
// send question to function to return answer as boolean
a2 = trueFalse(q2);
// ternary statement to give reply
a2 ? console.log("Incorrect; amperage has much more effect on lethality in electrocution than does voltage.\nGiven adequate amperage (which is as little as .1 amps), more high-voltage electrical shocks are survived than low-voltage electrocutions, assuming adequate voltage (as low as 47 volts).") : (tally++, console.log("Correct!")); // http://www.physics.ohio-state.edu/~p616/safety/fatal_current.html

// prompt question #3
q3 = prompt("When fired from a rifled barrel, a bullet will immediately begin to fall.");
// convert question to lower case
q3 = convert(q3);
// send question to function to return answer as boolean
a3 = trueFalse(q3);
// ternary statement to give reply
a3 ? (tally++, console.log("Correct!")) : console.log("Incorrect; it is a common misconception that the conical shape and rotation of a bullet will cause it to first rise, then fall."); // http://www.rifleshootermag.com/2010/11/02/shooting_tips_ballistics_0303/

// print out number of correct answers
console.log("Congratulations! You scored " +tally+ " correct answers.");