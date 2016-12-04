(function() {
$(document).ready(function() {

var $docsSection = $('#docs-section');
// The pattern to replace jQuery canvas selectors
var canvasSelectorPattern = /\$\(['"](.*?)canvas(.*?)\1\)/gi;
// The pattern to replace image paths
var imagePathPattern = /(images\/(?:\w+)\.jpg)/gi;
// The pattern to detect if code runs asynchronous functions
var asyncPattern = /drawImage|createPattern|(?:type: (['"])image\1)/gi;

// Add anchor link to every subsection for easy access later
$docsSection.find('h3').each(function () {
  $(this).append('<a href="#' + this.id + '" class="subsection-link"></a>');
});

// Run the given demo code on the given canvas
function runDemo(code, $demoCanvas) {
  // Modify any image paths to point to the real images directory
  code = code.replace(imagePathPattern, '/jcanvas/assets/$1');
  // Inject canvas jQuery element into demo code
  code = code.replace(canvasSelectorPattern, '$demoCanvas');
  new Function(['$demoCanvas'], code)($demoCanvas);
}

// Resets the demo canvas by resetting its context and removing all layers
function resetDemo($demoCanvas) {
  $demoCanvas.removeLayers();
  $demoCanvas.clearCanvas();
}

// Add live canvas demo of each example (if example draws on canvas)
$docsSection.find('div.highlighter-rouge').each(function () {
    var $codeBlock = $(this);
    // Initialize a demo canvas
    var $demoCanvas = $(document.createElement('canvas'));
    $demoCanvas.prop({
      width: $codeBlock.width(),
      height: 250
    });
    // Create canvas container (will also contain demo controls like re-run)
    $demoContainer = $('<div class="demo-container">');
    $demoContainer.append('<button class="demo-rerun">Re-run</button>');
    $demoContainer.append($demoCanvas);
    // Retrieve the data URI of the blank canvas so we can later detect if the
    // canvas has been drawn on
    var demoImageBlank = $demoCanvas[0].toDataURL();
    var code = $codeBlock.text();
    runDemo(code, $demoCanvas);
    // If something was drawn on demo canvas (or if code draws asynchronously),
    // append canvas below code block
    if ($demoCanvas[0].toDataURL() !== demoImageBlank || asyncPattern.test(code)) {
      $codeBlock.after($demoContainer);
      $codeBlock.addClass('has-demo');
    }
});

// Allow user to re-run demo via button
$docsSection.on('click', '.demo-rerun', function () {
  var $rerunButton = $(this);
  var code = $rerunButton.parent().prev().text();
  var $demoCanvas = $rerunButton.next();
  resetDemo($demoCanvas);
  runDemo(code, $demoCanvas);
});

});
}());
