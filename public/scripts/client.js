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

$(document).ready(function() {
  // Updates the text in counter
  const TWEET_SIZE = 140;
  $("#tweet-text").on('keyup', function(event) {
    let textLength = $(this).val().length;

    let counterEl = $(".counter");
    counterEl.text(TWEET_SIZE - textLength);

    if (textLength > 140) {
      counterEl.css("color", "red");
      $(this).css("border-bottom", "1px solid red");
    } else {
      counterEl.css("color", "black");
      $(this).css("border-bottom", "1px solid #333");
    }

    autoExpand(document.querySelector('textarea'));

  });

});


