import { EditorView } from '@codemirror/view';
import 'jcanvas';
import $ from 'jquery';
import { createEditorState, createEditorView } from './editor.js';
import './global.js';

$(document).ready(function () {
  const $$ = {
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
  const defaultSandboxState = {
    code: $$.defaultCode.html()?.replace(/(^\s+)|(\s+$)/gi, '') || '',
    cursor: {
      line: 0,
      ch: 0
    },
    ncanvases: 1
  };
  const CANVAS_WIDTH = 320;
  const CANVAS_BORDER_WIDTH = 1;

  // Change number of canvases with which to test
  function changeCanvasCount(ncanvases) {
    const editorHeight = $$.editorArea.outerHeight();
    const canvasHeight = Math.round(
      editorHeight / ncanvases - 2 * CANVAS_BORDER_WIDTH
    );
    $$.canvases.empty();
    for (let i = 0; i < ncanvases; i += 1) {
      const $canvasContainer = $('<div>');
      $canvasContainer.prop({
        class: 'canvas-container'
      });
      const $canvas = $('<canvas>');
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
    let sandboxState = sessionStorage.getItem('jcanvas-sandbox');
    sandboxState = JSON.parse(sandboxState);
    if (sandboxState !== null) {
      sandboxState = $.extend({}, defaultSandboxState, sandboxState);
    } else {
      sandboxState = defaultSandboxState;
    }
    return sandboxState;
  }

  function getSandboxState(editorView) {
    return {
      code: editorView.state.doc.toString(),
      cursorOffset: editorView.state.selection.main.head,
      ncanvases: $$.ncanvases.val()
    };
  }

  // Save sandbox state to session storage for current page
  function saveSandboxState(editorView) {
    const sandboxState = getSandboxState(editorView);
    sessionStorage.setItem('jcanvas-sandbox-v2', JSON.stringify(sandboxState));
  }

  // Run code
  function runCode(editorView) {
    const $canvasElems = $$.canvases.find('canvas');
    if ($canvasElems.length === 0) {
      return;
    }
    $canvasElems.resetCanvases();
    $$.editor.removeClass('error');
    $$.console.html('');
    try {
      new Function(
        $.jCanvasCorrectImagePaths(editorView.state.doc.toString())
      )();
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
    const editorState = createEditorState({
      doc: sandboxState.code,
      extensions: [
        EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged || viewUpdate.selectionSet) {
            saveSandboxState(viewUpdate.view);
          }
        })
      ]
    });
    const editorView = createEditorView(editorState, $$.editor[0]);

    // Convert persisted pos object to a CM6 offset
    const pos = sandboxState.cursor;
    const offset = editorState.doc.line(pos.line + 1).from + pos.ch;
    editorView.dispatch({
      selection: { anchor: offset, head: offset }
    });
    $$.ncanvases.val(sandboxState.ncanvases);
    changeCanvasCount(sandboxState.ncanvases);

    // // Add CSS class for when editor is focused
    // codemirror.on('focus', function (obj) {
    //   $$.editor.addClass('focused');
    // });
    // codemirror.on('blur', function (obj) {
    //   $$.editor.removeClass('focused');
    // });
    // // Insert spaces when tab key is pressed
    // codemirror.setOption('extraKeys', {
    //   Tab: function (cm) {
    //     const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
    //     cm.replaceSelection(spaces);
    //   }
    // });

    // $('div.CodeMirror').on('keydown', function (event) {
    //   if (event.metaKey || event.ctrlKey) {
    //     // Press ctrl+enter to test
    //     if (event.which === 13) {
    //       runCode(codemirror);
    //       saveSandboxState(codemirror);
    //       return false;
    //     }
    //   }
    // });

    // // Add event bindings to sandbox controls
    // $$.run.on('click', function () {
    //   runCode(codemirror);
    //   saveSandboxState(codemirror);
    // });
    // $$.duplicate.on('click', function () {
    //   $.spawnNewSandbox(getSandboxState(codemirror));
    // });
    $$.ncanvases.on('change', function (event) {
      changeCanvasCount(Number(event.target.value));
      runCode(editorView);
      saveSandboxState(editorView);
    });

    // // Focus window on desktop browsers
    // if (window.ontouchstart === undefined) {
    //   codemirror.focus();
    // }

    // // Fix an issue where the editor cursor/selection would be mispositioned
    // // visually
    // requestAnimationFrame(function () {
    //   requestAnimationFrame(function () {
    //     requestAnimationFrame(function () {
    //       codemirror.refresh();
    //     });
    //   });
    // });

    runCode(editorView);
  }

  const sandboxState = loadSandboxState();
  initSandboxEditor(sandboxState);
});
