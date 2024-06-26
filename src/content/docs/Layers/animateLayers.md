---
title: Animating layers
slug: docs/animateLayers
sidebar:
  order: 6
---

## Animating layers

jCanvas provides an `animateLayer()` method for animating the properties of a jCanvas layer.

The `animateLayer()` method accepts up to five arguments:

1. The `index` or `name` of the layer to be animated. The layer object itself is also an acceptable value.
2. An object containing the properties to animate and their end values
3. The duration of the animation in milliseconds (optional; defaults to `400`)
4. The easing of the animation (optional; defaults to `'swing'`)
5. A callback function that runs when the animation completes (optional); it accepts the layer object as its only argument

```js
// Create and draw a rectangle layer
$('canvas').drawRect({
  layer: true,
  name: 'myBox',
  fillStyle: '#36c',
  x: 50, y: 50,
  width: 1, height: 1
});

// Animate layer properties
$('canvas').animateLayer(
  'myBox',
  {
    x: 150, y: 150,
    width: 100, height: 50
  },
  1000,
  function (layer) {
    // Callback function
    $(this).animateLayer(
      layer,
      {
        fillStyle: 'rgb(204, 51, 51)',
        x: 250, y: 100,
        rotate: 360
      },
      'slow',
      'swing'
    );
  }
);
```

jCanvas can animate numeric values, as well as colors (hex, RGB, or color names). jCanvas also enables jQuery to utilize this color animation for HTML elements.

Additionally, you may use the string `'+="` or `"-="` to animate a property from the current value.

```js
$('canvas').animateLayer(0, {
  rotate: '+=360',
  x: '-=50'
});
```

## Functions as Property Values

You can also use a callback function . Whatever the function returns will be used as the end-value to which that property will be animated.

As always, the value of `this` in your callback function is the canvas DOM element.

```js
$('canvas').animateLayer('myLayer', {
  x: function (layer) {
    return Math.pow(layer.x, 2);
  }
});
```

This capability is especially useful when using the below `animateLayerGroup()` method, in which you may not have direct access to each layer in the group. Now, such direct access to these layers is possible.

## Animating layer groups

You can also animate all layers in a layer group using the `animateLayerGroup()` method.

The method accepts the same basic arguments as the `animateLayer()` method,

```js
$('canvas')
  // Draw a circle
  .drawArc({
    layer: true,
    groups: ['circles'],
    fillStyle: '#c33',
    x: 100, y: 100,
    radius: 50
  })
  // Draw another circle
  .drawArc({
    layer: true,
    groups: ['circles'],
    fillStyle: '#36c',
    x: 220, y: 100,
    radius: 50
  })
  // Animate all layers in the group 'circles'
  .animateLayerGroup(
    'circles',
    {
      y: 200
    },
    500
  );
```

## Stopping animation

Similar to jQuery's `stop()` method, you can stop any layer animation in progress by calling the `stopLayer()` method.

```js
$('canvas').stopLayer(0);
```

```js
$('canvas').stopLayer('myBox');
```

Additionally, you may (optionally) pass in `true` as a second argument, which will also remove any queued animations.

```js
$('canvas').stopLayer('myBox', true);
```

You can also stop animation for all layers in a group using the `stopLayerGroup()` method

```js
$('canvas').stopLayerGroup('myGroup');
```

## Delaying animation

Similar to jQuery's `delay()` method, you can delay any layer's animation queue by calling the `delayLayer()` method.

The method accepts two arguments: the layer name/index, and the number of milliseconds to delay animation.

```js
$('canvas').delayLayer('myBox', 500);
```

You can also delay animation for all layers in a group using the `delayLayerGroup()` method

```js
$('canvas').delayLayerGroup('myGroup', 500);
```

## Running a function at every step

Just like jQuery, the `animateLayer()` method in jCanvas supports an alternate syntax for providing additional options (like a `step` callback).

```js
$('canvas').animateLayer(
  'myBox',
  {
    x: 200
  },
  {
    duration: 1000,
    easing: 'swing',
    step: function (now, fx, layer) {
      // do something for each step of the animation
    },
    complete: function (layer) {
      // still do something at end of animation
    }
  }
);
```

## Notes

Multiple `animateLayer()` calls can be queued up rather than using multiple callback functions.
The callback parameter for the `animateLayerGroup()` method will run when _each_ layer in the group finishes animating.
