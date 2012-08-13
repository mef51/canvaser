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

// draw a line from (xf, yf) to (xt, yt)
function drawLine(xf, yf, xt, yt, context) {
    context.beginPath();
    context.moveTo(xf, yf);
    context.lineTo(xt, yt);
    context.stroke();
}

function drawArc(xOrigin, yOrigin, radius, sAngle, eAngle, isAntiClockwise, context) {
    context.beginPath();
    context.arc(xOrigin, yOrigin, radius, sAngle, eAngle, isAntiClockwise);
    context.stroke();
}

function drawQuadratic(FromPoint, ToPoint, AnchorPoint, context) {
    context.beginPath();
    context.moveTo(FromPoint.x, FromPoint.y);
    context.quadraticCurveTo(AnchorPoint.x, AnchorPoint.y, ToPoint.x, ToPoint.y);
    context.stroke();
}

function drawBezierCurve(FromPoint, ToPoint, Anchor1Point, Anchor2Point, context) {
    context.beginPath();
    context.moveTo(FromPoint.x, FromPoint.y);
    context.bezierCurveTo(Anchor1Point.x, Anchor1Point.y, Anchor2Point.x, Anchor2Point.y, ToPoint.x, ToPoint.y);
    context.stroke();
}

/**
* Draws a background of color 'color' and strokes it black.
* color is a string
* width is a number
* height is a number
* context is the canvas rendering context
*/
function drawBackground(color, width, height, context) {
    // the background and border of the canvas.
    drawCell(color, "black", {x:0, y:0}, width, height, context);
}

/**
* Draws a cell at cell.x and cell.y of color 'color' and strokes it with 'strokeColor'
* and of width 'cellWidth' and height 'cellHeight' in the rendering context 'context'. whew.
*/
function drawCell(color, strokeColor, cell, cellWidth, cellHeight, context) {
    context.fillStyle = color;
    context.fillRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
    context.strokeStyle = strokeColor;
    context.strokeRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
}

function setStyle(options, context) {
    if(typeof options.lineWidth == "number")
        context.lineWidth = options.lineWidth;
    if(typeof options.strokeStyle == "string")
        context.strokeStyle = options.strokeStyle;
    if(typeof options.lineCap == "string")
        context.lineCap = options.lineCap;
    if(typeof options.lineJoin == "string")
        context.lineJoin = options.lineJoin;
    if(typeof options.fillStyle == "string")
        context.fillStyle = options.fillStyle;
}

