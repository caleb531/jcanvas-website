// place files you want to import through the `$lib` alias in this folder.

import jQuery from 'jquery';

// TODO: eliminate the `any` type here
let jCanvasPromise: Promise<any>;

export function jCanvasLoad() {
  if (typeof window === 'undefined') {
    // In an SSR context, this promise should not resolve or reject
    return new Promise(() => {});
  }
  window.jQuery = jQuery;
  window.$ = jQuery;
  if (!jCanvasPromise) {
    jCanvasPromise = import('jcanvas');
  }
  return jCanvasPromise;
}

// Reset context all attached data for the given canvases
export function resetCanvases(canvases: HTMLCanvasElement[]) {
  canvases?.forEach((canvas) => {
    var $canvas = jQuery(canvas);
    $canvas.removeLayers();
    $canvas.clearCanvas();
    $canvas.detectPixelRatio();
  });
}

// The pattern to replace in image paths; this allows image paths in the live
// code editors (e.g. "images/fish.jpg" to be rewritten to point to the correct
// URL on the server (e.g. "assets/images/fish.jpg")
var imagePathPattern = /(images\/(?:\w+)\.(jpg|png|svg))/gi;

// Modify any image paths to point to the real images directory
export function correctImagePaths(code: string) {
    return code.replace(imagePathPattern, '/jcanvas/assets/$1');
}

// Spawn a new sandbox with the given sandbox state
export function spawnNewSandbox(sandboxState: { code: string, canvasCount: number }) {
  // Retrieve the sandbox state of the current page
  var originalSandboxState = sessionStorage.getItem('jcanvas-sandbox');
  // Temporarily overwrite the current page's sandbox state with the new sandbox
  // code so that it gets copied into the sandbox state for the spawned page
  sessionStorage.setItem('jcanvas-sandbox', JSON.stringify(sandboxState));
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
}
