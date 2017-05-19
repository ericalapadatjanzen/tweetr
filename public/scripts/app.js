/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  var tweetContainer = $('#tweets');

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
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
          <img class="icons" src="/images/flag.png">
          <img class="icons" src="/images/refresh.png">
          <img class="icons" src="/images/heart.png">
        </footer>
      </article>
      `;
    return $(html);
  }

  function renderTweets(tweets) {
    $("#tweet-container").empty();
    for (var ii = 0; ii < tweets.length; ii++) {
      let tweet = tweets[ii];
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
    $(".timeago").timeago();
  }
  $(".button").on("click", function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
    $("body").scrollTop(0);
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data) {
        renderTweets(data);
      }
    });
  }

  function postTweets(data) {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      success: function(data) {
        loadTweets();
        $(".counter").text("140");
      }
    });
  }
  loadTweets();
  $("form").on("submit", function(evt) {
    evt.preventDefault();
    let content = $("textarea").val();
    if (content.length === 0) {
      $("#noTweet").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    } else if (content.length > 140) {
      $("#tooMuchTweet").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    } else {
      let formData = $(this).serialize();
      postTweets(formData);
      $('textarea').val("");
    }
  });
});