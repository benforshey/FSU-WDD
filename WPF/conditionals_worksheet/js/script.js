/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	17 March 2014					*
*	Conditionals Worksheet	*
*************************/

// About 3/4ths of the way through this, I realized that I didn't have to do every single problem.
// Since I had already done most, I went ahead and did all but 1 of the exercises.


/**********************
* Stuff Your Face (1) *
***********************/
// Determine whether an entrant qualifies based on his weight.
// declare my variables
var entrantWeight;
var requiredWeight;

// set required weight at 250lbs
requiredWeight = 250;

// set competitor's weight
entrantWeight = 250; // changeable or given value

if (entrantWeight < requiredWeight) {
	console.log("The competitor needs to gain some weight!");
} else {
	console.log("The competitor qualifies for the heavyweight division.");
}

/**********************************
* Celsius to Fahrenheit Converter *
***********************************/
// Convert a temperature to either degrees Celsius or degrees Fahrenheit depending on what the user has entered.
// declare my variables
var unitOfConversion;
var degrees;

// set unit of conversion (convert to Celsius of convert to Fahrenheit)
unitOfConversion = "C"; // changeable or given value
// show the user the choice for unit of conversion
console.log("You have chosen to convert the temperature to " + unitOfConversion +"\xb0.");

// set number of degrees you want converted
// assume that if you are converting to Celsius, you are entering Fahrenheit and vice versa
degrees = 212; // changeable or given value

// convert the temperature, using toLowerCase() so that a user input of "f" doesn't break the calculator
if (unitOfConversion.toLowerCase() === "f") {
	// if statement for conversion to Fahrenheit from Celsius
	degrees = degrees * 9 / 5 + 32;
	console.log("The temperature is " + degrees + "F\xb0.");
} else if (unitOfConversion.toLowerCase() === "c") {
	// else if statement for conversion to Celsius from Fahrenheit
	degrees = (degrees - 32) * 5 / 9;
	console.log("The temperature is " + degrees + "C\xb0.");
} else {
	// else statement to cover bad input
	console.log("Please input either \"F\" or \"C\" for your desired unit of conversion.");
}

/**********************
* Last Chance for Gas *
***********************/
// Determine if an automobile can travel 200 miles with the current amount of fuel in the tank.
// declare my variables
var gasInTank;
var milesPerGallon;
var distanceToTravel;
var canTravel;

// set distance to travel (the length of the desert)
distanceToTravel = 200;

// set miles per gallon efficiency for automobile
milesPerGallon = 25; // changeable or given value

// set how many gallons of fuel are in your tank
gasInTank = 8; // changeable or given value

// calculate how many miles you can travel, based on above inputs
canTravel = gasInTank * milesPerGallon;

// build a little context to the story
console.log("You have to travel " +distanceToTravel+ " miles, and your vehicle gets " +milesPerGallon+ " miles to the gallon.");

// determine (with if statements) if you can travel the distance needed
if (distanceToTravel > canTravel) {
	console.log("You only have " +gasInTank+ " gallons of gas in your tank, better get gas now while you can!");
} else {
	console.log("Yes, you can make it without stopping for gas!");
}

/**************************
* Grade Letter Calculator *
***************************/
// Determine the appropriate letter grade for that number using conditional statements.
// declare my variables
var letterGrade;
var numberGrade;

// set grade, as a percentage
numberGrade = 101; // changeable or given value

// series of conditional statements, starting with the lowest possible grade, in order to determine the letter grade
if (numberGrade < 70) {
	letterGrade = "F";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 73) {
	letterGrade = "D";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 76) {
	letterGrade = "C";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 80) {
	letterGrade = "C+";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 85) {
	letterGrade = "C";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 85) {
	letterGrade = "B";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 90) {
	letterGrade = "B+";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade < 95) {
	letterGrade = "A";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else if (numberGrade <= 100) {
	letterGrade = "A+";
	console.log("You have a " +numberGrade+ "%, which means you have earned a(n) " +letterGrade+ " in the class!");
} else {
	console.log("Please enter a grade percentage as a whole number between 0 and 100.");
}

/********************
* Tire Pressure (1) *
*********************/
// Check to make sure a car’s front two tires and back two tires have the same pressure, though the front and back pairs may have different pressures.
// declare my variables
var tirePressure = [];

// Set tire pressure in array, in PSI. Tires 0 and 1 are front tires; tires 2 and 3 are back tires.
tirePressure[0] = 33; // changeable or given value
tirePressure[1] = 33; // changeable or given value
tirePressure[2] = 31; // changeable or given value
tirePressure[3] = 30; // changeable or given value

// conditional logic to check the tires against the requirements
if (tirePressure[0] === tirePressure[1] && tirePressure[2] === tirePressure[3]) {
	console.log("The tires pass spec!");
} else {
	console.log("Get your tires checked out!");
}

/*********************
* Movie Ticket Price *
**********************/
// Determine which of the two prices the customer is eligible for.
// declare my variables
var customerAge;
var movieShowtime;
var ticketPrice;

// set customer age
customerAge = 11; // changeable or given value

// set showtime for movie, in 24 hour time format
movieShowtime = 1500; // changeable or given value

// create conditional logic for determining which price the customer is eligible for
if ((movieShowtime >= 1500 && movieShowtime <= 1700) || (customerAge >= 55 || customerAge <=10)) {
	ticketPrice = 7;
	console.log("The ticket price is $" +ticketPrice);
} else {
	ticketPrice = 12;
	console.log("The ticket price is $" +ticketPrice);
}