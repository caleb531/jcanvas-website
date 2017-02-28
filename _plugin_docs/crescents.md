---
title: Crescents
author: Caleb Evans
is_plugin: true
---

This plugin draws a crescent shape using the provided `drawCrescent()` method. This method also supports a special `eclipse` property, which is a multiple of the given `radius`, and determines how much the circle is eclipsed to create the crescent shape.

```js
$("canvas").drawCrescent({
  fillStyle: "#000",
  x: 160, y: 150,
  radius: 100,
  eclipse: 0.75,
  rotate: -15
});
```

### Notes

When the `eclipse` property has a value of `0`, a full circle will be drawn. When the `eclipse` property has a value of `1`, nothing will be drawn.
