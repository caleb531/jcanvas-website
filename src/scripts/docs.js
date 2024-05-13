import 'jcanvas';
import $ from 'jquery';
import './global.js';

$(document).ready(function () {
  var $body = $('body');
  // The pattern to replace jQuery canvas selectors
  var canvasSelectorPattern = /\$\(['"](.*?)canvas(.*?)\1\)/gi;
  // The pattern to detect if code runs asynchronous functions
  var asyncPattern = /drawImage|createPattern|(?:type: (['"])image\1)/gi;

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

  function getCodeContents($codeBlock) {
    return $codeBlock
      .find('.ec-line')
      .map((l, line) => $(line).text())
      .get()
      .join('\n');
  }

  function makeExamplesDemoable() {
    // Add live canvas demo of each example (if example draws on canvas)
    $body.find('.expressive-code').each(function () {
      var $codeBlock = $(this);
      // Initialize a demo canvas
      var $demoCanvas = $(document.createElement('canvas'));
      $demoCanvas.prop({
        width: $codeBlock.width(),
        height: 250
      });
      // Create canvas container (will also contain demo controls like re-run)
      var $demoContainer = $('<div class="demo-container">');
      $demoContainer.append(
        '<button class="demo-rerun edge-button">Re-run</button>'
      );
      $demoContainer.append($demoCanvas);
      $demoCanvas.resetCanvases();
      // Retrieve the data URI of the blank canvas so we can later detect if the
      // canvas has been drawn on
      var demoImageBlank = $demoCanvas[0].toDataURL();
      var code = getCodeContents($codeBlock);
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
    var $rerunButton = $(this);
    var code = getCodeContents($rerunButton.parent().prev('.expressive-code'));
    var $demoCanvas = $rerunButton.next();
    $demoCanvas.resetCanvases();
    runDemo(code, $demoCanvas);
  });

  makeExamplesDemoable();

  document.addEventListener('astro:after-swap', () => {
    makeExamplesDemoable();
  });
});
