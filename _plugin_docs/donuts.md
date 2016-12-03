---
title: Donuts
author: Caleb Evans
download: true
---

This plugin draws a donut shape using the provided `drawDonut()` method.

This plugin adds a special `holeSize` property, which is a multiple of the donut's diameter, and determines the diameter of the donut hole. The default value is `0.5`.

```javascript
$('canvas').drawDonut({
  fillStyle: '#633',
  x: 100, y: 100,
  radius: 50,
  // Set the hole's diameter to 40% of the donut's diameter
  holeSize: 0.4
});
```
