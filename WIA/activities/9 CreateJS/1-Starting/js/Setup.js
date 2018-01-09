/*jshint
    browser: true,
    devel: true*/
window.onload = function() {
//    create stage
    var canvas = document.querySelector('#canvas1'),
        stage = new createjs.Stage(canvas),
        circleGraphic = new createjs.Graphics();

    circleGraphic.beginFill('blue');
    circleGraphic.drawCircle(0, 0, 50);


//    shapes handle vector graphics
    var circleShape = new createjs.Shape(circleGraphic);

//    access shape properties (compare with original of 0, 0 in Graphic method)
    circleShape.x = 50;
    circleShape.y = 50;

//    add shape to stage's display list
    stage.addChild(circleShape);

//    show on screen
    stage.update();


};
