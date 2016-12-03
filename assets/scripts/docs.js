(function() {
$(document).ready(function() {

// Add anchor link to every subsection for easy access later
$('#docs-section').find('h3').each(function () {
  $(this).append('<a href="#' + this.id + '" class="subsection-link"></a>');
});

});
}());
