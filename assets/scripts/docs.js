(function() {
$(document).ready(function() {

var $docsSections = $('#docs-sections');
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


// Add drawers to page where needed
$('main').find('h1').addClass('drawer-toggle');
$('.drawer-toggle').on('click', function() {
  $docsSections.toggleClass('open');
  $(this).toggleClass('open');
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
  $demoCanvas.detectPixelRatio();
}

// Add live canvas demo of each example (if example draws on canvas)
$docsSection.find('div.language-javascript').each(function () {
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
    resetDemo($demoCanvas);
    var demoImageBlank = $demoCanvas[0].toDataURL();
    var code = $codeBlock.text();
    runDemo(code, $demoCanvas);
    // If something was drawn on demo canvas (or if code draws asynchronously),
    if ($demoCanvas[0].toDataURL() !== demoImageBlank || asyncPattern.test(code)) {
      // Append canvas below code block
      $codeBlock.after($demoContainer);
      $codeBlock.addClass('has-demo');
      // Add to code block a button that allows user to try code in Sandbox
      $codeBlock.prepend('<button class="try-in-sandbox">Try in Sandbox</button>');
    }
});

// Allow user to re-run demo via button
$docsSection.on('click', '.demo-rerun', function () {
  var $rerunButton = $(this);
  var code = $rerunButton.parent().prev().find('pre').text();
  var $demoCanvas = $rerunButton.next();
  resetDemo($demoCanvas);
  runDemo(code, $demoCanvas);
});

// Allow user to test any example in Sandbox
$docsSection.on('click', '.try-in-sandbox', function () {
  // Retrieve code for this example from neighboring <pre>
  var code = $(this).next().text();
  // Retrieve the sandbox state of the current page
  var originalSandboxState = sessionStorage.getItem('jcanvas-sandbox');
  // Temporarily overwrite the current page's sandbox state with the new sandbox
  // code so that it gets copied into the sandbox state for the spawned page
  sessionStorage.setItem('jcanvas-sandbox', JSON.stringify({
    code: code
  }));
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
});

});
}());
