/********************
	Ben Forshey
	2 April 2014
	The Duel - Part I
*********************/

// self executing function, as a wrapper
(function(){
	// player 1 (French) name, health, damage
	var frenchName = "Jean Le Maingre",
		frenchHealth = 100,
		frenchDamageMax = 15; // damage seems optimal for a good mix of all three possible scenarios

	// player 2 (English) name, health, damage
	var englishName = "Henry V",
		englishHealth = 100,
		englishDamageMax = 15; // damage seems optimal for a good mix of all three possible scenarios

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
		if (englishHealth < 1 && frenchHealth < 1){
			alert("Both armies have been defeated!");
			return false;
		} else if (frenchHealth < 1 && englishHealth >= 1){
			alert(frenchName + " has been defeated!");
			return false;
		} else if (englishHealth < 1 && frenchHealth >=1 ){
			alert(englishName + " has been defeated!");
			return false;
		} else {
			return true;
		}
	// end winner check function
	};

	// initialize round check function, which passes a boolean to the continue logic (while loop)
	var roundCheck = function(){
		if (roundCount > 10){
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

		// calling the fight dialog
		fightDialog(frenchName + " has " + frenchHealth + " health. \n||      Pre-Battle      ||\n" + englishName + " has " + englishHealth + " health.");

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
					fightDialog(frenchName + " has " + frenchHealth + " health. \n||      Round " + roundCount + "      ||\n" + englishName + " has " + englishHealth + " health.");

					// establish minimum damage (half of max damage)
					var frenchDamageMin = frenchDamageMax / 2,
						englishDamageMin = englishDamageMax / 2;

					// establish math for damage calculation
					var frenchAttack = Math.floor(Math.random() * (frenchDamageMax - frenchDamageMin) + frenchDamageMin),
						englishAttack = Math.floor(Math.random() * (englishDamageMax - englishDamageMin) + englishDamageMin);

					// subtract the damage calculated, which updates the global variables
					frenchHealth -= englishAttack;
					englishHealth -= frenchAttack;

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














