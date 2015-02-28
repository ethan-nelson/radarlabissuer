$(function() {
  $('form.my_form').submit(function(event) {
    var form = $(this);
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize()
    }).done(function() {
      // Optionally alert the user of success here...
    }).fail(function() {
      // Optionally alert the user of an error here...
    });
    event.preventDefault(); // Prevent the form from submitting via the browser.
  });
});
