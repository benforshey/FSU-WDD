//  anti-spam honeypot adapted from http://www.smashingmagazine.com/2011/03/04/in-search-of-the-perfect-captcha/
//
//
// self-executing function for function-level variable scope
(function(){
	// declare my variables
	var honeypot = document.getElementById('alt-comment');
	var form = document.getElementById('contact-form');
	// define anonymous function
	var botCheck = function(event){
		// halt submission while checking
		event.preventDefault();
		// check for entry in honeypot field
		if (honeypot.value === ''){
			console.log('This would be a valid submission.');
			form.submit();
		} else {
			console.log('This would be a bot submitting spam.');
			return false;
		}
	};
	// event listener for form submission
	form.addEventListener('submit', botCheck);

})(); // end self-executing function