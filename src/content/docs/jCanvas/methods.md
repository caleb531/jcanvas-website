---
title: Methods
slug: docs/methods
order: 6
---

This is a reference of every jCanvas method, for quick access.

### [addLayer](/docs/addLayers/)

  - Syntax
    - `addLayer( properties )`
  - Returns
    - `jQuery`

### [addLayerToGroup](/docs/addLayers/)

  - Syntax
    - `addLayerToGroup( layerId, groupName )`
  - Returns
    - `jQuery`

### [animateLayer](/docs/animateLayers/)

  - Syntax
    - `animateLayer( layerId, properties [, duration ] [, easing ] [, callback ] )`
    - `animateLayer( layerId, properties, options )`
  - Returns
    - `jQuery`

### [animateLayerGroup](/docs/animateLayers/)

  - Syntax
    - `animateLayerGroup( groupId, properties [, duration ] [, easing ] [, callback ] )`
    - `animateLayerGroup( groupId, properties, options )`
  - Returns
    - `jQuery`

### [clearCanvas](/docs/clearCanvas/)

  - Syntax
    - `clearCanvas( properties )`
  - Returns
    - `jQuery`

### [createGradient](/docs/gradients/)

  - Syntax
    - `createGradient( properties )`
  - Returns
    - `CanvasGradient`

### [createPattern](/docs/patterns/)

  - Syntax
    - `createPattern( properties )`
  - Returns
    - `CanvasPattern`

### [delayLayer](/docs/animateLayers/)

  - Syntax
    - `delayLayer( layerId [, duration ] )`
  - Returns
    - `jQuery`

### [delayLayerGroup](/docs/animateLayers/)

  - Syntax
    - `delayLayerGroup( groupId [, duration ] )`
  - Returns
    - `jQuery`

### [detectPixelRatio](/docs/detectPixelRatio/)

  - Syntax
    - `detectPixelRatio( [ callback ] )`
  - Returns
    - `jQuery`

### [draw](/docs/drawManually/)

  - Syntax
    - `draw( properties )`
  - Returns
    - `jQuery`

### [drawArc](/docs/arcs/)

  - Syntax
    - `drawArc( properties )`
  - Returns
    - `jQuery`

### [drawBezier](/docs/curves/)

  - Syntax
    - `drawBezier( properties )`
  - Returns
    - `jQuery`

### [drawEllipse](/docs/ellipses/)

  - Syntax
    - `drawEllipse( properties )`
  - Returns
    - `jQuery`

### [drawImage](/docs/images/)

  - Syntax
    - `drawImage( properties )`
  - Returns
    - `jQuery`

### [drawLayers](/docs/drawLayers/)

  - Syntax
    - `drawLayers( )`
  - Returns
    - `jQuery`

### [drawLine](/docs/lines/)

  - Syntax
    - `drawLine( properties )`
  - Returns
    - `jQuery`

### [drawPolygon](/docs/polygons/)

  - Syntax
    - `drawPolygon( properties )`
  - Returns
    - `jQuery`

### [drawQuadratic](/docs/curves/)

  - Syntax
    - `drawQuadratic( properties )`
  - Returns
    - `jQuery`

### [drawRect](/docs/rectangles/)

  - Syntax
    - `drawRect( properties )`
  - Returns
    - `jQuery`

### [drawSlice](/docs/slices/)

  - Syntax
    - `drawSlice( properties )`
  - Returns
    - `jQuery`

### [drawText](/docs/text/)

  - Syntax
    - `drawText( properties )`
  - Returns
    - `jQuery`

### [drawVector](/docs/vectors/)

  - Syntax
    - `drawVector( properties )`
  - Returns
    - `jQuery`

### [getCanvasImage](/docs/getCanvasImage/)

  - Syntax
    - `getCanvasImage( [ imageType ] )`
  - Returns
    - `String`

### [getEventHooks](/docs/eventHooks/)

  - Syntax
    - `getEventHooks( )`
  - Returns
    - `Object`

### [getLayer](/docs/retrieveLayers/)

  - Syntax
    - `getLayer( layerId )`
  - Returns
    - `Layer`

### [getLayerGroup](/docs/retrieveLayers/)

  - Syntax
    - `getLayerGroup( groupId )`
  - Returns
    - `Layer`

### [getLayerIndex](/docs/retrieveLayers/)

  - Syntax
    - `getLayerIndex( layerId )`
  - Returns
    - `Number`

### [getLayers](/docs/retrieveLayers/)

  - Syntax
    - `getLayers( [ callback ] )`
  - Returns
    - `Array`

### [jCanvas.extend](/docs/extending/)

  - Syntax
    - `jCanvas.extend( properties )`
  - Returns
    - `Function`

### [measureText](/docs/text/)

  - Syntax
    - `measureText( properties )`
    - `measureText( layerId )`
  - Returns
    - `Object`

### [moveLayer](/docs/manipulateLayers/)

  - Syntax
    - `moveLayer( layerId, groupName )`
  - Returns
    - `jQuery`

### [removeLayer](/docs/manipulateLayers/)

  - Syntax
    - `removeLayer( layerId )`
  - Returns
    - `jQuery`

### [removeLayerFromGroup](/docs/manipulateLayers/)

  - Syntax
    - `removeLayerFromGroup( layerId, groupName )`
  - Returns
    - `jQuery`

### [removeLayerGroup](/docs/manipulateLayers/)

  - Syntax
    - `removeLayerGroup( groupId )`
  - Returns
    - `jQuery`

### [removeLayers](/docs/manipulateLayers/)

  - Syntax
    - `removeLayers( )`
  - Returns
    - `jQuery`

### restoreCanvas( )

  - Syntax
    - `restoreCanvas( properties )`
  - Returns
    - `jQuery`
  - Notes
    - For usage details, see the documentation for [`rotateCanvas()`](/docs/rotateCanvas/), [`scaleCanvas()`](/docs/scaleCanvas/), [`translateCanvas()`](/docs/translateCanvas/), or [Masking](/docs/masking/).

### [rotateCanvas](/docs/rotateCanvas/)

  - Syntax
    - `rotateCanvas( properties )`
  - Returns
    - `jQuery`

### [scaleCanvas](/docs/scaleCanvas/)

  - Syntax
    - `scaleCanvas( properties )`
  - Returns
    - `jQuery`

### [setEventHooks](/docs/eventHooks/)

  - Syntax
    - `setEventHooks( properties )`
  - Returns
    - `jQuery`

### [setLayer](/docs/manipulateLayers/)

  - Syntax
    - `setLayer( layerId, properties )`
  - Returns
    - `jQuery`

### [setLayerGroup](/docs/manipulateLayers/)

  - Syntax
    - `setLayerGroup( groupId, properties )`
  - Returns
    - `jQuery`

### [setLayers](/docs/manipulateLayers/)

  - Syntax
    - `setLayers( properties [, callback ] )`
  - Returns
    - `jQuery`

### [setPixels](/docs/pixelManipulation/)

  - Syntax
    - `setPixels( properties )`
  - Returns
    - `jQuery`

### [stopLayer](/docs/animateLayers/)

  - Syntax
    - `stopLayer( layerId [, clearQueue ] )`
  - Returns
    - `jQuery`

### [stopLayerGroup](/docs/animateLayers/)

  - Syntax
    - `stopLayerGroup( groupId [, clearQueue ] )`
  - Returns
    - `jQuery`

### [translateCanvas](/docs/translateCanvas/)

  - Syntax
    - `translateCanvas( properties )`
  - Returns
    - `jQuery`
