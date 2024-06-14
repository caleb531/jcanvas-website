---
title: Creating a Plugin
slug: docs/extending
sidebar:
  order: 2
---

jCanvas provides a plugin API so you can create methods which integrate with jCanvas. To do so, use the `jCanvas.extend()` method.

The `extend()` method accepts one object containing three properties:

- `name`: The name of the method you are creating
- `type`: Optional; the type of drawing, which jCanvas will recognize as a valid value for the `type` property.
- `props`: Optional; the custom properties your method uses (and their default values). These properties will be merged into the arguments object (mentioned below) for use in your method's code.
- `fn`: The function providing the plugin's functionality. It accepts two arguments:
  1. The context of the canvas
  2. The parameters object the method will receive when called

```js
$.jCanvas.extend({
  name: 'pluginName',
  props: {
    prop: true
  },
  fn: function (ctx, params) {
    // Your code here
  }
});
```

## Example: `drawHeart()`

To demonstrate how this works, we'll be creating a method that draws a heart on the canvas.

```js
// Create a drawHeart() method
$.jCanvas.extend({
	name: "drawHeart",
	type: "heart",
	props: {
		size: 0,
	},
	fn: function (ctx, params) {
		const canvas = this,
			width = params.size,
			factor = 0.75,
			height = width * factor,
			angle = PI * (factor * (1 - factor));

		// Enable shape transformation
		$.jCanvas.transformShape(canvas, ctx, params, width, height);

		const x = params.x;
		const y = params.y + width / 8;

		ctx.beginPath();
		ctx.moveTo(x, y + height / 2);
		ctx.arc(x + width / 4, y - height / 2, width / 4, angle, PI, true);
		ctx.arc(x - width / 4, y - height / 2, width / 4, 0, PI - angle, true);
		params.closed = true;
		$.jCanvas.detectEvents(canvas, ctx, params);
		$.jCanvas.closePath(canvas, ctx, params);
	},
});

// Use the drawHeart() method
$('canvas').drawHeart({
  layer: true,
  draggable: true,
  fillStyle: '#f6c',
  x: 160, y: 100,
  size: 140,
  rotate: 30
});
```

## TypeScript

If you use TypeScript, the `$.jCanvas.extend` method is generic and accepts a
single type argument representing the types of any new props you define.

```ts
// Create a drawCrescent() method
$.jCanvas.extend<{ eclipse: number; }>({
  name: 'drawCrescent',
  type: 'crescent',
  props: {
    eclipse: 0.5
  },
  fn: function (ctx, params) {
    console.log(params.eclipse); // eclipse: number
    // ...
  }
});
```

### Creating a definitions file (d.ts)

To extend the native jCanvas types to support your new methods/properties, create a `d.ts` file with the same base name as your plugin file (e.g. if your plugin filename is `jcanvas-crescent.ts`, then the definitions file should be `jcanvas-crescent.d.ts`):

The definitions file should look something like this:

```ts
/// <reference path="./node_modules/jcanvas/dist/esm/jcanvas.min.d.ts" />
// You might need to adjust the above path

interface JCanvasDefaults {
	eclipse: number;
}

interface JQuery {
	drawCrescent(args: Partial<JCanvasObject>): JQuery;
}
```

## API Methods

The jCanvas object (`$.jCanvas`) provides a few useful methods for integrating your methods with jCanvas. All of these methods accept the same three arguments: the canvas DOM element (`this`), the canvas context (`ctx`), and the parameters object (`params`).

- `setGlobalProps()`: sets global canvas properties like `fillStyle`, `shadowColor`, etc.
- `transformShape()`: Enables shape transformation using the standard transformation properties (`rotate`, `scale`, `translate`). Note that the `closePath()` method must be called later on to restore the layer transformations.
- `detectEvents()`: Enables and detects jCanvas events for your custom path. Note that this method should be called at the end of your path.
- `closePath()`: Closes the current path, and fills/strokes it if the respective properties have been set. The method also enables masking for the path through the use of the `mask` property.
- `setCanvasFont()`: Sets the font of the canvas context based on the `fontStyle`, `fontSize`, and `fontFamily` properties.
- `measureText()`: Augments the given parameter object with the calculated `width` and `height` of the text. Accepts an array of strings (representing lines of text) as a fourth argument.

```js
$.jCanvas.detectEvents(this, ctx, params);
```

```js
$.jCanvas.closePath(this, ctx, params);
```

## Notes

When calling your method, jCanvas will automatically loop through selected canvas elements, so you don't need to.
