
$(document).ready(function() {
  var tweetContainer = $('#tweets');

  // Makes sure people can't add code into text inputs
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // creates elements on the page for each tweet
  function createTweetElement(tweet) {
    var date = (new Date(tweet.created_at)).toISOString();
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

  // Renders the tweets via loop and adds them to the top of the page
  function renderTweets(tweets) {
    var tweetContainer = $("#tweet-container");
    tweetContainer.empty();
    for (var i = 0; i < tweets.length; i++) {
      var tweet = tweets[i];
      tweetContainer.prepend(createTweetElement(tweet));
    }

    // Used for formating the date. Must be called after appending tweets to the dom.
    $(".timeago").timeago();
  }

  // slides the tweet entry box down when you click the compose button + a few UX tweeks
  $(".button").on("click", function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
    $("body").scrollTop(0);
  });

  // loads the tweets via ajax on success calls on the renderTweets function
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data) {
        renderTweets(data);
      }
    });
  }

  // sends the tweet data to the server on success calls on the loadTweets function
  function saveTweet(data) {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      success: function(data) {
        loadTweets();
        $('textarea').val("");
        $(".counter").text("140");
      }
    });
  }

  loadTweets();

  // error alerts for no tweet or too long tweet else calls on postTweet function. The text area and char counter are reset
  $("form").on("submit", function(evt) {
    evt.preventDefault();
    var content = $("textarea").val();
    if (content.length === 0) {
      $("#noTweet").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    } else if (content.length > 140) {
      $("#tooMuchTweet").fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    } else {
      var formData = $(this).serialize();
      saveTweet(formData);
    }
  });
});
