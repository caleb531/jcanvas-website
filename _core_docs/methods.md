---
title: Methods
---

This is a reference of every jCanvas method, for quick access.

### [addLayer( )]({{ site.baseurl }}/docs/addLayers/)

  - Syntax
    - `addLayer( properties )`
  - Returns
    - `jQuery`

### [addLayerToGroup( )]({{ site.baseurl }}/docs/addLayers/)

  - Syntax
    - `addLayerToGroup( layerId, groupName )`
  - Returns
    - `jQuery`

### [animateLayer( )]({{ site.baseurl }}/docs/animateLayers/)

  - Syntax
    - `animateLayer( layerId, properties [, duration ] [, easing ] [, callback ] )`
    - `animateLayer( layerId, properties, options )`
  - Returns
    - `jQuery`

### [animateLayerGroup( )]({{ site.baseurl }}/docs/animateLayers/)

  - Syntax
    - `animateLayerGroup( groupId, properties [, duration ] [, easing ] [, callback ] )`
    - `animateLayerGroup( groupId, properties, options )`
  - Returns
    - `jQuery`

### [clearCanvas( )]({{ site.baseurl }}/docs/clearCanvas/)

  - Syntax
    - `clearCanvas( properties )`
  - Returns
    - `jQuery`

### [createGradient( )]({{ site.baseurl }}/docs/gradients/)

  - Syntax
    - `createGradient( properties )`
  - Returns
    - `CanvasGradient`

### [createPattern( )]({{ site.baseurl }}/docs/patterns/)

  - Syntax
    - `createPattern( properties )`
  - Returns
    - `CanvasPattern`

### [delayLayer( )]({{ site.baseurl }}/docs/animateLayers/)

  - Syntax
    - `delayLayer( layerId [, duration ] )`
  - Returns
    - `jQuery`

### [delayLayerGroup( )]({{ site.baseurl }}/docs/animateLayers/)

  - Syntax
    - `delayLayerGroup( groupId [, duration ] )`
  - Returns
    - `jQuery`

### [detectPixelRatio( )]({{ site.baseurl }}/docs/detectPixelRatio/)

  - Syntax
    - `detectPixelRatio( [ callback ] )`
  - Returns
    - `jQuery`

### [draw( )]({{ site.baseurl }}/docs/drawManually/)

  - Syntax
    - `draw( properties )`
  - Returns
    - `jQuery`

### [drawArc( )]({{ site.baseurl }}/docs/arcs/)

  - Syntax
    - `drawArc( properties )`
  - Returns
    - `jQuery`

### [drawBezier( )]({{ site.baseurl }}/docs/curves/)

  - Syntax
    - `drawBezier( properties )`
  - Returns
    - `jQuery`

### [drawEllipse( )]({{ site.baseurl }}/docs/ellipses/)

  - Syntax
    - `drawEllipse( properties )`
  - Returns
    - `jQuery`

### [drawImage( )]({{ site.baseurl }}/docs/images/)

  - Syntax
    - `drawImage( properties )`
  - Returns
    - `jQuery`

### [drawLayers( )]({{ site.baseurl }}/docs/drawLayers/)

  - Syntax
    - `drawLayers( )`
  - Returns
    - `jQuery`

### [drawLine( )]({{ site.baseurl }}/docs/lines/)

  - Syntax
    - `drawLine( properties )`
  - Returns
    - `jQuery`

### [drawPolygon( )]({{ site.baseurl }}/docs/polygons/)

  - Syntax
    - `drawPolygon( properties )`
  - Returns
    - `jQuery`

### [drawQuadratic( )]({{ site.baseurl }}/docs/curves/)

  - Syntax
    - `drawQuadratic( properties )`
  - Returns
    - `jQuery`

### [drawRect( )]({{ site.baseurl }}/docs/rectangles/)

  - Syntax
    - `drawRect( properties )`
  - Returns
    - `jQuery`

### [drawSlice( )]({{ site.baseurl }}/docs/slices/)

  - Syntax
    - `drawSlice( properties )`
  - Returns
    - `jQuery`

### [drawText( )]({{ site.baseurl }}/docs/text/)

  - Syntax
    - `drawText( properties )`
  - Returns
    - `jQuery`

