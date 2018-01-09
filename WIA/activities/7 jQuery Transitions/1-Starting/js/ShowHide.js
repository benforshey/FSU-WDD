$(function() {
    $('#hide').on('click', function (event) {
        event.preventDefault();
        $('#theDiv').hide(1000, function () {
            $('#theDiv').css('background-color', 'red');
        });
    });
    $('#show').on('click', function (event) {
        event.preventDefault();
        $('#theDiv').show(1000);
    });
    $('#toggle').on('click', function (event) {
        event.preventDefault();
        $('#theDiv').toggle(1000);
    });
});


