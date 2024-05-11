(function ($) {
  $(document).ready(function () {
    var $$ = {
      editorArea: $('#sandbox-editor-area'),
      editor: $('#sandbox-editor'),
      run: $('#sandbox-run'),
      duplicate: $('#sandbox-duplicate'),
      canvases: $('#sandbox-canvases'),
      ncanvases: $('#sandbox-ncanvases'),
      console: $('#sandbox-console'),
      defaultCode: $('#sandbox-default-code')
    };

    // Defaults and constants
    var defaultSandboxState = {
      code: $$.defaultCode.html().replace(/(^\s+)|(\s+$)/gi, ''),
      cursor: {
        line: 0,
        ch: 0
      },
      ncanvases: 1
    };
    var CANVAS_WIDTH = 320;
    var CANVAS_BORDER_WIDTH = 1;

    // Change number of canvases with which to test
    function changeCanvasCount(ncanvases) {
      var editorHeight = $$.editorArea.outerHeight();
      var canvasHeight = Math.round(
        editorHeight / ncanvases - 2 * CANVAS_BORDER_WIDTH
      );
      $$.canvases.empty();
      for (var i = 0; i < ncanvases; i += 1) {
        var $canvasContainer = $('<div>');
        $canvasContainer.prop({
          class: 'canvas-container'
        });
        var $canvas = $('<canvas>');
        $canvas.prop({
          width: CANVAS_WIDTH,
          height: canvasHeight
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
      changeCanvasCount(sandboxState.ncanvases);
    }

    function getSandboxState(codemirror) {
      return {
        code: codemirror.getValue(),
        cursor: codemirror.getCursor(),
        ncanvases: $$.ncanvases.val()
      };
    }

    // Save sandbox state to session storage for current page
    function saveSandboxState(codemirror) {
      var sandboxState = getSandboxState(codemirror);
      sessionStorage.setItem('jcanvas-sandbox', JSON.stringify(sandboxState));
    }

    // Run code
    function runCode(codemirror) {
      $$.canvases.find('canvas').resetCanvases();
      $$.editor.removeClass('error');
      $$.console.html('');
      try {
        new Function($.jCanvasCorrectImagePaths(codemirror.getValue()))();
      } catch (error) {
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
      codemirror.on('focus', function (obj) {
        $$.editor.addClass('focused');
      });
      codemirror.on('blur', function (obj) {
        $$.editor.removeClass('focused');
      });
      // Insert spaces when tab key is pressed
      codemirror.setOption('extraKeys', {
        Tab: function (cm) {
          var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces);
        }
      });

      $('div.CodeMirror').on('keydown', function (event) {
        if (event.metaKey || event.ctrlKey) {
          // Press ctrl+enter to test
          if (event.which === 13) {
            runCode(codemirror);
            saveSandboxState(codemirror);
            return false;
          }
        }
      });

      // Add event bindings to sandbox controls
      $$.run.on('click', function () {
        runCode(codemirror);
        saveSandboxState(codemirror);
      });
      $$.duplicate.on('click', function () {
        $.spawnNewSandbox(getSandboxState(codemirror));
      });
      $$.ncanvases.on('change', function () {
        changeCanvasCount(Number(this.value));
        runCode(codemirror);
        saveSandboxState(codemirror);
      });

      // Focus window on desktop browsers
      if (window.ontouchstart === undefined) {
        codemirror.focus();
      }

      // Fix an issue where the editor cursor/selection would be mispositioned
      // visually
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            codemirror.refresh();
          });
        });
      });

      runCode(codemirror);
    }

    var sandboxState = loadSandboxState();
    initSandboxEditor(sandboxState);
  });
})(jQuery);
