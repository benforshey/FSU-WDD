/*jshint
    browser: true,
    devel: true*/

var handleFileLoad = function (event) {
//    createjs.Sound.play(event.src);
};

var playMusic = function () {
    createjs.Sound.play('music');
};

var playThunder = function () {
    createjs.Sound.play('thunder');
};

window.onload = function() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
        console.log('createjs.Sound was not initialized.');
        return;
    } else {
        console.log('createjs.Sound was initialized.');
    }

    var audioPath = 'audio/',
        manifest = [
            {
                id: 'music',
                src: audioPath + 'music.mp3|' + audioPath + 'music/ogg'
            },
            {
                id: 'thunder',
                src: audioPath + 'thunder1.mp3|' + audioPath + 'Thunder1.ogg'
            }
        ];

    createjs.Sound.registerManifest(manifest);

    createjs.Sound.addEventListener('fileload', function (event) {
        handleFileLoad(event);
    });


};
