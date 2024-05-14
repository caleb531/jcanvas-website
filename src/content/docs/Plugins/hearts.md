---
title: Hearts
slug: plugins/hearts
is_plugin: true
---

This plugin is a more complete version of the [`custom drawHeart()` method in the documentation](/jcanvas/docs/extending/), which supports layer events and transformations.

```js
$('canvas').drawHeart({
  layer: true,
  draggable: true,
  name: 'heart',
  fillStyle: '#f6c',
  x: 160,
  y: 100,
  size: 140,
  rotate: 30
});
```
