/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



var tweetContainer =  $('#tweets');

function renderTweets(tweets){
  $("#tweet-container").empty();
  for(var ii = 0; ii < tweets.length; ii++){
    let tweet = tweets[ii];
    $("#tweet-container").prepend(createTweetElement(tweet));


  }
  $(".timeago").timeago();
  // $('.timeago').css('color', 'red');
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement(tweet){
  // console.log("tweet", tweet);
  var $tweet = $('<article>').addClass('tweet');
  const date = (new Date(tweet.created_at)).toISOString();

  const html = `
    <article>
      <header class="header">
        <img class="avatar" src="${tweet.user.avatars.small}">
        <h2 class="name">${escape(tweet.user.name)}</h2>
        <p class="handle">${escape(tweet.user.handle)}</p>
      </header>
      <p class="content">${escape(tweet.content.text)}</p>
      <footer class="footer">
        <abbr class="timeago" title="${date}"></abbr>
      </footer>
    </article>
    `
    // console.log(new Date(tweet.created_at))
  return $(html);
}




function loadTweets(){
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (data) {
      renderTweets(data);
    }
  });
}



$(document).ready(function() {
  loadTweets();
   // $(".timeago").timeago();
   // $('.timeago').css('color', 'red');
   // console.log($.timeago(new Date()))

  $("form").on("submit", function (evt) {
    evt.preventDefault();
    let content = $("textarea").val();
    if( content.length === 0){
      alert("please enter a tweet");
    } else if(content.length > 140){
      alert("Your tweet is too long");
    } else {
      let formData = $(this).serialize();
      postTweets(formData);
      $('textarea').val("");
    }
  });


  function postTweets(data){
    $.ajax({
      url: '/tweets',
      method: 'POST',
      datatype: 'json',
      data: data,
      success: loadTweets
    });
  }

});


$(".new-tweet").hide();

$(".button").on("click", function(){
  $('.new-tweet').slideToggle();
  $("textarea").focus();
})


// var $j = $.noConflict();
// $j(document).ready(function() {
//   $j("abbr.timeago").timeago();
// });


