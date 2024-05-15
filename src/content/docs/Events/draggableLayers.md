---
title: Draggable Layers
slug: docs/draggableLayers
sidebar:
  order: 5
---

## Basic Usage

Layers can be made draggable using the `draggable` property.

```js
$('canvas')
  .drawArc({
    layer: true,
    draggable: true,
    fillStyle: '#36c',
    x: 150, y: 150,
    radius: 50
  })
  .drawRect({
    layer: true,
    draggable: true,
    fillStyle: '#6c1',
    x: 100, y: 100,
    width: 100, height: 100
  });
```

By default, draggable shapes will _not_ move to the front when dragged. To change this behavior, set the `bringToFront` property to `true`.

```js
$('canvas')
  .drawArc({
    layer: true,
    draggable: true,
    bringToFront: true,
    fillStyle: '#36c',
    x: 150, y: 150,
    radius: 50
  })
  .drawRect({
    layer: true,
    draggable: true,
    bringToFront: true,
    fillStyle: '#6c1',
    x: 100, y: 100,
    width: 100, height: 100
  });
```

## Drag Events

You can provide callbacks for when any drag event occurs by defining `dragstart`, `drag`, `dragstop`, and `dragcancel` callbacks.

- `dragstart`: Triggers when you start dragging a layer
- `drag`: Triggers as you drag a layer
- `dragstop`: Triggers when you stop dragging a layer
- `dragcancel`: Triggers when you drag a layer off the edge of the canvas

```js
$('canvas').drawArc({
  layer: true,
  draggable: true,
  bringToFront: true,
  fillStyle: '#36c',
  x: 150, y: 150,
  radius: 50,
  dragstart: function () {
    // code to run when dragging starts
  },
  drag: function (layer) {
    // code to run as layer is being dragged
  },
  dragstop: function (layer) {
    // code to run when dragging stops
  }
});
```

## The `dragging` property

At any time, you can determine if a layer is currently being dragged by checking its `dragging` property. When the layer is being dragged, its value is `true`. Otherwise, its value is `false`.

## Drag groups

jCanvas allows you to assign a drag group to a layer. This means that when the layer is dragged, all other layers in the same layer `group` will also be dragged.

This draggable grouping is achieved when you add the `dragGroups` property to any (typically all) layers in the same layer group.

```js
// Both layers will be dragged together
$('canvas')
  .drawArc({
    layer: true,
    draggable: true,
    groups: ['shapes'],
    dragGroups: ['shapes'],
    fillStyle: '#36c',
    x: 150, y: 150,
    radius: 50
  })
  .drawRect({
    layer: true,
    draggable: true,
    groups: ['shapes'],
    dragGroups: ['shapes'],
    fillStyle: '#6c1',
    x: 100, y: 100,
    width: 100, height: 100
  });
```

## Restricting dragging to an axis

You can restrict the dragging of any layer to either the _x_ or _y_ axis using the `restrictDragToAxis` property.

```js
$('canvas')
  .drawArc({
    layer: true,
    draggable: true,
    fillStyle: '#36c',
    x: 150, y: 150,
    radius: 50,
    restrictDragToAxis: 'x'
  })
  .drawRect({
    layer: true,
    draggable: true,
    fillStyle: '#6c1',
    x: 100, y: 100,
    width: 100, height: 100,
    restrictDragToAxis: 'y'
  });
```

Please note that if a layer in a drag group has restricted draggability, then all the draggability of all other layers in that drag group will also be restricted _only when the original layer is dragged_.

## Snap-to-grid dragging

If you wish to have your layers snap to a grid when dragged, you can do with the
`updateDragX` and `updateDragY` callbacks, along with some simple math.

```js
// The pixel multiple to snap to
var snapToAmount = 40;
// Round the given value to the nearest multiple of n
function nearest(value, n) {
  return Math.round(value / n) * n;
}
$('canvas').drawArc({
  layer: true,
  draggable: true,
  fillStyle: '#36c',
  x: 160, y: 120,
  radius: 50,
  updateDragX: function (layer, x) {
    return nearest(x, snapToAmount);
  },
  updateDragY: function (layer, y) {
    return nearest(y, snapToAmount);
  }
});
```
