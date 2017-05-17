/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

var tweetContainer =  $('#tweets');

function renderTweets(tweets){
  for(ii = 0; ii < tweets.length; ii++){
    let tweet = tweets[ii];
    $("#tweet-container").append(createTweetElement(tweet));
  }
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement(tweet){
  console.log("tweet", tweet);
  var $tweet = $('<article>').addClass('tweet');
  const html = `
   <article>
      <header class="header">
        <img class="avatar" src="${tweet.user.avatars.small}">
        <h2 class="name">${escape(tweet.user.name)}</h2>
        <p class="handle">${escape(tweet.user.handle)}</p>
      </header>
      <article class="content">${escape(tweet.content.text)}</article>
      <footer class="footer">
      <p class="daysAgo">${tweet.created_at}</p>
      </footer>
      </article>
      `
      return $(html);
}


renderTweets(data);

 $(document).ready(function () {
  $("textarea").on("keyup", function (evt) {
    if (evt.keyCode === 13) {
      renderTweets([{
        user: {avatars: {small: 'http://placehold.it/100x100'}, name: null, handle: null},
        content: {text: $("textarea").val()},
        created_at: Date.now()
      }])
    }
 });


});