window.onload = function() {
//    setup canvas, stage, and shape
    var canvas= document.getElementById("canvas1");
    var stage = new createjs.Stage(canvas);
    var shape = new createjs.Shape();

//    stroke
    shape.graphics.beginStroke('purple');
    shape.graphics.setStrokeStyle(10, 'butt', 'round');

//    normal rectangle
    shape.graphics.rect(50, 50, 300, 300);

//    rounded rectangle
    shape.graphics.beginStroke('blue');
    shape.graphics.drawRoundRect(75, 75, 250, 250, 50);

//    complex rounded rectangle
    shape.graphics.beginStroke('orange');
    shape.graphics.drawRoundRectComplex(100, 100, 200, 200, 50, 0, 50, 0);

//    add to stage and update
    stage.addChild(shape);
    stage.update();
};
