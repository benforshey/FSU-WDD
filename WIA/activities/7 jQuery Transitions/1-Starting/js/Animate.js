$(function() {

    $('#right').on('click', function () {
        $('#theDiv').animate({
            width: '500px'
        }, 1000);
    });
    $('#text').on('click', function () {
        $('#theDiv').animate({
            'font-size': '1.5em' //or fontSize: '1.5em'
        }, 1000);
    });
    $('#move').on('click', function () {
        $('#theDiv').animate({
            left: '500'
        }, 1000, 'swing');
    });
    $('#multiple').on('click', function () {

//        $('#theDiv').animate({
//            height: '500px',
//            width: '500px',
//            left: '500px',
//            'font-size': '1.5em'
//        }, 1000, 'swing');

        $('#theDiv').animate({
            height: '500px'
        }, 1000, 'swing');
        $('#theDiv').animate({
            width: '500px'
        }, 1000, 'swing');
        $('#theDiv').animate({
            left: '500px' // or just left: '500'
        }, 1000, 'swing');
        $('#theDiv').animate({
            'font-size': '1.5em'
        }, 1000, 'swing');
    });

    $('#reset').on('click', function () {
        $('#theDiv').animate({
            height: '180px',
            width: '250px',
            left: '0',
            'font-size': '1em'
        }, 1000, 'swing');
    });

});
