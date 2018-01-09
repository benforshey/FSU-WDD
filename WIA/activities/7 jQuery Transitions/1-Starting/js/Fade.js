$(function() {
    $('#fadeout').on('click', function () {
        $('#theDiv').fadeOut(500);
    });
    $('#fadein').on('click', function () {
        $('#theDiv').fadeIn(500);
    });
    $('#fadeto3').on('click', function () {
        $('#theDiv').fadeTo(500, .3);
    });
    $('#fadeup').on('click', function () {
        $('#theDiv').fadeTo(500, 1);
    });



});
