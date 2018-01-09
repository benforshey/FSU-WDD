window.onload = function() {
//    setup canvas, stage, and shape
    var canvas= document.getElementById("canvas1");
    var stage = new createjs.Stage(canvas);
    var shape = new createjs.Shape();





//    add to stage and update
    stage.addChild(shape);
    stage.update();
};
