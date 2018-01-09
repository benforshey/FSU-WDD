/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	11 March 2014					*
*	Wacky Expressions			*
*************************/
// declare my variables
var brushPerDay;
var ageStart;
var ageStop;
var totalBrushings;
var daysInYear;

// prompt for tooth brushes per day ("good default" based on realistic expectations)
brushPerDay = prompt("How many times do you brush your teeth each day?", "2");
// prompt for age when tooth brushing began ("good default" based on my own life / parenting experiences)
ageStart = prompt("How old were you when you began brushing your own teeth?", "3");
// prompt for age expected lifespan ("good default" of 79 was based on average lifespan for Florida Resident)
ageStop = prompt("How many years do you expect to live?", "79");

// parse string of brushings per day into floating-point number
brushPerDay = parseFloat(brushPerDay);
// parse string of age when brushing started into floating-point number
ageStart = parseFloat(ageStart);
// parse string of age when brushing will stop into floating-point number
ageStop = parseFloat(ageStop);

// set days in year for multiplication in total brushings calculation
daysInYear = 365;
// calculate number of brushings in lifespan
totalBrushings = (ageStop - ageStart) * brushPerDay * daysInYear;

// output the results
console.log("Since you started brushing your teeth at age " + ageStart + " and estimate your life expectancy to be " + ageStop + ", you will brush your teeth a total of " + totalBrushings + " times in your lifetime." +)