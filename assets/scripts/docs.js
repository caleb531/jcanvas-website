(function() {
$(document).ready(function() {

var $docsSection = $('#docs-section');
// The pattern to replace jQuery canvas selectors
var canvasSelectorPattern = /\$\(['"](.*?)canvas(.*?)\1\)/gi;

// Add anchor link to every subsection for easy access later
$docsSection.find('h3').each(function () {
  $(this).append('<a href="#' + this.id + '" class="subsection-link"></a>');
});

// Add live canvas demo of each example (if example draws on canvas)
$docsSection.find('div.highlighter-rouge').each(function () {
    var $codeBlock = $(this);
    // Initialize a demo canvas
    var $demoCanvas = $(document.createElement('canvas'));
    $demoCanvas.prop({
      width: $codeBlock.width(),
      height: 250
    });
    // Retrieve the data URI of the blank canvas so we can later detect if the
    // canvas has been drawn on
    var demoImageBlank = $demoCanvas[0].toDataURL();
    var code = $codeBlock.text();
    // Inject canvas jQuery element into demo code
    code = code.replace(canvasSelectorPattern, '$demoCanvas');
    new Function(['$demoCanvas'], code)($demoCanvas);
    // If something was drawn on demo canvas, append it below code block
    if ($demoCanvas[0].toDataURL() !== demoImageBlank) {
      $codeBlock.after($demoCanvas);
      $codeBlock.addClass('has-demo');
    }
});

});
}());
