/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	19 March 2014					*
*	Wacky Conditionals	*
*************************/
// green eggs and ham conditionals
// declare my variables
var doYouLike;
var numEggs;
var cookTime;
var timeTillReady;

// prompt for liking green eggs and ham
doYouLike = prompt("Do you like green eggs and ham?");
// validation for doYouLike
if (!isNaN(doYouLike) ) {
	console.log("There's no use in avoiding the question. Why don't you refresh the application and try again?");
} else {
	// silly story
	console.log("\"" +doYouLike+ "\", you say? Sam-I-Am doesn't really listen that well.");
	// prompt for how many eggs you would like cooked
	numEggs = prompt("Sam-I-Am can only cook 1 egg at a time, so how many eggs would you like?", "2");
	// turn that number into an integer
	numEggs = parseInt(numEggs);
	// validate that input from the prompt
	if (isNaN(numEggs) || numEggs <= 0) {
		alert("Well, that won't do at all!\nPlease enter a positive whole number of eggs that you'd like cooked.");
	} else {
		// prompt for how well cooked you like your eggs
		cookTime = prompt("How well done do you want your eggs that you may or may not want?\nEnter \"1\" for sunny-side up.\nEnter \"2\" for over easy.\nEnter \"3\" for well done.");
		// turn cook time into a number
		cookTime = parseInt(cookTime);
		// validate cook time
		if (cookTime === 1 || cookTime === 2 || cookTime === 3) {
			// calculate how long until your eggs are ready
			timeTillReady = cookTime * numEggs;
			// output the story
			console.log("Sam-I-Am will cook you " +numEggs+ " egg(s) at " +cookTime+ " minutes a piece. Your eggs will be ready in " +timeTillReady+ " minutes.");
		} else {
			//
			alert("Sam-I-Am doesn't cook eggs like that.\nNext time, please enter (without quotation marks)\n\"1\" for sunny-side up.\nEnter \"2\" for over easy.\nEnter \"3\" for well done.");
		}
	}
}
