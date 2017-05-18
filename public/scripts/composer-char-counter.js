 $(document).ready(function () {
  var maxlength = 140;
  $("textarea").on("input", function (){
    var length = maxlength - ($(this).val().length);
    let counter = $(this).parent().find('.counter');
    counter.text(length);
    if( length <= 0){
      counter.addClass('redmax')
    }else{
     counter.removeClass('redmax');
    }

    $("input").on("click", function(){
      $('.counter').text('140');
    });
  });
});


