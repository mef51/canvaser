/**
* canvaser.js - Canvas helper library meant to be used with jQuery.
* ===================================================
*/

/** a function meant to help with the 'initial' code for using a canvas.
* given an 'id', will return an object with:
* canvas : the jQuery canvas object.
* context : the 2D rendering context of the canvas
* width : width of the canvas
* height : height of the canvas
* and a bunch of API functions that wrap around the standard HTML5 Canvas API
*
* use like this:
* var Canvas = getCanvas("myCanvas");
*/
function getCanvas(id) {
    var c = $("#" + id);
    return {
        canvas: c,
        context: c[0].getContext("2d"),
        width: c.width(),
        height: c.height(),

        /**
        * Sets the size of the canvas element.
        */
        setCanvasSize: function(width, height) {
            this.canvas[0].width = width;
            this.canvas[0].height = height;
            this.width = this.canvas.width();
            this.height = this.canvas.height();
            return "ok";
        },

        /**
        * Fills a string at x, and y.
        * Use setStyle to set the font beforehand
        * Font size is set with the context.font property.
        */
        fillString: function(string, x, y) {
            this.context.fillText(string, x, y);
        },

        /**
        * Fills a string at x, and y, with styles defined by the object "options".
        * options is an object that is passed to setStyle()
        * Font size is set with the context.font property.
        */
        fillStyledString: function(string, x, y, options) {
            this.setStyle(options);
            this.fillString(string, x, y);
        },

        /**
        * Strokes a string at x, and y.
        * Use setStyle to set the font beforehand
        * Font size is set with the context.font property.
        */
        strokeString: function(string, x, y) {
            this.context.strokeText(string, x, y);
        },

        /**
        * Strokes a string at x, and y, with styles defined by the object "options".
        * options is an object that is passed to setStyle()
        * Font size is set with the context.font property.
        */
        strokeStyledString: function(string, x, y, options) {
            this.setStyle(options);
            this.strokeString(string, x, y);
        },

        /**
        * Draw a line from (xf, yf) to (xt, yt)
        */
        drawLine: function(xf, yf, xt, yt) {
            this.context.beginPath();
            this.context.moveTo(xf, yf);
            this.context.lineTo(xt, yt);
            this.context.stroke();
        },

        drawArc: function(xOrigin, yOrigin, radius, startAngle, endAngle, isAntiClockwise) {
            this.context.beginPath();
            this.context.arc(xOrigin, yOrigin, radius, startAngle, endAngle, isAntiClockwise);
            this.context.stroke();
        },

        /**
        * Each parameter is an object of the form {x:number, y:number}
        */
        drawQuadratic: function(FromPoint, ToPoint, AnchorPoint) {
            this.context.beginPath();
            this.context.moveTo(FromPoint.x, FromPoint.y);
            this.context.quadraticCurveTo(AnchorPoint.x, AnchorPoint.y, ToPoint.x, ToPoint.y);
            this.context.stroke();
        },

        drawBezierCurve: function(FromPoint, ToPoint, AnchorPoint1, AnchorPoint2) {
            this.context.beginPath();
            this.context.moveTo(FromPoint.x, FromPoint.y);
            this.context.bezierCurveTo(AnchorPoint1.x, AnchorPoint1.y, AnchorPoint2.x, AnchorPoint2.y, ToPoint.x, ToPoint.y);
            this.context.stroke();
        },

        /**
        * Draws a background of color 'color' and draws a border of 'strokeColor' around the whole canvas
        * color is a string
        * strokeColor is a string, is the color of the border
        */
        drawBackground: function(color, strokeColor) {
            // the background and border of the canvas.
            this.drawRect(color, strokeColor, {x:0, y:0}, this.width, this.height);
        },

        /**
        * Use this for tile-based graphics. It restreches the pixel grid.
        * Draws a cell at cell.x and cell.y of color 'color' and strokes it with 'strokeColor'
        * and of width 'cellWidth' and height 'cellHeight' in the rendering context of 'this.context'. whew.
        */
        drawCell: function(color, strokeColor, cell, cellWidth, cellHeight) {
            this.context.fillStyle = color;
            this.context.fillRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
            this.context.strokeStyle = strokeColor;
            this.context.strokeRect(cell.x * cellWidth, cell.y * cellHeight, cellWidth, cellHeight);
        },

        /**
        * Draws a rectangle at position.x and position.y.
        * Fills it with color 'color'.
        * Draws a border with a color of 'strokeColor'.
        * The rectangle is 'width' wide and 'height' high.
        */
        drawRect: function(color, strokeColor, position, width, height) {
            this.context.fillStyle = color;
            this.context.fillRect(position.x, position.y, width, height);
            this.context.strokeStyle = strokeColor;
            this.context.strokeRect(position.x, position.y, width, height);
        },

        /**
        * Convenience method for setting the style of the
        * Canvas's context with an options object.
        * Create an object 'options' that holds all the styling you want
        * and then pass it as a parameter to setStyle(). setStyle
        * will set all the options within the object.
        * The actual options should be the standard options
        * of the HTML5 context object returned by canvas.getContext("2d")
        */
        setStyle: function(options) {
            if(typeof options.lineWidth == "number")
                this.context.lineWidth = options.lineWidth;
            if(typeof options.strokeStyle == "string")
                this.context.strokeStyle = options.strokeStyle;
            if(typeof options.lineCap == "string")
                this.context.lineCap = options.lineCap;
            if(typeof options.lineJoin == "string")
                this.context.lineJoin = options.lineJoin;
            if(typeof options.fillStyle == "string")
                this.context.fillStyle = options.fillStyle;
            if(typeof options.textBaseline == "string")
                this.context.textBaseline = options.textBaseline;
            if(typeof options.font == "string")
                this.context.font = options.font;
        }
    };
} // end 