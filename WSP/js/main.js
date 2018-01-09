$(document).ready(function () {
    'use strict';

    // event listener for off canvas nav
    $('.offCanvasNav-js-open').on('click', function (event) {
        event.preventDefault();
        $('.offCanvasNav').removeClass('is-closing').addClass('is-opening');
    });
    $('.offCanvasNav-js-close').on('click', function (event) {
        event.preventDefault();
        $('.offCanvasNav').removeClass('is-opening').addClass('is-closing');
    });

    // event listener for distance filter change
    $('#filter-distance').on('change', function () {
        $('#distance-miles').text($('#filter-distance').val());
    });

    // click anywhere on card (in search-overview) to see its details
    $('.card').css('cursor', 'pointer').on('click', function (event) {
        event.preventDefault();
        window.location.href = "search-details.html";
    });

    // temporary navigation event listeners
    $('.js-searchButton').on('click', function (event) {
        event.preventDefault();
        window.location.href = "search-overview.html";
    });
    $('.js-signupButton').on('click', function (event) {
        event.preventDefault();
        window.location.href = "signup.html";
    });
    $('.js-redirectToIndex').on('click', function (event) {
        event.preventDefault();
        window.location.href = "index-loggedin.html";
    });
    $('.js-savedCards').on('click', function (event) {
        event.preventDefault();
        window.location.href = "saved-cards.html";
    });
});
