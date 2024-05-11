---
title: Paths
slug: docs/paths
---

A path in jCanvas consists of one or more connected [lines](/docs/lines/), [arcs](/docs/arcs/), [curves](/docs/curves/), or [vectors](/docs/vectors/).

### Basic usage

You can draw a path using the `drawPath()` method. It accepts a variable number of arguments which define the different kinds of subpaths within your path. These arguments are defined using `p1`, `p2`, `p3`, and so on (however many as desired).

Note that for each of these subpath arguments, you must specify the type of the subpath (for instance, `type: 'line'`).

```js
// Draw the outline of a cartoon face
$('canvas').drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  p1: {
    type: 'line',
    x1: 200,
    y1: 50,
    x2: 100,
    y2: 150,
    x3: 200,
    y3: 150,
    x4: 120,
    y4: 200
  },
  p2: {
    type: 'quadratic',
    cx1: 175,
    cy1: 250,
    x2: 225,
    y2: 200
  }
});
```

Now, if you were to draw the quadratic curve in the above example using the `drawQuadratic()` method, you must specify the `x1` and `y1` properties. However, using `drawPath()` the curve continues from the last point on the previous subpath (`p1`).

If you _were_ to include the `x1` and `y1` properties, the curve would no longer be connected to the previous subpath. Consider the following example.

```js
// Draw a face with the jaw disconnected
$('canvas').drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  p1: {
    type: 'line',
    x1: 200,
    y1: 50,
    x2: 100,
    y2: 150,
    x3: 200,
    y3: 150,
    x4: 120,
    y4: 200
  },
  p2: {
    type: 'quadratic',
    x1: 130,
    y1: 210,
    cx1: 180,
    cy1: 250,
    x2: 225,
    y2: 200
  }
});
```

### Arcs

You can also use the `drawPath()` method to create sequences of interconnected arcs.

The following example will create a flower shape using arcs.

```js
$('canvas').drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  closed: true,
  x: 160,
  y: 150,
  // Top petal
  p1: {
    type: 'arc',
    x: 0,
    y: -50,
    start: -90,
    end: 90,
    radius: 50
  },
  // Right petal
  p2: {
    type: 'arc',
    x: 50,
    y: 0,
    start: 0,
    end: 180,
    radius: 50
  },
  // Bottom petal
  p3: {
    type: 'arc',
    x: 0,
    y: 50,
    start: 90,
    end: 270,
    radius: 50
  },
  // Left petal
  p4: {
    type: 'arc',
    x: -50,
    y: 0,
    start: 180,
    end: 360,
    radius: 50
  }
});
```

Note that the `x` and `y` coordinates for each subpath are _relative_ to the _x_ and _y_ coordinates of the entire path.

Also note that the subpath objects inherit default property values from the global jCanvas preferences (which is set through the `jCanvas()` method.

### Arrows

Just like every other path type in jCanvas, generic paths support arrows at either end of the path. See [the section on arrows](/docs/arrows/) for descriptions of the arrow properties.

For generic paths, arrow properties must be specified in a subpath object, not the entire path object.

```js
// Draw the outline of a cartoon face
$('canvas').drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  p1: {
    type: 'vector',
    startArrow: true,
    arrowAngle: 60,
    arrowRadius: 30,
    x: 200,
    y: 50,
    a1: 225,
    l1: 200
  },
  p2: {
    type: 'quadratic',
    cx1: 150,
    cy1: 250,
    x2: 225,
    y2: 200,
    endArrow: true,
    arrowAngle: 60,
    arrowRadius: 30
  }
});
```

### SVG Paths

You can also draw an SVG path with `drawPath()` via the `d` property (new as of jCanvas v22.1.0). This allows you to integrate SVG with jCanvas, and even take advantage of jCanvas features like [masking](/docs/masking/).

```js
// Draw an SVG path directly onto the canvas
$('canvas').drawPath({
  strokeStyle: '#000',
  strokeWidth: 4,
  d: 'M 25 25 l 50 50 q 25 -25 50 0 t 50 50 c 25 25 50 25 75 0 s 50 -25 75 0 a 20 20 0 0 1 25 25 z'
});
```
