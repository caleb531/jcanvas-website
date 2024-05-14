import $ from 'jquery';

const DEMO_CANVAS_HEIGHT = 250;

$(document).ready(function () {
  // Expose jQuery to global scope so users can interact with jQuery/jCanvas
  // from the console
  window.jQuery = $;
  window.$ = $;

  const $body = $('body');

  // The pattern to replace in image paths; this allows image paths in the live
  // code editors (e.g. "images/fish.jpg" to be rewritten to point to the correct
  // URL on the server (e.g. "assets/images/fish.jpg")
  const imagePathPattern = /(images\/(?:\w+)\.(jpg|png|svg))/gi;

  // Add jQuery method which adds a "Try in Sandbox"
  $.fn.addSandboxTryButton = function () {
    this.find('pre').prepend(
      '<button class="try-in-sandbox edge-button">Try in Sandbox</button>'
    );
  };

  const baseDefaults = Object.assign({}, $.jCanvas.defaults);

  // Reset context all attached data for the given canvas
  $.fn.resetCanvases = function () {
    this.each(function (c, canvas) {
      const $canvas = $(canvas);
      $canvas.removeLayers();
      $.removeData(canvas, 'jCanvas');
      $.jCanvas.clearCache();
      Object.assign($.jCanvas.defaults, baseDefaults);
      $canvas.prop({
        width: $canvas.parent().parent().width(),
        height: DEMO_CANVAS_HEIGHT
      });
      $canvas.removeAttr('style');
      $canvas.clearCanvas();
      $canvas.detectPixelRatio();
    });
  };

  // Spawn a new sandbox with the given sandbox state
  $.spawnNewSandbox = function (sandboxState) {
    // Retrieve the sandbox state of the current page
    const originalSandboxState = sessionStorage.getItem('jcanvas-sandbox');
    // Temporarily overwrite the current page's sandbox state with the new sandbox
    // code so that it gets copied into the sandbox state for the spawned page
    sessionStorage.setItem('jcanvas-sandbox', JSON.stringify(sandboxState));
    // window.open copies the session data for the current page into the session
    // storage for the spawned page
    window.open('/jcanvas/sandbox/');
    // Restore the original sandbox state for the current page (this should not
    // affect the sandbox state of the spawned page)
    if (originalSandboxState !== null) {
      sessionStorage.setItem('jcanvas-sandbox', originalSandboxState);
    } else {
      sessionStorage.removeItem('jcanvas-sandbox');
    }
  };

  // Modify any image paths to point to the real images directory
  $.jCanvasCorrectImagePaths = function (code) {
    return code.replace(imagePathPattern, '/jcanvas/assets/$1');
  };

  // Allow user to test any example in Sandbox
  $body.on('click', '.try-in-sandbox', function () {
    // Retrieve code for this example from neighboring <pre>
    const code = $(this).next().text();
    // Open code in a new sandbox instance
    $.spawnNewSandbox({
      code: code
    });
  });
});
