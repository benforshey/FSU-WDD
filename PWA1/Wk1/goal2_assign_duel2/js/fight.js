/********************
	Ben Forshey
	9 April 2014
	The Duel - Part II
*********************/

// self executing function, as a wrapper
(function(){
	// player 1 (French) name, health, damage
	var french = ["Jean Le Maingre", 100, 16]; // damage seems optimal for a good mix of all three possible scenarios

	// player 2 (English) name, health, damage
	var english = ["Henry V", 100, 16]; // damage seems optimal for a good mix of all three possible scenarios

	// declare roundCount, so that it's within the scope of the two functions that use it
	var roundCount = 0;

	// initialize fight dialog function, whose parameter changes the meaning of the fight dialog
	var fightDialog = function(uniqueMessage){
		alert(uniqueMessage);
		console.log(uniqueMessage);
	// end fight dialog function
	};

	//initialize winner check function, which passes a boolean to the continue logic (while loop)
	var winnerCheck = function(){
		if (english[1] < 1 && french[1] < 1){
			alert("Both armies have been defeated!");
			return false;
		} else if (french[1] < 1 && english[1] >= 1){
			alert(french[0] + " has been defeated!");
			return false;
		} else if (english[1] < 1 && french[1] >=1 ){
			alert(english[0] + " has been defeated!");
			return false;
		} else {
			return true;
		}
	// end winner check function
	};

	// initialize round check function, which passes a boolean to the continue logic (while loop)
	var roundCheck = function(){
		if (roundCount >= 10){
			alert("Neither army has won a decisive victory today.");
			return false;
		} else {
			return true;
		}
	// end round check function
	};

	// initialize fight function
	var fight = function(){

		// declare that we continue through the first round, by default
		var winnerBoolean = true,
			roundBoolean = true;

		// after many rounds of testing, found this feature more annoying than interesting (calling the fight dialog)
		// fightDialog(french[0] + " has " + french[1] + " health. \n||      Pre-Battle      ||\n" + english[0] + " has " + english[1] + " health.");

		// loop through 20 rounds of fighting (round check function controls actual number of rounds played)
		for (var i = 1; i < 21; i++){

			// call round check to see if we are greater than 10 rounds
			var roundBoolean = roundCheck();
			console.log(roundBoolean);

			// if function round check returns true, we continue
			if (roundBoolean){
				// iterate round count, for the round check function
				roundCount++;

				// call winner check to determine outcome of fight
				var winnerBoolean = winnerCheck();
				console.log(winnerBoolean);

				// nested conditional to continue if function call to winnerCheck comes back with true.
				if (winnerBoolean){
					// call the fight dialog to display results; must display here or it will display negative damage (if called after damage is applied at bottom)
					fightDialog(french[0] + " has " + french[1] + " health. \n||      Round " + roundCount + "      ||\n" + english[0] + " has " + english[1] + " health.");

					// establish minimum damage (half of max damage)
					var frenchDamageMin = french[2] / 2,
						englishDamageMin = english[2] / 2;

					// establish math for damage calculation
					var frenchAttack = Math.floor(Math.random() * (french[2] - frenchDamageMin) + frenchDamageMin),
						englishAttack = Math.floor(Math.random() * (english[2] - englishDamageMin) + englishDamageMin);

					// subtract the damage calculated, which updates the global variables
					french[1] -= englishAttack;
					english[1] -= frenchAttack;

				} else {
					// breaks conditional logic if winner check comes back false
					break;
				}

			} else {
				// breaks conditional logic if round check comes back false
				break;
			}
		// end for loop
		};

	// end fight function
	};
	// call fight function
	fight();
})();














