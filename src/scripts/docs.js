import 'jcanvas';
import 'jcanvas/dist/umd/jcanvas-crescents.min.js';
import 'jcanvas/dist/umd/jcanvas-donuts.min.js';
import 'jcanvas/dist/umd/jcanvas-handles.min.js';
import 'jcanvas/dist/umd/jcanvas-hearts.min.js';
import $ from 'jquery';
import './global.js';

const DEMO_CANVAS_HEIGHT = 250;

$(document).ready(function () {
  const $body = $('body');
  // The pattern to replace jQuery canvas selectors
  const canvasSelectorPattern = /\$\(['"](.*?)canvas(.*?)\1\)/gi;
  // The pattern to detect if code runs asynchronous functions
  const asyncPattern = /drawImage|createPattern|(?:type: (['"])image\1)/gi;

  function addAnchorLinks() {
    // Add anchor link to every subsection for easy access later
    $body.find('h3').each(function () {
      $(this).append('<a href="#' + this.id + '" class="subsection-link"></a>');
    });
  }

  // Run the given demo code on the given canvas
  function runDemo(code, $demoCanvas) {
    code = $.jCanvasCorrectImagePaths(code);
    // If code contains a jCanvas method acting on a canvas element
    if (canvasSelectorPattern.test(code)) {
      // Inject canvas jQuery element into demo code
      code = code.replace(canvasSelectorPattern, '$demoCanvas');
      new Function(['$demoCanvas'], code)($demoCanvas);
    }
  }

  function resetCanvas($canvas) {
    $canvas.resetCanvases({
      forceReset: true,
      width: Math.floor($canvas.parent().parent().width()),
      height: DEMO_CANVAS_HEIGHT
    });
  }

  function reRunDemo($demoCanvas) {
    const code = $demoCanvas
      .parent()
      .prev('.expressive-code')
      .getCodeContents();
    resetCanvas($demoCanvas);
    runDemo(code, $demoCanvas);
  }

  function makeExamplesDemoable() {
    // Add live canvas demo of each example (if example draws on canvas)
    $body.find('.expressive-code').each(function () {
      const $codeBlock = $(this);
      // Initialize a demo canvas
      const $demoCanvas = $(document.createElement('canvas'));
      $demoCanvas.prop({
        width: $codeBlock.width(),
        height: 250
      });
      // Create canvas container (will also contain demo controls like re-run)
      const $demoContainer = $('<div class="demo-container">');
      $demoContainer.append(
        '<button class="demo-rerun edge-button">Re-run</button>'
      );
      $demoContainer.append($demoCanvas);
      // It is crucial we reset the canvas (by clearing it and setting specific
      // dimensions) so that the base64 images (to be compared) are of the same
      // width/height
      resetCanvas($demoCanvas);
      // Retrieve the data URI of the blank canvas so we can later detect if the
      // canvas has been drawn on
      const demoImageBlank = $demoCanvas[0].toDataURL();
      const code = $codeBlock.getCodeContents();
      runDemo(code, $demoCanvas);
      // If something was drawn on demo canvas (or if code draws
      // asynchronously),
      if (
        $demoCanvas[0].toDataURL() !== demoImageBlank ||
        asyncPattern.test(code)
      ) {
        // Append canvas below code block
        $codeBlock.after($demoContainer);
        $codeBlock.addClass('has-demo');
        // Add to code block a button that allows user to try code in Sandbox
        $codeBlock.addSandboxTryButton();
      }
    });
  }

  // Allow user to re-run demo via button
  $body.on('click', '.demo-rerun', function () {
    const $rerunButton = $(this);
    const $demoCanvas = $rerunButton.next('canvas');
    reRunDemo($demoCanvas);
  });

  makeExamplesDemoable();

  $(document).on('astro:after-swap', function () {
    makeExamplesDemoable();
  });

  var lastWindowWidth = window.innerWidth;
  $(window).on('resize', () => {
    $('canvas').each((c, canvas) => {
      const $canvas = $(canvas);
      const $codeBlock = $canvas.parent().prev('.expressive-code');
      const newWindowWidth = window.innerWidth;
      // Only resize canvas and re-run demo if window width has changed (do
      // nothing if only height has changed)
      if (lastWindowWidth !== newWindowWidth) {
        lastWindowWidth = newWindowWidth;
        reRunDemo($canvas);
      }
    });
  });
});
