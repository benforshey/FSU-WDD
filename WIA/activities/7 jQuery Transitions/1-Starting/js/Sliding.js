$(function() {
    $('#slidedown').on('click', function () {
        $('#theDiv').slideDown(500);
    });
    $('#slideup').on('click', function () {
        $('#theDiv').slideUp(500);
    });
    $('#toggle').on('click', function () {
        $('#theDiv').slideToggle(500);
    });



});
