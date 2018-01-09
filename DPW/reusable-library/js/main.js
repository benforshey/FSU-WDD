//Ben Forshey
//DWP Online
//19 Feb 2015
//Reusable Library

//function to validate form
var validateForm = function (event) {
    //prevent submission
    event.preventDefault(event);
    //set array to contents of all selectors with attribute "required"
    var requiredArray = document.querySelectorAll('[required]'),
        //set array to content of all span elements with class "label-required"
        requireText = document.querySelectorAll('span.label-required'),
        //set var to form
        wineForm = document.getElementById('wine-form'),
        //initialize var for numeric submission logic
        formFilled = 0;

    //loop through array
    for (var i = 0, l = requiredArray.length; i < l; i += 1) {
        //if blank
        if (requiredArray[i].value == '') {
            //set color to red
            requireText[i].style.color = '#FF0000';
            //and subtract 1 from form filled number
            formFilled -= 1;
        } else {
            //set color back to black
            requireText[i].style.color = '#000000';
            //and add 1 to form filled number
            formFilled += 1;
        }
    }
    //if the number of forms filled (determined from above for loop) is 5 (in both type and value)
    if (formFilled === 5) {
        //submit the form
        wineForm.submit();
    }
};

// function to calculate the rating and limit it to 100
var calcRating = function (ones, tens) {
    var total = parseInt(ones, 10) + parseInt(tens, 10);
    if (total > 100) {
        total = 100;
        return total;
    } else {
        return total;
    }
};

//listen for DOM content loaded event and fire an anonymous function
document.addEventListener('DOMContentLoaded', function () {

    //if the form element exists (prevents nuisance warnings in console)
    if (document.getElementById('wine-form')) {
        //create a button element (done because the DOM wasn't liking the GAE way of loading things
        var button = document.createElement('button'),
            //get the location to which I will append the button
            appendLocation = document.getElementById('submit-block');
        //set the inner text
        button.innerHTML = "Label this Wine";
        //append the button
        appendLocation.appendChild(button);
        //set an event listener to call validateForm when the button is clicked
        button.addEventListener('click', validateForm);

        //get values of spans to display current slider value
        var displayOnes = document.getElementById('range-math-subtotal--ones'),
            displayTens = document.getElementById('range-math-subtotal--tens'),
            displayTotal = document.getElementById('range-math-total'),
            sliderOnes = document.getElementById('wine-rating--ones'),
            sliderTens = document.getElementById('wine-rating--tens'),
            //set initial value of ones and tens (equal to value set in html element)
            ones = 5,
            tens = 50;

        //event listener to set span value on change of slider
        sliderOnes.addEventListener('change', function (){
            displayOnes.innerHTML = sliderOnes.value;
            ones = parseInt(sliderOnes.value, 10);
            //call function to calculate total and set inner HTML of span
            displayTotal.innerHTML = calcRating(ones, tens);
        }, false);
        //event listener to set span value on change of slider
        sliderTens.addEventListener('change', function (){
            displayTens.innerHTML = sliderTens.value;
            tens = parseInt(sliderTens.value, 10);
            //call function to calculate total and set inner HTML of span
            displayTotal.innerHTML = calcRating(ones, tens);
        }, false);
    }
});