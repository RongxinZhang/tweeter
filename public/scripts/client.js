/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let autoExpand = function(field) {

  // Reset field height
  field.style.height = 'inherit';

  // Get the computed styles for the element
  let computed = window.getComputedStyle(field);

  // Calculate the height
  let height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height + 'px';

};

const createTweetElement = function(tweetObj){
  const one_day=1000*60*60*24
  let template = `<article class="tweet">
    <header>
      <img src="${tweetObj.user.avatars}" alt="profile-image">
      <h3>${tweetObj.user.name}</h3>
      <span>${tweetObj.user.handle}c</span>
    </header>
    <div class="tweet-content">${tweetObj.content.text}</div>
    <footer>
      <span class="days-ago"> ${Math.round((Date.now() - tweetObj.created_at)/one_day)} days ago</span>
      <span class="flags">
        <i class="flasg">S</i>
        <i class="retweet">R</i>
        <i class="love">L</i>
      </span>
    </footer>
  </article>`
  return template;
}

const BASE_URL = 'http://localhost:8080';

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweetData of tweets) {
    console.log(tweetData)
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet); //
  }
}

/**
 * Get tweets to /tweets endpoint
 * @param {function} cb err and response callback
 */
const loadTweets = async function(cb){
  const URL = `${BASE_URL}/tweets`
  $.ajax({
    type: "GET",
    url: URL,
  }).done((res)=>{
    cb(null, res);
  })
  .fail((err)=>{
    cb(err, null);
    // console.log("failure", err)
  })
  .always((res)=>{
    cb(null, res);
    // console.log("finished")
  });
}

/**
 * Post tweets to /tweets endpoint
 * @param {function} cb err and response callback
 */
const postTweets = function(cb){
  const URL = `${BASE_URL}/tweets`
  $(".new-tweet form").on("submit", function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: URL,
      data: $(this).serialize()
    }).done((res)=>{
      cb(null, res);
    })
    .fail((err)=>{
      cb(err, null);
    })
    .always((res)=>{
      cb(null, res);
    });
  });
}

$(document).ready(function() {
  // Updates the text in counter
  const TWEET_SIZE = 140;
  $("#tweet-text").on('keyup', function(event) {
    let textLength = $(this).val().length;

    let counterEl = $(".counter");
    counterEl.text(TWEET_SIZE - textLength);

    // Change text color depending on info
    if (textLength > 140) {
      counterEl.css("color", "red");
      $(this).css("border-bottom", "1px solid red");
    } else {
      counterEl.css("color", "black");
      $(this).css("border-bottom", "1px solid #333");
    }

    autoExpand(document.querySelector('textarea'));
  });

  loadTweets((err, res)=>{
    if(!err){
      return renderTweets(res);
    }
    console.log(err);
  })

  // Submitting new tweet
  $(".new-tweet form").on("submit", function(e){
    e.preventDefault();

    // Bind this contextd
    const conextedPostTweets = postTweets.bind(this)
    conextedPostTweets((err,res)=>{
      console.log(err,res)
    });
  });

});


