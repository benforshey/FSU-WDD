window.onload = function() {
    var canvas = document.getElementById("canvas1");
    var stage = new createjs.Stage(canvas);

//    create shape
    var rect1 = new createjs.Shape();

//    create fill
//    rect1.graphics.beginFill('purple');
//    rect1.graphics.beginFill('rgb(162, 216, 255');
//    rect1.graphics.beginFill(createjs.Graphics.getRGB(162, 216, 255, .3)); //also has .getHSL

//    linear gradient
//    rect1.graphics.beginLinearGradientFill(['yellow', 'purple', 'red'], [0, .5, 1], 50, 50, 150, 150);

//    radial gradient
    rect1.graphics.beginRadialGradientFill(['yellow', 'red'], [0, 1], 100, 100, 0, 100, 100, 100);
//    draw rectangle
    rect1.graphics.rect(50, 50, 100, 100);

//    add to stage
    stage.addChild(rect1);

//    update stage
    stage.update();



};
