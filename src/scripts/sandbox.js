import { Prec } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import $ from 'jquery';
import { SANDBOX_STORAGE_KEY } from './constants.js';
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
    cursorOffset: 0,
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
      $canvas.attr({
        'data-original-width': CANVAS_WIDTH,
        'data-original-height': canvasHeight
      });
      $canvasContainer.append($canvas);
      $$.canvases.append($canvasContainer);
    }
  }

  // Load last-saved sandbox state (or defaults if the don't exist)
  function loadSandboxState() {
    // Load sandbox settings from local storage
    let sandboxState = sessionStorage.getItem(SANDBOX_STORAGE_KEY);
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
    sessionStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(sandboxState));
  }

  // Run code
  function runCode(editorView) {
    const $canvasElems = $$.canvases.find('canvas');
    if ($canvasElems.length === 0) {
      return;
    }
    const $firstCanvas = $canvasElems.eq(0);
    $canvasElems.resetCanvases({
      forceReset: true,
      width: Number($firstCanvas.attr('data-original-width')),
      height: Number($firstCanvas.attr('data-original-height'))
    });
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
        }),
        Prec.highest(
          keymap.of([
            {
              key: 'Mod-Enter',
              run: (view) => {
                runCode(view);
                return true;
              }
            }
          ])
        )
      ]
    });
    const editorView = createEditorView(editorState, $$.editor[0]);

    // Convert persisted pos object to a CM6 offset
    editorView.dispatch({
      selection: {
        anchor: sandboxState.cursorOffset,
        head: sandboxState.cursorOffset
      }
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
    $$.run.on('click', function () {
      runCode(editorView);
      saveSandboxState(editorView);
    });
    $$.duplicate.on('click', function () {
      $.spawnNewSandbox(getSandboxState(editorView));
    });
    $$.ncanvases.on('change', function (event) {
      changeCanvasCount(Number(event.target.value));
      runCode(editorView);
      saveSandboxState(editorView);
    });

    // // Focus window on desktop browsers
    if (window.ontouchstart === undefined) {
      editorView.focus();
    }

    runCode(editorView);
  }

  const sandboxState = loadSandboxState();
  initSandboxEditor(sandboxState);
});
