$(document).ready(function() {
  var maxlength = 140;
  $("textarea").on("input", function() {
    var length = maxlength - ($(this).val().length);
    var counter = $(this).parent().find('.counter');
    counter.text(length);
    if (length < 0) {
      counter.addClass('redmax')
    } else {
      counter.removeClass('redmax');
      $(".error p").fadeOut(500);
    }
  });
});