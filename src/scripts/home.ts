import $ from 'jquery';
import './global.js';

$(function () {
  // Add "Try in Sandbox" button to homepage example code
  $('#home-example').find('.expressive-code').addSandboxTryButton();
});
