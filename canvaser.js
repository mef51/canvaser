/**
* canvaser.js - Canvas helper library meant to be used with jQuery.
* ===================================================
* As a convention, the library uses the Canvas object defined by getCanvas().
* As another convention, Canvas is the last parameter to most functions
* in the library.
*/

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
    var c = $("#" + id);
    return {
        canvas : c,
        context : c[0].getContext("2d"),
        width : c.width(),
        height : c.height()
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
    return "ok";
}

/**
* Fills a string at x, and y.
* Use setStyle to set the font beforehand
* Font size is set with the context.font property.
*/
function fillString(string, x, y, Canvas) {
    Canvas.context.fillText(string, x, y);
}

/**
* Fills a string at x, and y, with styles defined by the object "options".
* options is an object that is passed to setStyle()
* Font size is set with the context.font property.
*/
function fillStyledString (string, x, y, options, Canvas) {
    setStyle(options);
    fillString(string, x, y, Canvas);
}

/**
* Strokes a string at x, and y.
* Use setStyle to set the font beforehand
* Font size is set with the context.font property.
*/
function strokeString(string, x, y, Canvas) {
    Canvas.context.strokeText(string, x, y);
}

/**
* Fills a string at x, and y, with styles defined by the object "options".
* options is an object that is passed to setStyle()
* Font size is set with the context.font property.
*/
function strokeStyledString (string, x, y, options, Canvas) {
    setStyle(options);
    strokeString(string, x, y, Canvas);
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
* Draws a background of color 'color' and draws a border of 'strokeColor'
* color is a string
* strokeColor is a string, is the color of the border
* width is a number
* height is a number
* Canvas is the canvas you want to draw on, it's context will be used.
*/
function drawBackground(color, strokeColor, width, height, Canvas) {
    // the background and border of the canvas.
    drawCell(color, strokeColor, {x:0, y:0}, width, height, Canvas);
}

/**
* Use this for tile-based graphics. It restreches the pixel grid.
* Draws a cell at cell.x and cell.y of color 'color' and strokes it with 'strokeColor'
* and of width 'cellWidth' and height 'cellHeight' in the rendering context of 'Canvas.context'. whew.
*/
function drawCell(color, strokeColor, cell, cellWidth, cellHeight, Canvas) {
    Canvas.context.fillStyle = color;
    Canvas.context.fillRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
    Canvas.context.strokeStyle = strokeColor;
    Canvas.context.strokeRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
}

/**
* Draws a rectangle at position.x and position.y.
* Fills it with color 'color'.
* Draws a border with a color of 'strokeColor'.
* The rectangle is 'width' wide and 'height' high.
* The rectangle is drawn on the rendering context of 'Canvas'.
*/
function drawRect(color, strokeColor, position, width, height, Canvas) {
    Canvas.context.fillStyle = color;
    Canvas.context.fillRect(position.x, position.y, width, height);
    Canvas.context.strokeStyle = strokeColor;
    Canvas.context.strokeRect(position.x, position.y, width, height);
}

/**
* Convenience method for setting the style of the
* Canvas's context with an options object.
* Create an object 'options' that holds all the styling you want
* and then pass it as a parameter to setStyle(). setStyle
* will set all the options within the object.
* The actual options should be the standard options
* of the HTML5 context object returned by canvas.getContext("2d")
*/
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
    if(typeof options.textBaseline == "string")
        Canvas.context.textBaseline = options.textBaseline;
    if(typeof options.font == "string")
        Canvas.context.font = options.font;
}

