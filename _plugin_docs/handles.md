---
title: Handles
author: Caleb Evans
download: true
---

This plugin will enable any jCanvas rectangle or image to be resized using draggable handles on its four corners.

Once you download and include the plugin on your page, you can add these drag handles to a rectangle by specifying the `handle` property with the properties of your handle.

It's important to note that each drag handle is an actual jCanvas layer.

### Rectangles

The following example will draw a resizable rectangle.

```javascript
// Add rectangle layer w/o drawing
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  // Define handle properties
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  }
})
// Redraw layers to ensure handles are on top of rectangle
.drawLayers();
```

### Resizing from a corner

By default, plugin resizes the rectangle from its center. However, you can easily change this behavior by setting the `resizeFromCenter` property to `false`.

```javascript
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  handle: {
    type: 'rectangle',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    width: 20, height: 20,
    cornerRadius: 3
  },
  resizeFromCenter: false
})
.drawLayers();
```

### Constraining proportions

You can also constrain the original proportions of the shape using the `constrainProportions` property.

```javascript
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  constrainProportions: true,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
})
.drawLayers();
```

Of course, this constraining also works when resizing from a corner (that is, when `resizeFromCenter` is `false`).

```javascript
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  resizeFromCenter: false,
  constrainProportions: true,
  handle: {
    type: 'rectangle',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    width: 20, height: 20,
    cornerRadius: 3
  },
})
.drawLayers();
```

The aspect ratio to which the image is constrained is determined by the layer's initial `width` and `height` attributes. However, you can also define an explicit aspect ratio for the layer using the `aspectRatio` property.

```javascript
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  constrainProportions: true,
  // Constrain the rectangle to a square shape
  aspectRatio: 1,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
})
.drawLayers();
```

Note that the layer's `aspectRatio` is disregarded when `constrainProportions` is `false`.

### Handle placement

The plugin allows for handles to be placed on either the corners of the layer, or on its sides. This can be especially useful for shapes such as ellipses, which have no actual corners but whose sides extend to the ellipse's defined width and height.

To specify where handles are placed, specify the `handlePlacement` property with any of the following values: `'corners'`, `'sides'`, or `'both'`. The default value is `'corners'`.

```javascript
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  // Place a handle at each side
  handlePlacement: 'sides',
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
})
.drawLayers();
```

```javascript
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  // Place a handle at each side and each corner
  handlePlacement: 'both',
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
})
.drawLayers();
```

### Ellipses

You can also add handles to ellipse layers in the same manner, though this is more practical using the `handlePlacement` property.

```javascript
$('canvas').addLayer({
  type: 'ellipse',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  // Place a handle at each side and each corner
  handlePlacement: 'both',
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
})
.drawLayers();
```

### Images

You can also add handles to image layers in the same manner. However, note that in order for this to work properly, you *must* specify the `width` and `height` properties.

```javascript
// Draw a resizable image
$('canvas').addLayer({
  type: 'image',
  draggable: true,
  source: 'images/fish.jpg',
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 180, y: 150,
  width: 200, height: 125,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  }
})
.drawLayers();
```

### Lines

You can also add handles to line layers in the same manner.

```javascript
$('canvas').addLayer({
  type: 'line',
  draggable: true,
  strokeStyle: '#c33',
  strokeWidth: 2,
  rounded: true,
  x1: 100, y1: 50,
  x2: 150, y2: 150,
  x3: 200, y3: 100,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  }
})
.drawLayers();
```

### Curves

You can also add handles to quadratic or Bézier curve layers. It is recommended that you also set guides on your curve layers (via the `guide` property) so that the control points and anchor points are visually connected.

```javascript
$('canvas').addLayer({
  type: 'quadratic',
  draggable: true,
  strokeStyle: '#c33',
  strokeWidth: 2,
  rounded: true,
  x1: 50, y1: 50,
  cx1: 175, cy1: 75,
  x2: 200, y2: 200,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
  // Define guide properties
  guide: {
    strokeStyle: '#c33',
    strokeWidth: 1
  }
})
.drawLayers();
```

```javascript
$('canvas').addLayer({
  type: 'bezier',
  draggable: true,
  strokeStyle: '#c33',
  strokeWidth: 2,
  rounded: true,
  x1: 100, y1: 150,
  cx1: 50, cy1: 50,
  cx2: 250, cy2: 50,
  x2: 200, y2: 150,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
  guide: {
    strokeStyle: '#c33',
    strokeWidth: 1
  }
})
.drawLayers();
```

### Events

The plugin also adds the following custom events: `handlestart`, `handlemove`, `handlestop`

```javascript
// Add rectangle layer w/o drawing
$('canvas').addLayer({
  type: 'rectangle',
  draggable: true,
  fillStyle: '#fff',
  strokeStyle: '#c33',
  strokeWidth: 2,
  x: 160, y: 150,
  width: 150, height: 80,
  handle: {
    type: 'arc',
    fillStyle: '#fff',
    strokeStyle: '#c33',
    strokeWidth: 2,
    radius: 10
  },
  handlestart: function(layer) {
    // code to run when resizing starts
  },
  handlemove: function(layer) {
    // code to run while resizing
  },
  handlestop: function(layer) {
    // code to run while resizing stops
  }
})
.drawLayers();
```
