---
title: Masking
slug: docs/masking
---

## Basic Masking

To create a shape that masks other shapes, set the `mask` property to `true`.

```js
// This shape is a mask
$('canvas')
  .drawArc({
    fillStyle: '#36b',
    x: 150, y: 150,
    radius: 50,
    mask: true
  })
  // This shape is being masked
  .drawRect({
    fillStyle: '#6c1',
    x: 100, y: 120,
    width: 100, height: 100
  })
  // Restore mask
  .restoreCanvas();
```

To restore the mask and prevent masking of future shapes, call the `restoreCanvas()` method.

## Layer masks

You can also create layers that mask other layers by using the `mask` property. A layer that is a mask is generally referred to as a 'layer mask'.

```js
// This layer is a mask
$('canvas')
  .drawArc({
    layer: true,
    fillStyle: '#36b',
    x: 150, y: 150,
    radius: 50,
    mask: true
  })
  // This layer is being masked
  .drawRect({
    layer: true,
    fillStyle: '#6c1',
    x: 100, y: 120,
    width: 100, height: 100
  })
  // Restore layer mask
  .restoreCanvas({
    layer: true
  });
```

However, when creating layer masks, the `restoreCanvas()` method must be made into a layer using the `layer` property, as demonstrated above.

### Masking draggable layers

In this example, move the shapes to see how layer masks affects the draggability of other shapes.

```js
// Draw blue square
$('canvas')
  .drawRect({
    layer: true,
    draggable: true,
    mask: true,
    name: 'blue',
    fillStyle: '#36c',
    x: 150, y: 150,
    width: 150, height: 150
  })
  // Draw orange rectangle
  .drawRect({
    layer: true,
    draggable: true,
    name: 'orange',
    fillStyle: '#f63',
    x: 80, y: 120,
    width: 80, height: 30
  })
  // Restore blue mask
  .restoreCanvas({
    layer: true
  })
  // Draw green circle
  .drawArc({
    layer: true,
    mask: true,
    draggable: true,
    name: 'green',
    fillStyle: '#6c1',
    x: 200, y: 200,
    radius: 50
  })
  // Draw red rectangle
  .drawRect({
    layer: true,
    draggable: true,
    name: 'red',
    fillStyle: '#c33',
    x: 180, y: 180,
    width: 50, height: 30
  })
  // Restore green mask
  .restoreCanvas({
    layer: true
  });
```

## Using an SVG path as a mask

You can also use an SVG path as a mask using the [`drawPath()`](/jcanvas/docs/paths/) method's SVG path support.

```js
$('canvas')
  .drawPath({
    layer: true,
    mask: true,
    strokeStyle: '#000',
    strokeWidth: 2,
    d: 'm46 71c-12.2 0-22-9.8-22-22 0-12.2 9.8-22 22-22 12.2 0 22 9.8 22 22 0 12.2-9.8 22-22 22z m103.5 159c-20.2 0-36.5-16.3-36.5-36.5 0-20.2 16.3-36.5 36.5-36.5 20.2 0 36.5 16.3 36.5 36.5 0 20.2-16.3 36.5-36.5 36.5z'
  })
  .drawRect({
    layer: true,
    fillStyle: '#c33',
    x: 50, y: 50,
    width: 100, height: 150,
    fromCenter: false
  })
  .restoreCanvas({
    layer: true
  });
```
