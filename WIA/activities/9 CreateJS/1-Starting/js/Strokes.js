window.onload = function() {
//    setup canvas and stage
    var canvas = document.getElementById('canvas1');
    var stage = new createjs.Stage(canvas);

//    setup shape
    var shape = new createjs.Shape();

//    setup stroke and properties
    shape.graphics.beginStroke('purple');
    shape.graphics.setStrokeStyle(10, 'round', 'round');


//    draw a line
    shape.graphics.moveTo(25, 25);
    shape.graphics.lineTo(250, 25);
    shape.graphics.moveTo(50, 50);
//    shape.graphics.quadraticCurveTo(50, 175, 250, 250);
//    shape.graphics.lineTo(50, 250);
//    shape.graphics.arcTo(100, 50, 100, 500, 60);
    shape.graphics.bezierCurveTo(100, 50, 100, 200, 250, 250);

//    add and update
    stage.addChild(shape);
    stage.update();




};
