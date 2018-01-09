/*
*	Ben Forshey
*	16 April 2014
*	The Duel - Part III
*/

// self executing function, as a wrapper
(function(){
	// array that contains fighter objects
	var fighters = [
		{
			name: "Jean Le Maingre",
			health: 100,
			damage: 16
		},
		{
			name: "Henry V",
			health: 100,
			damage: 16
		}
	];

	// declare roundCount, so that it's within the scope of the two functions that use it
	var roundCount = 0;

	// set variable for HTML elements that I'll be updating
	var frenchName = document.getElementById('french-name'),
		englishName = document.getElementById('english-name'),
		frenchHealth = document.getElementById('french-health'),
		englishHealth = document.getElementById('english-health'),
		fightReport = document.getElementById('fight-report'),
		roundReport = document.getElementById('round-report'),
		fightButton = document.getElementById('fight-button');

	// set fighter names to display above health
	frenchName.innerHTML = fighters[0].name;
	englishName.innerHTML = fighters[1].name;

	// change fight button to "Reload" at end of fight
	var reset = function(){
		fightButton.innerHTML = "Reload";
		fightButton.addEventListener('click', reload, false);
	};

	// reload window to start fight over
	var reload = function(){
		document.location.reload(true);
	};

	// initialize fight dialog function, whose parameter changes the meaning of the fight dialog
	var fightDialog = function(uniqueMessage){
		fightReport.innerHTML = uniqueMessage;
	};

	//initialize winner check function, which displays appropriate dialog for victory / defeat / tie, else calling fight function
	var winnerCheck = function(){
		if (fighters[1].health < 1 && fighters[0].health < 1){
			fightDialog("Both armies have been defeated!");
			reset();
		} else if (fighters[0].health < 1 && fighters[1].health >= 1){
			fightDialog(fighters[0].name + " has been defeated!");
			reset();
		} else if (fighters[1].health < 1 && fighters[0].health >=1 ){
			fightDialog(fighters[1].name + " has been defeated!");
			reset();
		} else {
			fight();
		}
	};

	// initialize round check function, which declares draw if 10 rounds have passed, else calling winnerCheck function
	var roundCheck = function(){
		if (roundCount > 9){
			fightDialog("Neither army has won a decisive victory today.");
			reset();
		} else {
			winnerCheck();
		}
	};

	// initialize fight function
	var fight = function(){

		// establish minimum damage (half of max damage)
		var frenchDamageMin = fighters[0].damage / 2,
			englishDamageMin = fighters[1].damage / 2 ;

		// establish math for damage calculation
		var frenchAttack = Math.floor(Math.random() * (fighters[0].damage - frenchDamageMin) + frenchDamageMin),
			englishAttack = Math.floor(Math.random() * (fighters[1].damage - englishDamageMin) + englishDamageMin);

		// subtract and write (on screen) the damage calculated, which updates the global variables
		// disallows negative health (displaying 0 instead)
		fighters[0].health -= englishAttack;
		if (fighters[0].health > 0){
			frenchHealth.innerHTML = fighters[0].health;
		}else{
			frenchHealth.innerHTML = 0;
		}
		fighters[1].health -= frenchAttack;
		if (fighters[1].health > 0){
			englishHealth.innerHTML = fighters[1].health;
		}else{
			englishHealth.innerHTML = 0;
		}
		// tell the story
		fightDialog(fighters[0].name + " took " + englishAttack + " damage.\n" + fighters[1].name + " took " + frenchAttack + " damage.");

		// iterate round count by one
		roundCount ++;
		roundReport.innerHTML = "Round " + roundCount;

	};

	// Set up event listener for fight button, which calls roundCheck function on click.
	fightButton.addEventListener('click', roundCheck, false);

})();
