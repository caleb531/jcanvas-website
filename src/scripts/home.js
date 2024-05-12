import $ from 'jquery';
import './global.js';

$(document).ready(function () {
  // Add "Try in Sandbox" button to homepage example code
  $('#home-example').find('.expressive-code').addSandboxTryButton();
});
