---
title: Ellipses
slug: docs/ellipses
---

An ellipse in jCanvas is, essentially, an elongated circle. The size of an ellipse is determined by its `width` and `height` properties.

## Basic Usage

You can draw an ellipse using the `drawArc()` method. The size of an ellipse is determined by its `start`, `end`, `width`, and `height` properties.

jCanvas considers zero degrees to lie due north of the ellipse (like the 12 on an analog clock).

```js
$('canvas').drawEllipse({
  fillStyle: '#c33',
  x: 150, y: 100,
  width: 200, height: 100
});
```

```js
$('canvas').drawEllipse({
  strokeStyle: '#36c',
  strokeWidth: 4,
  x: 150, y: 100,
  width: 200, height: 100
});
```

```js
$('canvas').drawEllipse({
  strokeStyle: '#5b2',
  strokeWidth: 4,
  x: 150, y: 100,
  width: 200, height: 100,
  start: 0, end: 180,
  ccw: true
});
```