### [drawVector( )]({{ site.baseurl }}/docs/vectors/)

  - Syntax
    - `drawVector( properties )`
  - Returns
    - `jQuery`

### [getCanvasImage( )]({{ site.baseurl }}/docs/getCanvasImage/)

  - Syntax
    - `getCanvasImage( [ imageType ] )`
  - Returns
    - `String`

### [getEventHooks( )]({{ site.baseurl }}/docs/eventHooks/)

  - Syntax
    - `getEventHooks( )`
  - Returns
    - `Object`

### [getLayer( )]({{ site.baseurl }}/docs/retrieveLayers/)

  - Syntax
    - `getLayer( layerId )`
  - Returns
    - `Layer`

### [getLayerGroup( )]({{ site.baseurl }}/docs/retrieveLayers/)

  - Syntax
    - `getLayerGroup( groupId )`
  - Returns
    - `Layer`

### [getLayerIndex( )]({{ site.baseurl }}/docs/retrieveLayers/)

  - Syntax
    - `getLayerIndex( layerId )`
  - Returns
    - `Number`

### [getLayers( )]({{ site.baseurl }}/docs/retrieveLayers/)

  - Syntax
    - `getLayers( [ callback ] )`
  - Returns
    - `Array`

### [jCanvas.extend( )]({{ site.baseurl }}/docs/extending/)

  - Syntax
    - `jCanvas.extend( properties )`
  - Returns
    - `Function`

### [measureText( )]({{ site.baseurl }}/docs/text/)

  - Syntax
    - `measureText( properties )`
    - `measureText( layerId )`
  - Returns
    - `Object`

### [moveLayer( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `moveLayer( layerId, groupName )`
  - Returns
    - `jQuery`

### [removeLayer( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `removeLayer( layerId )`
  - Returns
    - `jQuery`

### [removeLayerFromGroup( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `removeLayerFromGroup( layerId, groupName )`
  - Returns
    - `jQuery`

### [removeLayerGroup( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `removeLayerGroup( groupId )`
  - Returns
    - `jQuery`

### [removeLayers( )]({{ site.baseurl }}/docs/manipulateLayers/)

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
    - For usage details, see the documentation for [`rotateCanvas()`]({{ site.baseurl }}/docs/rotateCanvas/), [`scaleCanvas()`]({{ site.baseurl }}/docs/scaleCanvas/), [`translateCanvas()`]({{ site.baseurl }}/docs/translateCanvas/), or [Masking]({{ site.baseurl }}/docs/masking/).

### [rotateCanvas( )]({{ site.baseurl }}/docs/rotateCanvas/)

  - Syntax
    - `rotateCanvas( properties )`
  - Returns
    - `jQuery`

### [scaleCanvas( )]({{ site.baseurl }}/docs/scaleCanvas/)

  - Syntax
    - `scaleCanvas( properties )`
  - Returns
    - `jQuery`

### [setEventHooks( )]({{ site.baseurl }}/docs/eventHooks/)

  - Syntax
    - `setEventHooks( properties )`
  - Returns
    - `jQuery`

### [setLayer( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `setLayer( layerId, properties )`
  - Returns
    - `jQuery`

### [setLayerGroup( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `setLayerGroup( groupId, properties )`
  - Returns
    - `jQuery`

### [setLayers( )]({{ site.baseurl }}/docs/manipulateLayers/)

  - Syntax
    - `setLayers( properties [, callback ] )`
  - Returns
    - `jQuery`

### [setPixels( )]({{ site.baseurl }}/docs/pixelManipulation/)

  - Syntax
    - `setPixels( properties )`
  - Returns
    - `jQuery`

### [stopLayer( )]({{ site.baseurl }}/docs/animateLayers/)

  - Syntax
    - `stopLayer( layerId [, clearQueue ] )`
  - Returns
    - `jQuery`

### [stopLayerGroup( )]({{ site.baseurl }}/docs/animateLayers/)

  - Syntax
    - `stopLayerGroup( groupId [, clearQueue ] )`
  - Returns
    - `jQuery`

### [translateCanvas( )]({{ site.baseurl }}/docs/translateCanvas/)

  - Syntax
    - `translateCanvas( properties )`
  - Returns
    - `jQuery`
