import $ from 'jquery';
import './global.js';

const DEMO_CANVAS_HEIGHT = 250;

$(function () {
  const $body = $('body');
  // The pattern to replace jQuery canvas selectors
  const canvasSelectorPattern = /\$\(['"](.*?)canvas(.*?)\1\)/gi;
  // The pattern to detect if code runs asynchronous functions
  const asyncPattern = /drawImage|createPattern|(?:type: (['"])image\1)/gi;

  function addAnchorLinks() {
    // Add anchor link to every subsection for easy access later
    $body.find('h2, h3').each(function () {
      $(this).append('<a href="#' + this.id + '" class="subsection-link"></a>');
    });
  }

  // Run the given demo code on the given canvas
  function runDemo(code: string, $demoCanvas: JQuery<HTMLCanvasElement>) {
    code = $.jCanvasCorrectImagePaths(code);
    // If code contains a jCanvas method acting on a canvas element
    if (canvasSelectorPattern.test(code)) {
      // Inject canvas jQuery element into demo code
      code = code.replace(canvasSelectorPattern, '$demoCanvas');
      new Function('$demoCanvas', code)($demoCanvas);
    }
  }

  function resetCanvas($canvas: JQuery<HTMLCanvasElement>) {
    $canvas.resetCanvases({
      forceReset: true,
      width: Math.floor($canvas.parent().parent().width() || 0),
      height: DEMO_CANVAS_HEIGHT
    });
  }

  async function reRunDemo($demoCanvas: JQuery<HTMLCanvasElement>) {
    const code = $demoCanvas
      .parent()
      .prev('.expressive-code')
      .getCodeContents();
    resetCanvas($demoCanvas);
    runDemo(code, $demoCanvas);
  }

  async function makeExamplesDemoable() {
    // Add live canvas demo of each example (if example draws on canvas)
    Array.from($body.find('.expressive-code')).forEach(function (codeBlock) {
      const $codeBlock = $(codeBlock);
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
  addAnchorLinks();

  $(document).on('astro:after-swap', function () {
    makeExamplesDemoable();
    addAnchorLinks();
  });

  var lastWindowWidth = window.innerWidth;
  $(window).on('resize', () => {
    $('canvas').each((_c, canvas) => {
      const $canvas = $(canvas as HTMLCanvasElement);
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
