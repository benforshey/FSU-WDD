

//Load different scripts based on our tests
//Modernizr.load

Modernizr.load({
	test: Modernizr.inputtypes.date,
	yep: "js/success.js",
	nope: "js/fail.js",
	complete: function(){
		//This will run after the js file is loaded based on the case
		
		console.log("The test is complete");
		
		
		
		
		}
	
	
	
	
	});
