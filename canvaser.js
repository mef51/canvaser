// Canvas helper library meant to be used with jQuery.

/** a function meant to help with the 'initial' code for using a canvas.
* given an 'id', will return an object with:
* canvas : the jQuery canvas object.
* context : the 2D rendering context of the canvas
* width : width of the canvas
* height : height of the canvas
*
* use like this:
* var Canvas = getCanvas("myCanvas");
*/
function getCanvas(id) {
    return {
        canvas : $("#" + id),
        context : canvas[0].getContext("2d"),
        width : canvas.width(),
        height : canvas.height()
    };
}

/** 
* Sets the size of the canvas element.
* Canvas is an object like the one returned by getCanvas()
*/
function setCanvasSize(width, height, Canvas) {
    Canvas.canvas[0].width = width;
    Canvas.canvas[0].height = height;
    Canvas.width = Canvas.canvas.width();
    Canvas.height = Canvas.canvas.height();
}

/**
* Draw a line from (xf, yf) to (xt, yt)
* Uses the context from Canvas.context
*/
function drawLine(xf, yf, xt, yt, Canvas) {
    Canvas.context.beginPath();
    Canvas.context.moveTo(xf, yf);
    Canvas.context.lineTo(xt, yt);
    Canvas.context.stroke();
}

function drawArc(xOrigin, yOrigin, radius, sAngle, eAngle, isAntiClockwise, Canvas) {
    Canvas.context.beginPath();
    Canvas.context.arc(xOrigin, yOrigin, radius, sAngle, eAngle, isAntiClockwise);
    Canvas.context.stroke();
}

function drawQuadratic(FromPoint, ToPoint, AnchorPoint, Canvas) {
    Canvas.context.beginPath();
    Canvas.context.moveTo(FromPoint.x, FromPoint.y);
    Canvas.context.quadraticCurveTo(AnchorPoint.x, AnchorPoint.y, ToPoint.x, ToPoint.y);
    Canvas.context.stroke();
}

function drawBezierCurve(FromPoint, ToPoint, AnchorPoint1, AnchorPoint2, Canvas) {
    Canvas.context.beginPath();
    Canvas.context.moveTo(FromPoint.x, FromPoint.y);
    Canvas.context.bezierCurveTo(AnchorPoint1.x, AnchorPoint1.y, AnchorPoint2.x, AnchorPoint2.y, ToPoint.x, ToPoint.y);
    Canvas.context.stroke();
}

/**
* Draws a background of color 'color' and strokes it black.
* color is a string
* width is a number
* height is a number
* Canvas is the canvas you want to draw on, it's context will be used.
*/
function drawBackground(color, width, height, Canvas) {
    // the background and border of the canvas.
    drawCell(color, "black", {x:0, y:0}, width, height, Canvas.context);
}

/**
* Draws a cell at cell.x and cell.y of color 'color' and strokes it with 'strokeColor'
* and of width 'cellWidth' and height 'cellHeight' in the rendering context of 'Canvas.context'. whew.
*/
function drawCell(color, strokeColor, cell, cellWidth, cellHeight, Canvas) {
    Canvas.context.fillStyle = color;
    Canvas.context.fillRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
    Canvas.context.strokeStyle = strokeColor;
    Canvas.context.strokeRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
}

function setStyle(options, Canvas) {
    if(typeof options.lineWidth == "number")
        Canvas.context.lineWidth = options.lineWidth;
    if(typeof options.strokeStyle == "string")
        Canvas.context.strokeStyle = options.strokeStyle;
    if(typeof options.lineCap == "string")
        Canvas.context.lineCap = options.lineCap;
    if(typeof options.lineJoin == "string")
        Canvas.context.lineJoin = options.lineJoin;
    if(typeof options.fillStyle == "string")
        Canvas.context.fillStyle = options.fillStyle;
}

