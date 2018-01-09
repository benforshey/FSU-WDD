/*****************************************************************************
* Following Screencast on Variable Declaration, Association, and Expressions *
******************************************************************************/
// declare my variables
var yearBorn;
var age;

// get age for display
// yearBorn = prompt("In which year were you born?", 1980);

//calculate your approximate age
age = 2014 - yearBorn;

// output
// console.log("You are (or soon will be) " + age + " years old.");

/*********************************************************************
* Following Screencast on Variable Types (String, Boolean, Integers) *
**********************************************************************/
// declare my variables
var firstName;
var lastName;
var isStudent;
var escapedString;

// set up content for display
isStudent = true;
firstName = "Ben";
lastName = "Forshey";
escapedString = "\"This is an 'escaped' string\", said ";

//output
// console.log(escapedString + firstName + " " + lastName + ". That's " + isStudent + " said the boolean value.");

/*********************************
* Following Screencast on Arrays *
*********************************/
// declare / initi[alize my variables
var familyArray = [];
var averageArray = [];
var averageArraySum;
var averageArrayAverage;

// set up for display
familyArray = ["Ben", "Susi", "Violet", "Lila"];
averageArray = [12, 34, 95, 38, 0, 100];
averageArraySum = averageArray[0] + averageArray[1] + averageArray[2] + averageArray[3] + averageArray[5];
averageArrayAverage = averageArraySum / 6;

// display
// console.log(familyArray);
// console.log(averageArrayAverage);

/***************************************************************
* Following Screencasts on Arithmetic and Assignment Operators *
****************************************************************/
// declare my variables
var pi;
var rad;
var radSquared;
var areaCircle;
var areaCircleAltered;

// set radius of circle before calculating it below
rad = prompt("What is the radius of your circle, in inches?", "6");

// absolutes in the area equation
pi = 3.141592653589793;
radSquared = rad * rad;
areaCircle = pi * radSquared;

// output
console.log("The area of your circle is " + areaCircle + " inches squared.");
/**********************************
* Following Screencast on Casting *
***********************************/
// declare my variables
var ceditCardNumber;
var firstFour;
var secondFour;
var thirdFour;
var fourthFour;

// credit card numbers, broken into four groups of four numbers
firstFour = 1234;
secondFour = 5678;
thirdFour = 9101;
fourthFour = 1121;

// credit card number, as a whole. cast as strings and concatenated together
ceditCardNumber = String(firstFour) + " " + String(secondFour) + " " + String(thirdFour) + " " + String(fourthFour);

// output
// console.log(ceditCardNumber);