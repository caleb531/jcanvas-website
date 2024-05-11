---
title: Drawing layers
slug: docs/drawLayers
sidebar:
  order: 4
---

The `drawLayers()` method clears the canvas, and draws the canvas's layers.

```js
$('canvas').drawLayers();
```

As of v20.2.0, You can also specify a `complete` callback to run when all layers have been drawn. This can be useful if you have any image layers because jCanvas would normally wait for those images to load asynchronously before continuing to draw other layers.

```js
$('canvas').drawLayers({
  complete: function () {
    console.log('done!');
  }
});
```
