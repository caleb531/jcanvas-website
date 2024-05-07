---
title: Retrieving layers
slug: docs/retrieveLayers
---

### Retrieving a single layer

You can retrieve a specific layer using the `getLayer()` method. You can pass it the index of the layer, or the layer's assigned `name`.

```js
// Get the first layer
$('canvas').getLayer(0);
```

```js
// Get the layer whose name is 'myBox'
$('canvas').getLayer('myBox');
```

You can also retrieve the first layer whose names matches the given regular expression.

```js
// Get first layer whose name contains 'box'
$('canvas').getLayer(/box/gi);
```

Finally, a negative index is also acceptable, with `-1` being the index of the last (topmost) layer.

```js
// Get the last layer
$('canvas').getLayer(-1);
```

### Retrieving all layers

To retrieve all layers (as an array) for any canvas element, use the `getLayers()` method.

The `getLayers()` method returns an array containing each layer object. Therefore, you can act on the array after retrieving it.

```js
$('canvas').getLayers();
```

```js
var layers = $('canvas').getLayers();
// Reverse layer order
layers.reverse();
```

The `getLayers()` method accepts one optional argument: a callback function which filters the layers array to those layers which pass the callback function. That is, If the callback function returns `true`, the layer will be in the resulting array. If the function returns `false`, the layer will not be included in the resulting array.

```js
// Returns an array containing all draggable layers
$('canvas').getLayers(function(layer) {
  return (layer.draggable === true);
});
```

Note that the `getLayers()` method always returns an array, even for non-canvases.

### Retrieving layer groups

If you've defined the same `group` for a set of layers, you can get those layers using the `getLayerGroup()` method.

```js
$('canvas').getLayerGroup('myBoxes');
```

You can also retrieve all layers whose group name matches the given regular expression.

```js
$('canvas').getLayerGroup(/box/gi);
```

### Retrieving layer indexes

You can retrieve a layer's index in the layers array using the `getLayerIndex()` method.

```js
$('canvas').getLayerIndex('box');
```
