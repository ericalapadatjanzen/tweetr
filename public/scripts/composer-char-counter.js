 $(document).ready(function () {
  var maxlength = 140;
  $("textarea").on("keyup", function (){
    var length = maxlength - ($(this).val().length);
    $(this).parent().find('.counter').text(length);
    if( length <= 0){
      $(this).parent().find('.counter').addClass('redmax')
    } else {
      $(this).parent().find('.counter').removeClass('redmax');
    }
 });
});


