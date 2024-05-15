---
title: Introduction
slug: docs
sidebar:
  order: 1
---

The `<canvas>` element is a new element apart of HTML5. It allows you to draw shapes, paths, images, and other drawings on a blank element called the canvas.

## Creating a canvas

Before you can draw on the canvas, you need to create one.

```html
<canvas width="300" height="150"></canvas>
```

Of course, the canvas can be any width/height you want. You may also wish to give the canvas an ID (for future reference).

### Note: Setting width and height properly

As a side note, you cannot accurately set a canvas's width and height via CSS; you can only do so through the canvas element's `width` and `height` attributes. This is best achieved through jQuery's `prop()` method.

```js
// BAD (will stretch and distort the canvas)
$('#myCanvas').css({ width: 800, height: 500 });
// GOOD (correct way)
$('#myCanvas').prop({ width: 800, height: 500 });
```

## Importing jCanvas

You also need to add jCanvas to your page somehow (usually a `<script>` element will do).

```html
<script src="jcanvas.min.js"></script>
```

If your application is bundled or uses ES Modules (ESM), you can import jCanvas like so (remember to `npm install jcanvas` first!):

```js
import $ from 'jquery';
import 'jcanvas';
```

## Drawing

HTML5 provides [a native JavaScript API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) for drawing on the canvas. However, we will be using jCanvas instead.

Using jCanvas requires basic knowledge of [using jQuery](http://docs.jquery.com/Tutorials:How_jQuery_Works).

## [Learn the jCanvas syntax](/jcanvas/docs/syntax/)
