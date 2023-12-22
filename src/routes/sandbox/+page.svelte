<script>
  import CodeMirror from "svelte-codemirror-editor";
  import { basicSetup } from "codemirror"
  import { javascript } from "@codemirror/lang-javascript"
  import { onMount } from 'svelte';
  import ExampleImages from '../ExampleImages.svelte';
  import jQuery from 'jquery';
  import { browser } from '$app/environment';
  import { resetCanvases, correctImagePaths, spawnNewSandbox } from '$lib';


  // Defaults and constants
  let defaultSandboxState = {
    code: `jQuery('canvas').drawArc({
  fillStyle: '#000',
  x: 100, y: 100,
  radius: 50
});`,
    canvasCount: 1
  };
  let editorContents = defaultSandboxState.code;

  let sandboxArea;
  let editorHeight;
  let CANVAS_WIDTH = 320;
  let CANVAS_BORDER_WIDTH = 1;

  let canvasWidth;
  let canvasHeight
  let canvasCount;

  let editorArea;
  let codemirror;
  let editorError = null;

  let editor;
  let run;
  let duplicate;
  let sandboxConsole;

  function getCanvasWidth(newCanvasCount) {
    return CANVAS_WIDTH;
  }

  function getCanvasHeight(newCanvasCount) {
    return editorHeight ? Math.round((editorHeight / newCanvasCount) - (2 * CANVAS_BORDER_WIDTH)) : 0;
  }

  function resizeCanvases(newCanvasCount) {
    canvasWidth = getCanvasWidth(newCanvasCount);
    canvasHeight = getCanvasHeight(newCanvasCount);
  }

  // Change number of canvases with which to test
  function changeCanvasCount(newCanvasCount) {
    canvasCount = newCanvasCount;
    runCode();
    saveSandboxState();
    resizeCanvases(canvasCount);
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
    editorContents = sandboxState.code;
    // codemirror.dispatch({ selection: sandboxState.cursor });
    canvasCount = sandboxState.canvasCount;
    changeCanvasCount(sandboxState.canvasCount);
  }

  function getSandboxState(codemirror) {
    return {
      code: editorContents,
      canvasCount: canvasCount
    };
  }

  // Save sandbox state to session storage for current page
  function saveSandboxState() {
    let sandboxState = getSandboxState();
    sessionStorage.setItem('jcanvas-sandbox', JSON.stringify(sandboxState));
  }

  // Run code
  function runCode(codemirror) {
    resetCanvases(sandboxArea.querySelectorAll('canvas'));
    editorError = null;
    try {
      new Function(correctImagePaths(editorContents))();
    } catch(error) {
      // Report any errors to the editor
      editorError = error;
      console.error(error.stack || String(error));
    }
  }

  function clickRunButton() {
    runCode(codemirror);
    saveSandboxState(codemirror);
  }

  function clickDuplicateButton() {
    spawnNewSandbox(getSandboxState(codemirror));
  }

  // Initialize the sandbox CodeMirror editor
  function initSandboxEditor(sandboxState) {

    setSandboxSettings(sandboxState);

    // Add CSS class for when editor is focused
    // codemirror.on('focus', function(obj) {
    //   editor.addClass('focused');
    // });
    // codemirror.on('blur', function(obj) {
    //   editor.removeClass('focused');
    // });
    // Insert spaces when tab key is pressed
    jQuery('.cm-editor').on('keydown', function(event) {
      if (event.metaKey || event.ctrlKey) {
        // Press ctrl+enter to test
        if (event.which === 13) {
          runCode(codemirror);
          saveSandboxState(codemirror);
          return false;
        }
      }
    });

    runCode(codemirror);

  }

  onMount(() => {
    if (!browser || !console) {
      return;
    }
    let sandboxState = loadSandboxState();
    initSandboxEditor(sandboxState);
    editorHeight = sandboxArea.querySelector('#sandbox-editor-area').getBoundingClientRect().height;
  })

  $: {
    resizeCanvases(canvasCount);
  }

</script>

<div id="sandbox-area" bind:this={sandboxArea}>
  <div id="sandbox-editor-area">
    <div id="sandbox-controls">
      <div id="sandbox-button-controls">
        <button id="sandbox-run" on:click={clickRunButton}>Run</button>
        <button id="sandbox-duplicate" on:click={clickDuplicateButton}>Duplicate</button>
      </div>
      <div id="sandbox-canvas-count-controls">
        <label for="sandbox-canvas-count">Canvases:</label>
        <select id="sandbox-canvas-count" on:change={(event) => changeCanvasCount(Number(event.target.value))} value={canvasCount}>
          {#each {length: 3} as _, i}
            <option value={i + 1}>{i + 1}</option>
          {/each}
        </select>
      </div>
    </div>
    <div id="sandbox-editor" class:error={editorError}>
      <CodeMirror bind:value={editorContents} useTab extensions={[basicSetup]} lang={javascript()}  />
    </div>
    <div id="sandbox-console">
      {#if editorError}
        Error: {editorError?.message ?? 'Unexpeted error'}
      {/if}
    </div>
  </div>

  {#if sandboxArea}
  <div id="sandbox-canvases">
    {#each {length: canvasCount} as _, i}
      <div class="canvas-container">
        {#key `canvas-${i}-${canvasWidth}x${canvasHeight}`}
          <canvas width={canvasWidth} height={canvasHeight} data-index={i}></canvas>
        {/key}
      </div>
    {/each}
  </div>
  {/if}
</div>

<ExampleImages />
