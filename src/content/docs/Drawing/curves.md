---
title: Curves
slug: docs/curves
---

## Quadratic Curves

A quadratic curve consists of three components:

- A start point (_x_, _y_)
- A control point to make the curve (_cx_, _cy_)
- An end point which becomes the next start point (_x_, _y_)

You can draw one or more contiguous quadratic curves using the `drawQuadratic()` method.

```js
$('canvas').drawQuadratic({
  strokeStyle: '#000',
  strokeWidth: 5,
  x1: 50, y1: 50, // Start point
  cx1: 200, cy1: 50, // Control point
  x2: 200, y2: 200 // End point
});
```

## Bézier Curves

A Beziér curve consists of four components:

- A start point (_x_, _y_)
- A first control point (_cx_, _cy_)
- A second control point (_cx_, _cy_)
- An end point which becomes the next start point (_x_, _y_)

You can draw one or more contiguous Bézier curves using the `drawBezier()` method.

```js
$('canvas').drawBezier({
  strokeStyle: '#000',
  strokeWidth: 5,
  x1: 25, y1: 50, // Start point
  cx1: 175, cy1: 50, // Control point
  cx2: 25, cy2: 150, // Control point
  x2: 175, y2: 150, // Start/end point
  cx3: 275, cy3: 150, // Control point
  cx4: 125, cy4: 1, // Control point
  x3: 300, y3: 50 // Start/end point
});
```
