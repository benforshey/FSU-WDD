/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	11 March 2014					*
*	Industry Expressions	*
*************************/
// declare my variables
var projectName;
var hourlyWage;
var hoursWorked;
var daysOfWork;
var projectIncome;

// prompt for project name
projectName = prompt("What project are you working on?");
// prompt for hourly wage
hourlyWage = prompt("What do you charge, per hour?\nPlease do not include a \"$\" in your answer.");
// prompt for hours worked 
hoursWorked = prompt("How many hours per day do you anticipate spending on this project?");
// prompt for estimated project length, in days
daysOfWork = prompt("How many days of work do you estimate this project will give you?");

// parse hourly wage into a floating-point number
hourlyWage = parseFloat(hourlyWage);
// parse hours worked into a floating-point number
hoursWorked = parseFloat(hoursWorked);
// parse days of work into a floating-point number
daysOfWork = parseFloat(daysOfWork);

// calculate project income
projectIncome = hourlyWage * hoursWorked * daysOfWork;

// output results into console
console.log("Your project, " + projectName + ", will give you a gross income of $" + projectIncome + ".");