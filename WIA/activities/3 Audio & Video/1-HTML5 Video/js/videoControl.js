/*jshint
    browser: true,
    devel: true*/

//var to hold my video
var video;

window.onload = function () {
    video = document.getElementById('vid');
};

function pauseToggle () {
    if (video.paused) {
        video.play();
    } else if (video.play) {
        video.pause();
    } else {
        console.log('Function pauseToggle throwing neither paused() nor play().');
    }
}
function clicked () {
    video.currentTime += 2;
}
