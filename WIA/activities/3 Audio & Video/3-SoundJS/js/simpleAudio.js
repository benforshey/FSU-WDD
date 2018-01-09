/*jshint
    browser: true,
    devel: true*/
var handleFileLoad = function (event) {
    console.log('handleFileLoad has fired; createjs.Sound has preloaded:', event.src);

    var source = event.src;
    playMusic(source);
};

var playMusic = function (source) {
    console.log(source);
    var playButton = document.getElementById('play-button');
    playButton.addEventListener('click', function () {
        createjs.Sound.play(source);
    });

};

window.onload = function() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
        console.log('Createjs.Sound did not initialize.');
        return;
    } else {
        console.log('Createjs.Sound has initialized.');
    }

    createjs.Sound.registerSound({
        id: 'soundId',
        src: 'audio/music.mp3|audio/music.ogg'
    });

    createjs.Sound.addEventListener('fileload', handleFileLoad);





}
