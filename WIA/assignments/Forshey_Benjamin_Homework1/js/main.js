/*jshint
    browser: true,
    devel: true*/

/*
     Name: Ben Forshey
     Date: 20141129
     Class & Section:  WIA-01
     Comments: "HTML5 Canvas Drawing"
 */

/*******************************************
HTML5 Shape Drawing Activity
    1.  Setup the canvas and 2d context
    2.  Draw out each shape in the sections below

********************************************/

/*******************************************
FILE SETUP

// Setup up 7 different Canvases in index.html one for each problem.
//Link Modernizr.js
// Link the main.js file
// Setup the call to that canvas and get it's 2d context
//Use Modernizr to verify that your browser supports canvas, include a fallback message
********************************************/

//canvas polyfill
Modernizr.load({
  test: Modernizr.canvas,
  nope: 'components/canvas-5-polyfill/canvas.js'
});

window.onload = function () {
//    setting canvas and context for all seven canvases
    var canvasOne = document.getElementById('canvas-one'),
    ctx1 = canvasOne.getContext('2d'),
    canvasTwo = document.getElementById('canvas-two'),
    ctx2 = canvasTwo.getContext('2d'),
    canvasThree = document.getElementById('canvas-three'),
    ctx3 = canvasThree.getContext('2d'),
    canvasFour = document.getElementById('canvas-four'),
    ctx4 = canvasFour.getContext('2d'),
    canvasFive = document.getElementById('canvas-five'),
    ctx5 = canvasFive.getContext('2d'),
    canvasSix = document.getElementById('canvas-six'),
    ctx6 = canvasSix.getContext('2d'),
    canvasSeven = document.getElementById('canvas-seven'),
    ctx7 = canvasSeven.getContext('2d');
/*******************************************
PART 1

Draw a rectangle starting at point (0 ,0)
That has a width of 50 px and a height of 100px
Set the color of the rectangle to a shade of blue.
Set the stroke color to black and the dimension of the stroke are the same as the rectangle.

Reminder - set the style first then draw.
********************************************/

//Draw Rectangle here
    ctx1.fillStyle = '#29447F';
    ctx1.lineWidth = 5; //since the starting point for my rectangles is 0, 0, part of the stroke is clipped
    ctx1.strokeStyle = '#000';
    ctx1.fillRect(0, 0, 50, 100);
    ctx1.strokeRect(0, 0, 50, 100);


/*******************************************
PART 2

Draw a circle starting at point (50 ,50)
That has a radius of 20 px
Set the color of the circle to a shade of red and set the alpha to .5
Set the stroke color to black and use a radius of 30px for this circle.

Reminder - set the style first then draw.
Use the arc method
********************************************/


//Draw Circle here

//    Not sure if the instructions are telling me to draw two circles, or if the 20px / 30px radius is a type-o.
//    I drew both possibilities, just to cover my bases.

//    first possibility
    ctx2.fillStyle = 'rgba(255, 80, 58, .5)';
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = '#000';

    ctx2.beginPath();
    ctx2.arc(50, 50, 20, 0, 2 * Math.PI, false);
    ctx2.fill();
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(50, 50, 30, 0, 2 * Math.PI, false);
    ctx2.fill();
    ctx2.stroke();

//    second possiblity
    ctx2.beginPath();
    ctx2.arc(50, 120, 30, 0, 2 * Math.PI, false);
    ctx2.fill();
    ctx2.stroke();



/*******************************************
PART 3

Practice using Path drawing.
Create a 5-point star shaped pattern using the lineTo method.
Begin this shape at (100, 100)

Height and width and color are up to you.

********************************************/

//Draw Star here
    ctx3.fillStyle = '#CFA82F';
    ctx3.lineWidth = 5;
    ctx3.strokeStyle = '#221F1C';

    ctx3.beginPath();
    ctx3.moveTo(100, 100);
//    half of left
    ctx3.lineTo(160, 85);
//    top
    ctx3.lineTo(175, 25);
    ctx3.lineTo(190, 85);
//    right
    ctx3.lineTo(250, 100);
    ctx3.lineTo(200, 115);
//    bottom-right
    ctx3.lineTo(215, 170);
    ctx3.lineTo(175, 125);
//    bottom-left
    ctx3.lineTo(140, 170);
    ctx3.lineTo(150, 115);
//    half of left
    ctx3.closePath();
    ctx3.fill();
    ctx3.stroke();

/*******************************************
PART 4

Practice drawing with Bezier curves.
Try drawing the top to an umbrella.
This should have one large arc (a half circle) on the top and scalloped edges on the bottom.

Position, height, width and color are your choice.
Do not overlap any other object.

********************************************/

//Draw Umbrella top here
    ctx4.strokeStyle = '#3f3f3f';
    ctx4.lineWidth = 2;

    ctx4.beginPath();
    ctx4.moveTo(100, 150);
    ctx4.bezierCurveTo(125, 75, 275, 75, 300, 150);
    ctx4.stroke();

    ctx4.beginPath();
    ctx4.moveTo(100, 150);
    ctx4.bezierCurveTo(105, 140, 145, 140, 150, 150);
    ctx4.stroke();

    ctx4.beginPath();
    ctx4.moveTo(150, 150);
    ctx4.bezierCurveTo(155, 140, 195, 140, 200, 150);
    ctx4.stroke();

    ctx4.beginPath();
    ctx4.moveTo(200, 150);
    ctx4.bezierCurveTo(205, 140, 245, 140, 250, 150);
    ctx4.stroke();

    ctx4.beginPath();
    ctx4.moveTo(250, 150);
    ctx4.bezierCurveTo(255, 140, 295, 140, 300, 150);
    ctx4.stroke();




/*******************************************
PART 5

Practice using text.
Draw text into your canvas.  It can said whatever you would like in any color.

********************************************/

//Draw text here
    ctx5.font = '2em Verdana';
    ctx5.fillStyle = '#221F1C';
    ctx5.strokeStyle = 'rgba(0, 0, 0, .5)';
    ctx5.fillText("Forshey_Benjamin_Homework1", 40, 205);
    ctx5.strokeText("Forshey_Benjamin_Homework1", 41, 206);


/*******************************************
PART 6

Pixel manipulation.
Draw the image logo.png into the canvas in the following 3 ways.
1. The image exactly as it is.
2. Shrink the image by 50%
3. Slice a section of the logo out and draw that onto the canvas.

Reminder to use the drawImage method for all 3 of the ways.

********************************************/

//Draw images here
    var image = document.querySelector('.logo--main');
    ctx6.drawImage(image, 0, 0);
    ctx6.drawImage(image, 0, 1200, 1650, 544);
    ctx6.drawImage(image, 1250, 580, 130, 130, 0, 1800, 250, 250);


/*******************************************
PART 7

Putting it all together.

Using a combination of all the methods.
Create a complex scene.
You must use at least 3 different methods.

********************************************/

// Draw scene here
    ctx7.fillStyle = '#00f';
    ctx7.strokeStyle = '#221F1C';
    ctx7.font = '2.5em Verdana';
    ctx7.lineWidth = 2;

    ctx7.fillText('Winter in Seattle', 120, 50);

    ctx7.beginPath();
    ctx7.moveTo(100, 170);
    ctx7.bezierCurveTo(125, 75, 275, 75, 300, 170);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(100, 170);
    ctx7.bezierCurveTo(105, 155, 145, 155, 150, 170);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(150, 170);
    ctx7.bezierCurveTo(155, 155, 195, 155, 200, 170);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(200, 170);
    ctx7.bezierCurveTo(205, 155, 245, 155, 250, 170);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(250, 170);
    ctx7.bezierCurveTo(255, 155, 295, 155, 300, 170);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(400, 100);
    ctx7.bezierCurveTo(350, 120, 400, 125, 400, 100);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(400 +25, 100 +25);
    ctx7.bezierCurveTo(350 +25, 120 +25, 400 +25, 125 +25, 400 +25, 100 +25);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(400 +37, 100 +37);
    ctx7.bezierCurveTo(350 +37, 120 +37, 400 +37, 125 +37, 400 +37, 100 +37);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(400 +-20, 100 +-20);
    ctx7.bezierCurveTo(350 +-20, 120 +-20, 400 +-20, 125 +-20, 400 +-20, 100 +-20);
    ctx7.stroke();

    ctx7.beginPath();
    ctx7.moveTo(200, 260);
    ctx7.lineTo(200, 167);
    ctx7.stroke();

    ctx7.drawImage(image, 1250, 580, 130, 130, 142, 191, 50, 50);
    ctx7.drawImage(image, 1250, 580, 130, 130, 131, 235, 75, 75);
    ctx7.drawImage(image, 1250, 580, 130, 130, 120, 300, 100, 100);

}; //end window.onload()
