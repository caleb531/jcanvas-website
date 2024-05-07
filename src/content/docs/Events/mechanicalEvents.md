---
title: Mechanical Events
slug: docs/mechanicalEvents
---

jCanvas allows you to run a callback when you perform a layer-related action, such as adding a new layer or removing an existing layer. These events are referred to in jCanvas terminology as *mechanical events*, though they work like any other jCanvas event.

### The `add` event

The `add` event fires when a layer is added (but *before* it is drawn).

```js
$('canvas').drawRect({
  layer: true,
  name: 'box',
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  add: function(layer) {
    // code to run when layer is first added
  }
});
```

### The `remove` event

The `remove` event fires when a layer is removed using the `removeLayer()` method (or indirectly via `removeLayers()` or `removeLayerGroup()`).

```js
$('canvas').drawRect({
  layer: true,
  name: 'box',
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  remove: function(layer) {
    // code to run when layer is removed
  }
});
$('canvas').removeLayer('box');
```

### The `change` event

The `change` event fires when a layer's properties are changed using the `setLayer()` method (or indirectly via `setLayers()` or `setLayerGroup()`).

```js
$('canvas').drawRect({
  layer: true,
  name: 'box',
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  change: function(layer, props) {
    // code to run when layer properties change
  }
});
$('canvas').setLayer('box', {
  x: 200
});
```

### The `move` event

The `move` event fires when a layer is moved to a new position using the `moveLayer()` method (or indirectly via `moveLayers()` or `moveLayerGroup()`).

```js
$('canvas').drawRect({
  layer: true,
  name: 'box',
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  move: function(layer) {
    // code to run when layer's order on canvas is changed
  }
});
$('canvas').moveLayer('box', 2);
```

### Animation events

jCanvas provides the following events pertaining to animation: `animatestart`, `animate`, and `animateend`.

```js
$('canvas').drawRect({
  layer: true,
  name: 'box',
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  animatestart: function(layer) {
    // code to run when animation starts
  },
  animate: function(layer, fx) {
    // code to run on each frame of the animation
    // fx contains animation-related properties
  },
  animateend: function(layer) {
    // code to run when animation ends
  }
});
$('canvas').animateLayer('box', {
  x: 200, y: 300
});
```

jCanvas also supports a `stop` event, which fires when the animation is stopped using the `stoplayer()` method (or indirectly via `stopLayerGroup()`).

```js
$('canvas').drawRect({
  layer: true,
  name: 'box',
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  stop: function(layer) {
    // code to run when animation is stopped
  }
});
$('canvas').stopLayer('box');
```

Similarly, jCanvas supports a `delay` event, which fires when the `delayLayer()` method is called (or indirectly via `delayLayerGroup()`).

```js
$('canvas').drawRect({
  fillStyle: '#6c0',
  x: 100, y: 100,
  width: 100, height: 100,
  delay: function(layer) {
    // code to run when animation is delayed
  }
});
$('canvas').delayLayer('box', 300);
```
