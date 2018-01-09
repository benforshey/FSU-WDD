/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	11 March 2014					*
*	Personal Expressions	*
*************************/
//declare variables
var coffeeSpread = [];
var coffeeSpreadFloat = [];
var coffeeCupsSum;
var coffeeCupsAverageDay;
var daysInYear;
var coffeeCupsAverageYear;

// Prompt the user for average cups of coffee each day, seven times. Defaults are included, but may be overridden.
coffeeSpread[0] = prompt("How many cups of coffee did you have on Monday?", "2");
coffeeSpread[1] = prompt("How many cups of coffee did you have on Tuesday?", "1");
coffeeSpread[2] = prompt("How many cups of coffee did you have on Wednesday?", "1");
coffeeSpread[3] = prompt("How many cups of coffee did you have on Thursday?", "1");
coffeeSpread[4] = prompt("How many cups of coffee did you have on Friday?", "1");
coffeeSpread[5] = prompt("How many cups of coffee did you have on Saturday?", "2");
coffeeSpread[6] = prompt("How many cups of coffee did you have on Sunday?", "1");

// convert strings from array into floatig point number
coffeeSpreadFloat[0] = parseFloat(coffeeSpread[0]);
coffeeSpreadFloat[1] = parseFloat(coffeeSpread[1]);
coffeeSpreadFloat[2] = parseFloat(coffeeSpread[2]);
coffeeSpreadFloat[3] = parseFloat(coffeeSpread[3]);
coffeeSpreadFloat[4] = parseFloat(coffeeSpread[4]);
coffeeSpreadFloat[5] = parseFloat(coffeeSpread[5]);
coffeeSpreadFloat[6] = parseFloat(coffeeSpread[6]);

// calculate sum of cups of coffee
coffeeCupsSum = coffeeSpreadFloat[0] + coffeeSpreadFloat[1] + coffeeSpreadFloat[2] + coffeeSpreadFloat[3] + coffeeSpreadFloat[4] + coffeeSpreadFloat[5] + coffeeSpreadFloat[6];

// average cups per day
coffeeCupsAverageDay = coffeeCupsSum / coffeeSpreadFloat.length;

// declare days in a "normal" year
daysInYear = 365;

// calculate average cups per year
coffeeCupsAverageYear = coffeeCupsAverageDay * daysInYear;

// write output
console.log("You will consume approximately " + coffeeCupsAverageYear.toFixed(2) + " cups of coffee in one year. You average " + coffeeCupsAverageDay.toFixed(2) + " cups of coffee per day." );