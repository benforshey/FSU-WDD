//Ben Forshey
//DWP Online
//26 Feb 2015
//Dynamic Site

//event listener for "document ready"
document.addEventListener('DOMContentLoaded', function () {
    // store all elements that have the class of "view-link"
    var viewLinkArray = document.querySelectorAll('.view-link');

    // loop through the array
    for (var i = 0, j = viewLinkArray.length; i < j; i += 1) {
        //if the element has an href value the same as the query string in the search bar
        if (viewLinkArray[i].attributes.href.value === window.location.search) {
            //set the class name to also have an active state
            viewLinkArray[i].className += " view-link--active";
        //when the page first loads, no query string is present; if that's true
        } else if (window.location.search === '') {
            //mark default option as active
            viewLinkArray[0].className += " view-link--active";
        } else {
            //otherwise just put the class back to where it was
            viewLinkArray[i].attributes.className = 'view-link';
        }
    }
});
