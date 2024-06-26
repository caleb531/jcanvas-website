---
title: Mouse Events
slug: docs/mouseEvents
sidebar:
  order: 2
---

jCanvas supports a number of standard mouse events that you can use on most types of jCanvas layers. Supported events include `click`, `dblclick`, `mousedown`, `mousemove`, `mouseup`, `pointerdown`, `pointermove`, `pointerup`, and `contextmenu`.

## Events and animation

When you click the star in the demo below, it will spin.

```js
// Click the star to make it spin
$('canvas').drawPolygon({
  layer: true,
  fillStyle: '#c33',
  x: 100, y: 100,
  radius: 50, sides: 5,
  concavity: 0.5,
  click: function (layer) {
    // Spin star
    $(this).animateLayer(layer, {
      rotate: '+=144'
    });
  }
});
```

## Multiple layers with events

This example utilizes multiple layers with events attached.

When calling the `animateLayer()` method, you should pass it the layer object to animate that particular layer. Failing to do so will animate the first layer by default.

```js
// Create five cascading stars
for (let i = 0; i < 5; i += 1) {
  $('canvas').drawPolygon({
    layer: true,
    fillStyle: '#c33',
    x: 50 + i * 60, y: 50,
    radius: 30, sides: 5,
    concavity: 0.5,
    click: function (layer) {
      // Click a star to spin it
      $(this).animateLayer(layer, {
        rotate: '+=144'
      });
    }
  });
}
```

## The `mouseover` and `mouseout` events

The `mouseover` and `mouseout` can be used separately, or together.

```js
// Hover over the triangle to rotate it
$('canvas').drawPolygon({
  layer: true,
  fillStyle: '#fff',
  strokeStyle: '#333',
  strokeWidth: 2,
  x: 160, y: 150,
  radius: 100, sides: 3,
  mouseover: function (layer) {
    $(this).animateLayer(
      layer,
      {
        fillStyle: '#c33'
      },
      500
    );
  },
  mouseout: function (layer) {
    $(this).animateLayer(
      layer,
      {
        fillStyle: '#fff'
      },
      500
    );
  }
});
```
