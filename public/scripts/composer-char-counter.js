
// counts down the amount of characters user can type into the text area. Turns red if a negative number
$(document).ready(function() {
  var maxlength = 140;
  $("textarea").on("input", function() {
    var contentLength = $(this).val().length;
    var length = maxlength - contentLength;
    var counter = $(this).closest(".new-tweet").find('.counter');
    counter.text(length);
    if (length < 0) {
      counter.addClass('redmax');
    } else {
      counter.removeClass('redmax');
      $(".error p").fadeOut(500);
    }
  });
});
