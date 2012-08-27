canvaser
========

A small helper library to help with writing stuff for an HTML Canvas
Clone the repo into your js folder and then drop it into your HTML file with
`<script type="text/javascript" src="js/canvaser/canvaser.js"></script>`

usage
=====

Your entry point is the getCanvas() function. It returns an object that represents your canvas.
Pass it your canvas's id.

```javascript
var Canvas = getCanvas("myCanvas");
Canvas.setCanvasSize(500, 500);
Canvas.drawBackground("blue", "black");
```
motivation
==========

I don't want to have to write:

```javascript
var canvas = $("#mycanvasid");
var ctx = canvas[0].getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 50, 100);
ctx.strokeStyle = "black";
ctx.strokeRect(10, 10, 50, 100);
```
just to draw a rectangle with a border.

But this:

```javascript
var Canvas = getCanvas("mycanvasid");
canvas.drawRect("blue", "black", {x: 10, y: 10}, 50, 100);
```
makes me happier
