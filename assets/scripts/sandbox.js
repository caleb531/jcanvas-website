(function($) {
$(document).ready(function() {

// Hide images on page
$('.images').hide();

var $$ = {
  editor: $('#sandbox-editor'),
  run: $('#sandbox-run'),
  shareCode: $('#sandbox-shareCode'),
  canvases: $('#sandbox-canvases'),
  ncanvases: $('#sandbox-ncanvases'),
  console: $('#sandbox-console'),
  defaultCode: $('#sandbox-default-code')
};

function stripWhitespace(str) {
  str = str.replace(/(^\s+)|(\s+$)/gi, '');
  return str;
}

// Change number of canvases with which to test
function changeCanvasCount() {
  var html, i, h;
  settings.ncanvases = parseFloat($$.ncanvases.val());
  h = Math.round((450 + 2) / settings.ncanvases);
  html = '';
  for (i = 0; i < settings.ncanvases; i += 1) {
    html += '<canvas width="320" height="' + h + '"></canvas>';
  }
  $$.canvases.html(html);
  $$.canvas = $('canvas');
}

// Load last-saved sandbox settings (or defaults if the don't exist)
function loadSandboxSettings() {
  // Load sandbox settings from local storage
  settings = localStorage.getItem('jcanvas-sandbox');
  settings = JSON.parse(settings);
  if (settings !== null) {
    settings = $.extend({}, defaultSettings, settings);
  } else {
    settings = defaultSettings;
  }
  editor.setValue(settings.code);
  editor.setCursor(settings.cursor);
  $$.ncanvases.val(settings.ncanvases);
  changeCanvasCount();
}

// Save code to page hash
function saveCode() {
  // Store the chosen number of canvases
  if (window.localStorage && window.JSON) {
    settings.cursor = editor.getCursor();
    settings.code = editor.getValue();
    localStorage.setItem('jcanvas-sandbox', JSON.stringify(settings));
  }
}

// Reset all canvases to their original states
function resetCanvases() {
  $$.canvases.find('canvas').each(function () {
    var ctx = this.getContext('2d');
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.clearRect( 0, 0, this.width, this.height );
    $(this).removeLayers();
  });
}

// Run code
function runCode() {
  resetCanvases($$.canvases);
  $$.cm.removeClass('error');
  $$.console.html('');
  try {
    new Function(editor.getValue())();
  } catch(error) {
    // Report any errors to the editor
    $$.cm.addClass('error');
    $$.console.html('Error: ' + error.message);
    console.error(error.stack || String(error));
  }
  // editor.focus();
}

// Click "Run" button to run code
$$.run.on('click', function() {
  resetCanvases();
  runCode();
  saveCode();
});

// Change number of canvases in sandbox
$$.ncanvases.on('change', function() {
  changeCanvasCount();
  saveCode();
});

var defaultSettings = {
  code: stripWhitespace($$.defaultCode.html()),
  ncanvases: 1,
  cursor: {
    line: 0,
    ch: 0
  }
};

// Initialize code editor
var editor = CodeMirror($$.editor[0], {
  lineNumbers: true,
  indentUnit: 2
});

// Add CSS class for when editor is focused
editor.on('focus', function(obj) {
  $$.editor.addClass('focused');
});
editor.on('blur', function(obj) {
  $$.editor.removeClass('focused');
});

$$.cm = $('div.CodeMirror');

// Keyboard shortcut bindings
$$.cm.on('keydown', function(event) {
  if (event.metaKey || event.ctrlKey) {
    // Press ctrl+enter to test
    if (event.which === 13) {
      resetCanvases();
      runCode();
      saveCode();
      return false;
    }
  }
});

var settings;
loadSandboxSettings();
runCode();

// Focus window on desktop browsers
if (window.ontouchstart === undefined) {
  editor.focus();
}

});
}(jQuery));
