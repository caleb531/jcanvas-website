---
title: Clear Canvas
slug: docs/clearCanvas
sidebar:
  order: 1
---

This `clearCanvas()` clears all or any part of the canvas.

### A note about layers

This method is _not_ meant to be used if you are using the jCanvas Layer API, because the API handles redrawing for you in many cases, and so if you try to clear the canvas. you layers will eventually be redrawn by jCanvas when it deems necessary.

If you want to hide a layer temporarily, use `setLayer()` to set the layer's `visible` property, then call `drawLayers()`:

```js
$('canvas')
  .setLayer('myLayerName', {
    visible: false // set to true instead to show the layer again
  })
  .drawLayers();
```

If you want to remove a layer permanently, call `removeLayer()` followed by `drawLayers()`:

```js
$('canvas').removeLayer('myLayerName').drawLayers();
```

### Clear entire canvas

If nothing is passed, the entire canvas is cleared.

```js
$('canvas').clearCanvas();
```

## Clear a section

Clearing a section works in the same way as [drawing a rectangle](/docs/rectangles/), with the rectangle being drawn from its center (by default).

```js
$('canvas')
  .drawEllipse({
    fillStyle: '#000',
    x: 200, y: 100,
    width: 200, height: 100
  })
  .clearCanvas({
    x: 200, y: 100,
    width: 50, height: 50
  });
```
