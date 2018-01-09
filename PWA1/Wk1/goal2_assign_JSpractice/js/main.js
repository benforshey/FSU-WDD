/***************************
	Ben Forshey
	3 April 2014
	JavaScript Practice
***************************/
// self-executing function
(function(){

	/*******************************************

	 STUDENTS ASSIGNMENT

	 1.  create a function named 'avgNumbers'
		 - accept 1 parameter into the function that will be an array of unlimited numbers
		 - find the average of all the numbers
		 - return the average from the function
		 - console.log the answer outside of the function

	 2.  create a function named 'fullName'
		 - accept 2 parameters into the function that are strings (firstname and lastname)
		 - return the name after it has been concatenated
		 - console.log the answer outside of the function

	 3.  create a function named 'wordCount'
		 - accept 1 parameter into the function that is a long string of text words
		 - create a function that counts all the words and return the answer
		 - console.log the answer outside of the function

	 4.  create a function named 'charCount'
		 - accept 1 parameter into the function that is a long string of text
		 - return length of the array of string characters
		 - console.log the answer outside of the function

	 5.  create a function named 'vowelsInWord'
		 - accept 1 parameter into the function that is a a one word string
		 - return the number of vowels in the word
		 - console.log the answer outside of the function

	 6.  create a function named 'findNum'
		 - accepts 2 parameters into the function - 1. array of numbers, 2. boolean
		 - if the second parameter being passed is "false" or null then
			 - create an array with all of the odd numbers from
				the array
		 - else - create an array with all of the even numbers
			from the array
		 - return the array
		 - console.log the answer outside of the function
	 ********************************************/

	console.log('------ Goal2: Assignment: JavaScript Practice ----------');

	console.log("1. avg of an array of numbers");
	var avgNumbers = function(arr){
		// initialize variable for sum of string as a number
		var sum = 0;
		// loop through array, adding up total into sum
		for (var i = 0, x = arr.length; i < x; i++){
			sum += arr[i];
		}
		// calculating average, using divisor as length of array
		var average = sum / x;
		// returning the average
		return average;
	};

	console.log('avg number = ', avgNumbers([1,2,3,4,5]));

	//--------------------------------------------------------
	console.log("2. concat first and last name");
	var fullName = function(first, last){
		// simply concatenates the two parameters of the function, then returns that new string
		var name = first.concat(" ", last);
		return name;
	}

	console.log(fullName('James', 'Bond'));

	//--------------------------------------------------------
	console.log("3. word count");
	var ipsum = "this is test text that is being used as input to a function"
	var wordCount = function(string){
		// splits strings, separated when a space is detected, then counts the length of that array
		var countArray = string.split(" ").length;
		return countArray;
	}

	console.log(wordCount(ipsum));

	//--------------------------------------------------------
	console.log("4. sentence char count");
	var charCount = function(string){
		// uses property of string object to count length, passing into variable that is returned (countLength)
		var countLength = string.length;
		return countLength;
	}

	console.log(charCount(ipsum));

	//--------------------------------------------------------
	console.log("5. how many vowels in a word");
	var vowelsInWord = function(string){

		// set string to lowercase for bulletproof conditional logic (a bit later)
		var vowelLower = string.toLowerCase();

		// declare and initialize my counter
		var numberOfVowels = 0;

		// for loop (with conditional logic nested) to run through the string and test for vowels; found vowels increment counter.
		for (var i = 0, x = vowelLower.length; i < x; i++){
			var letter = string.charAt(i);
			if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u"){
				numberOfVowels++;
			}
		}
		// return the number of values
		return numberOfVowels;
	 }


	console.log(vowelsInWord('JavaScript'));

	//--------------------------------------------------------
	console.log("6. find number and create an array of even or odd numbers");
	var findNum = function(arrayP, booleanP){

		// set length variable for efficient for loop
		var arrayLength = arrayP.length;

		// declare empty arrays to push odd / even numbers into
		var oddArray = [];
		var evenArray = [];

		// write a little context into the situation:
		console.log("This is the original array: ", arrayP);

		// declare for loop which separates the passed array, pushing the results into the appropriate (odd/even) array
		for (var i = 0; i < arrayLength; i++){
			if ((arrayP[i] % 2) > 0){
				oddArray.push(arrayP[i]) ;
			} else if ((arrayP[i] % 2) === 0){
				evenArray.push(arrayP[i]);
			} else {
				// really didn't know what to do with the else statement, but I didn't want to use break; the console gave me a troubleshooting option
				console.log("You have a math problem.");
			}
		}

		// if logic to decide which array is returned when function is called with arguments
		if (booleanP === false || booleanP === null){
			console.log("The odd array: ");
			return oddArray;
		} else {
			console.log("The even array: ");
			return evenArray;
		}
	}

	console.log(findNum([31,22,4,67,83,6,5,4]));
	console.log(findNum([31,22,4,67,83,6,5,4], false));

})();