/************************
*	Ben Forshey						*
*	Student # 0003487418	*
*	10 March 2014					*
*	Expressions Worksheet	*
*************************/

/************
*	Dog Years	*
*************/
// problem: Calculate Sparky's age in "dog years" (assuming 1 human year is 7 dog years).
// declaring variables
var ageSparkyHumanYears;
var dogYearMultiplier;
var ageSparkyDogYears;

// establish conversion rate for human to dog years
dogYearMultiplier = 7; // the understood rate for dog to human years

// assign Sparky's age in human years
ageSparkyHumanYears = 12; // a "given" or changeable value

// calculate Sparky's age
ageSparkyDogYears = dogYearMultiplier * ageSparkyHumanYears;

// output the result
console.log("Sparky is " + ageSparkyHumanYears + " human years old, which is " + ageSparkyDogYears + " in dog years.");

/************************
*	Slice of Pie (Part 1)	*
*************************/
// problem: Figure out how many slices of pizza are available per person, if each person is willing to eat a fraction of a piece.
// declaring variables
var slicesPerPizza;
var numPizza;
var numPartygoers;
var slicesPerPartygoer;

// establish number of slices for pizza
slicesPerPizza = 8; // baseline for good pizza-slicing technique; change at your own peril 

// assign number of pizzas at the party
numPizza = 4; // a "given" or changeable value

// assign number of partygoers at the party
numPartygoers = 10; // a "given" or changeable value

// calculate number of slices per partygoer
slicesPerPartygoer = (numPizza * slicesPerPizza) / numPartygoers;

// output the result
console.log("Each person ate " + slicesPerPartygoer + " slices of pizza at the party.");

/************************
*	Slice of Pie (Part 2)	*
*************************/
// problem: Assuming that people only eat whole slices and give all their leftovers to Sparky. How many pieces are left over for Sparky?
// declaring variables
var pizzaRemainder;

// calculate remainder of slices left over for Sparky
pizzaRemainder = (numPizza * slicesPerPizza) % numPartygoers;

// output the result
console.log("Sparky got " + pizzaRemainder + " slices of pizza.");

/************************
*	Average Shopping Bill	*
*************************/
// problem: average the past 5 week's grocery bills to use as a baseline for future budgeting
// declaring variables
var pastGroceryBills = [];
var groceryBillTotal;
var groceryBillAverage;

// assign past grocery bills in array
pastGroceryBills[0] = 150.22; // a "given" or changeable value
pastGroceryBills[1] = 73.98; // a "given" or changeable value
pastGroceryBills[2] = 132.12; // a "given" or changeable value
pastGroceryBills[3] = 81.74; // a "given" or changeable value
pastGroceryBills[4] = 160.25; // a "given" or changeable value

// add the values in the array
groceryBillTotal = pastGroceryBills[0] + pastGroceryBills[1] + pastGroceryBills[2] + pastGroceryBills[3] + pastGroceryBills[4];

// average (sum of all numbers divided by number of all sums) the totals using ".length" method instead of original array length of 5, allowing the function to be slightly more dynamic
groceryBillAverage = groceryBillTotal / pastGroceryBills.length;

// output the result using the .toFixed() method I just learned from the JavaScript MDN documentation
console.log("You have spent a total of $" + groceryBillTotal.toFixed(2) + " on groceries over " + pastGroceryBills.length + " weeks. That is an average of $" + groceryBillAverage.toFixed(2) + " per week.");

/************
*	Discounts	*
*************/
// problem: calculate the discounted price for an item, with and without sales tax
// declaring variables
var originalPrice;
var itemName;
var discountRate;
var salesTaxRate;
var discountRateDec;
var salesTaxRateDec;
var discountValue;
var discountedPrice;
var taxedPrice;

// describing my item purchased
itemName = "tin of black shoe polish"; // a "given" or changeable value
originalPrice = 6.96; // a "given" or changeable value

// assigning discount and tax rates, expressed as a percentage
discountRate = 10; // a "given" or changeable value  
salesTaxRate = 9.25; // a "given" or changeable value

// making percentages into floating-point numbers for use in calculating price totals (the "+ 1" for the tax rate is added so that multiplication will result in an increase in price)
discountRateDec = discountRate / 100; // a mathematical fact
salesTaxRateDec = salesTaxRate / 100 + 1; // a mathematical fact

// calculating discounted price of original item for use in other calculations
discountValue = originalPrice * discountRateDec;

// calculate the discounted price, without tax
discountedPrice = originalPrice - discountValue;

// calculate the discounted price, with tax
taxedPrice = discountedPrice * salesTaxRateDec;


// output the results, rounded to 2 decimal places
console.log("Your " + itemName + " was originally $" + originalPrice.toFixed(2) + ", but after a " + discountRate + "% discount, it is now $" + discountedPrice.toFixed(2) + " without tax, and $" + taxedPrice.toFixed(2) + " with tax.");




