(function($) {
$(document).ready(function() {

// Hide images on page
$('.images').hide();

var $$ = {
  editor: $('#sandbox-editor'),
  run: $('#sandbox-run'),
  canvases: $('#sandbox-canvases'),
  ncanvases: $('#sandbox-ncanvases'),
  console: $('#sandbox-console'),
  defaultCode: $('#sandbox-default-code')
};

// Default sandbox state
var defaultSandboxState = {
  code: $$.defaultCode.html().replace(/(^\s+)|(\s+$)/gi, ''),
  cursor: {
    line: 0,
    ch: 0
  },
  ncanvases: 1
};
var DEFAULT_CANVAS_WIDTH = 320;

// Change number of canvases with which to test
function changeCanvasCount() {
  var ncanvases = Number($$.ncanvases.val());
  var height = Math.round((450 + 2) / ncanvases);
  $$.canvases.empty();
  for (var i = 0; i < ncanvases; i += 1) {
    var $canvasContainer = $('<div>');
    $canvasContainer.prop({
      class: 'canvas-container'
    });
    var $canvas = $('<canvas>');
    $canvas.prop({
      width: DEFAULT_CANVAS_WIDTH,
      height: height
    });
    $canvasContainer.append($canvas);
    $$.canvases.append($canvasContainer);
  }
}

// Load last-saved sandbox state (or defaults if the don't exist)
function loadSandboxState() {
  // Load sandbox settings from local storage
  var sandboxState = sessionStorage.getItem('jcanvas-sandbox');
  sandboxState = JSON.parse(sandboxState);
  if (sandboxState !== null) {
    sandboxState = $.extend({}, defaultSandboxState, sandboxState);
  } else {
    sandboxState = defaultSandboxState;
  }
  return sandboxState;
}

function setSandboxSettings(codemirror, sandboxState) {
  codemirror.setValue(sandboxState.code);
  codemirror.setCursor(sandboxState.cursor);
  $$.ncanvases.val(sandboxState.ncanvases);
  changeCanvasCount();
}

// Save code to storage for current page
function saveSandboxState(codemirror) {
  var sandboxState = {
    code: codemirror.getValue(),
    cursor: codemirror.getCursor(),
    ncanvases: $$.ncanvases.val()
  };
  sessionStorage.setItem('jcanvas-sandbox', JSON.stringify(sandboxState));
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
function runCode(codemirror) {
  resetCanvases();
  $$.editor.removeClass('error');
  $$.console.html('');
  try {
    new Function(codemirror.getValue())();
  } catch(error) {
    // Report any errors to the editor
    $$.editor.addClass('error');
    $$.console.html('Error: ' + error.message);
    console.error(error.stack || String(error));
  }
}

// Initialize the sandbox CodeMirror editor
function initSandboxEditor(sandboxState) {

  // Initialize code editor
  var codemirror = CodeMirror($$.editor[0], {
    lineNumbers: true,
    indentUnit: 2
  });

  setSandboxSettings(codemirror, sandboxState);

  // Add CSS class for when editor is focused
  codemirror.on('focus', function(obj) {
    $$.editor.addClass('focused');
  });
  codemirror.on('blur', function(obj) {
    $$.editor.removeClass('focused');
  });

  $('div.CodeMirror').on('keydown', function(event) {
    if (event.metaKey || event.ctrlKey) {
      // Press ctrl+enter to test
      if (event.which === 13) {
        resetCanvases();
        runCode(codemirror);
        saveSandboxState(codemirror);
        return false;
      }
    }
  });

  // Click "Run" button to run code
  $$.run.on('click', function() {
    resetCanvases();
    runCode(codemirror);
    saveSandboxState(codemirror);
  });

  // Change number of canvases in sandbox when dropdown value is changed
  $$.ncanvases.on('change', function() {
    changeCanvasCount();
    runCode(codemirror);
    saveSandboxState(codemirror);
  });

  // Focus window on desktop browsers
  if (window.ontouchstart === undefined) {
    codemirror.focus();
  }

  runCode(codemirror);

}

var sandboxState = loadSandboxState();
initSandboxEditor(sandboxState);

});
}(jQuery));
