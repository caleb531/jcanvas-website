<script>
  import { Prec } from "@codemirror/state"
  import { keymap } from "@codemirror/view"
  import { jCanvasLoad } from '$lib';
  import CodeMirror from "svelte-codemirror-editor";
  import { minimalSetup } from "codemirror"
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

  let sandboxArea;
  let editorHeight;

  let CANVAS_WIDTH = 320;
  let CANVAS_BORDER_WIDTH = 1;
  let canvasWidth;
  let canvasHeight;

  let editorContents = defaultSandboxState.code;
  let canvasCount;
  let editorError = null;

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

  function getSandboxState() {
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
  async function runCode() {
    await jCanvasLoad();
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
    runCode();
    saveSandboxState();
  }

  function clickDuplicateButton() {
    spawnNewSandbox(getSandboxState());
  }

  function runCodeOnModEnter(codemirror, event) {
    runCode();
    saveSandboxState(codemirror);
    // Per the CodeMirror 6 KeyBinding docs, returning false will run other
    // handlers for the same key binding (causing a line break to be inserted in
    // addition to running the new code); it seems that returning undefined /
    // void will do the same, but returning `true` seems to do the trick to
    // prevent this behavior altogether (source:
    // <https://codemirror.net/docs/ref/#view.KeyBinding.run>)
    return true;
  }

  onMount(() => {
    if (!browser || !console) {
      return;
    }
    let sandboxState = loadSandboxState();
    editorContents = sandboxState.code;
    canvasCount = sandboxState.canvasCount;
    changeCanvasCount(sandboxState.canvasCount);
    runCode();
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
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div id="sandbox-editor" class:error={editorError} >
      <CodeMirror bind:value={editorContents} useTab extensions={[
        minimalSetup,
        Prec.highest(keymap.of([
          { key: 'Mod-Enter', run: runCodeOnModEnter, preventDefault: true }
        ]))
      ]} lang={javascript()}  />
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
