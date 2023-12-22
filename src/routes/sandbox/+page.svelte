<script>
  import { basicSetup } from "codemirror"
  import { EditorView, keymap } from "@codemirror/view"
  import { indentWithTab } from "@codemirror/commands"
  import { javascript } from "@codemirror/lang-javascript"
  import { onMount } from 'svelte';
  import ExampleImages from '../ExampleImages.svelte';
  import jQuery from 'jquery';
  import { browser } from '$app/environment';

  // Defaults and constants
  let defaultSandboxState = {
    code: `jQuery('canvas').drawArc({
  fillStyle: '#000',
  x: 100, y: 100,
  radius: 50
});`,
    cursor: {
      line: 0,
      ch: 0
    },
    ncanvases: 1
  };
  let editorHeight;
  let CANVAS_WIDTH = 320;
  let CANVAS_BORDER_WIDTH = 1;

  let canvasWidth;
  let canvasHeight
  let canvasCount;

  let editorArea;
  let codemirror;

  let editor;
  let run;
  let duplicate;
  let canvases;
  let sandboxConsole;

  // Change number of canvases with which to test
  function changeCanvasCount(newCanvasCount) {
    canvasCount = newCanvasCount;
    runCode(codemirror);
    saveSandboxState(codemirror);
  }

  // Load last-saved sandbox state (or defaults if the don't exist)
  function loadSandboxState() {
    // Load sandbox settings from local storage
    let sandboxState = sessionStorage.getItem('jcanvas-sandbox');
    sandboxState = JSON.parse(sandboxState);
    if (sandboxState !== null) {
      sandboxState = jQuery.extend({}, defaultSandboxState, sandboxState);
    } else {
      sandboxState = defaultSandboxState;
    }
    return sandboxState;
  }

  function setSandboxSettings(sandboxState) {
    codemirror.dispatch({from: 0, to: codemirror.state.doc.length, insert: sandboxState.code});
    // codemirror.dispatch({ selection: sandboxState.cursor });
    canvasCount = sandboxState.ncanvases;
    changeCanvasCount(sandboxState.ncanvases);
  }

  function getSandboxState(codemirror) {
    return {
      code: codemirror.state.doc.toString(),
      cursor: codemirror.state.selection.main.head,
      ncanvases: canvasCount
    };
  }

  // Save sandbox state to session storage for current page
  function saveSandboxState(codemirror) {
    let sandboxState = getSandboxState(codemirror);
    sessionStorage.setItem('jcanvas-sandbox', JSON.stringify(sandboxState));
  }

  // Run code
  function runCode(codemirror) {
    canvases.find('canvas').resetCanvases();
    editor.removeClass('error');
    sandboxConsole.html('');
    try {
      new Function(jQuery.jCanvasCorrectImagePaths(codemirror.state.doc.toString()))();
    } catch(error) {
      // Report any errors to the editor
      editor.addClass('error');
      sandboxConsole.html('Error: ' + error.message);
      console.error(error.stack || String(error));
    }
  }

  // Initialize the sandbox CodeMirror editor
  function initSandboxEditor(sandboxState) {

    // Initialize code editor
    codemirror = new EditorView({
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        javascript()
      ],
      parent: editor[0]
    });

    setSandboxSettings(sandboxState);

    // Add CSS class for when editor is focused
    // codemirror.on('focus', function(obj) {
    //   editor.addClass('focused');
    // });
    // codemirror.on('blur', function(obj) {
    //   editor.removeClass('focused');
    // });
    // Insert spaces when tab key is pressed
    jQuery('div.CodeMirror').on('keydown', function(event) {
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
    run.on('click', function() {
      runCode(codemirror);
      saveSandboxState(codemirror);
    });
    duplicate.on('click', function () {
      jQuery.spawnNewSandbox(getSandboxState(codemirror));
    });

    // Focus window on desktop browsers
    if (window.ontouchstart === undefined) {
      codemirror.focus();
    }

    runCode(codemirror);

  }

  onMount(() => {
    if (!browser || !console) {
      return;
    }
    editorArea = jQuery('#sandbox-editor-area');
    editor = jQuery('#sandbox-editor');
    run = jQuery('#sandbox-run');
    duplicate = jQuery('#sandbox-duplicate');
    canvases = jQuery('#sandbox-canvases');
    // Be careful not to shadow the `console` global
    sandboxConsole = jQuery('#sandbox-console');

    let sandboxState = loadSandboxState();
    initSandboxEditor(sandboxState);
    editorHeight = editorArea.outerHeight();
  })

  $: {
    canvasWidth = CANVAS_WIDTH;
    canvasHeight = Math.round((editorHeight / canvasCount) - (2 * CANVAS_BORDER_WIDTH))
  }

</script>

<div id="sandbox-area">
  <div id="sandbox-editor-area">
    <div id="sandbox-controls">
      <div id="sandbox-button-controls">
        <button id="sandbox-run">Run</button>
        <button id="sandbox-duplicate">Duplicate</button>
      </div>
      <div id="sandbox-ncanvases-controls">
        <label for="sandbox-ncanvases">Canvases:</label>
        <select id="sandbox-ncanvases" on:change={changeCanvasCount}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </div>
    <div id="sandbox-editor"></div>
    <div id="sandbox-console"></div>
  </div>

  <div id="sandbox-canvases">
    {#each {length: canvasCount} as _, i}
      <div class="canvas-container">
        <canvas width={canvasWidth} height={canvasHeight} data-index={i}></canvas>
      </div>
    {/each}
  </div>
</div>

<ExampleImages />
