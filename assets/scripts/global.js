(function() {
$(document).ready(function() {

// Add jQuery method which adds a "Try in Sandbox"
$.fn.addSandboxTryButton = function () {
  this.prepend('<button class="try-in-sandbox edge-button">Try in Sandbox</button>');
};

// Allow user to test any example in Sandbox
$('main').on('click', '.try-in-sandbox', function () {
  // Retrieve code for this example from neighboring <pre>
  var code = $(this).next().text();
  // Retrieve the sandbox state of the current page
  var originalSandboxState = sessionStorage.getItem('jcanvas-sandbox');
  // Temporarily overwrite the current page's sandbox state with the new sandbox
  // code so that it gets copied into the sandbox state for the spawned page
  sessionStorage.setItem('jcanvas-sandbox', JSON.stringify({
    code: code
  }));
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
});

});
}());
