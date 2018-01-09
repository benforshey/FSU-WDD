/*jshint
    browser: true,
    devel: true*/
var audio;

window.onload = function () {
    audio = document.getElementById('audio');

};

function clicked () {
    audio.currentTime += 1;
}
