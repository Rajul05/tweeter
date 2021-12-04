/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const renderTweets = function(tArray) {
  //loops through tweets
  for (let key in tArray){
    //calls createTweetElement for each tweet
    const tweet = createTweetElement(tArray[key]);
    //takes return value and appends to tweet container
   $("#tweets-container").prepend(tweet);
  }
}
const createTweetElement = function(tweetObj) {
  //tweet structure
  const tweet = (`<article class="tweet">
  <header>
      <img src="${(tweetObj.user.avatars)}">
      <span class = "profile-name"> ${(tweetObj.user.name)} </span>
      <p class = "tweeter-handle">${(tweetObj.user.handle)}</p>
    </header>
      <span>${(tweetObj.content.text)}
      </span>
      <footer>
        <p class = "since">
          <script> 
            const post_date = '${(tweetObj.created_at)}';
            document.querySelectorAll(".since") = format(post_date); </script>
        </p>
        <p class = "tweet-icons"> 
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
        </p>
      </footer>
    </article>`);
  //return <article> with HTML structure
  return tweet;
} 
$( document ).ready(function() {
  const error = document.querySelector('div');
  //prevent default form submission
  $('#submit-tweet').submit(function(event) {
    //check null or empty or char >140 , do not submit and alert user, replace alert with proper error message
    var x = document.getElementById("tweet-text").value;
    if (x == "") {
      $( "div" ).removeClass( "hidden" );
      $("#errors").slideDown("slow");
      $( "i.fa-exclamation-triangle" ).text(" A Blank Tweet? Who will read it ?");
      // alert("Text cannot be Empty!");
        return false;
    }
    else if (x.length > 140) {      
      $( "div" ).removeClass( "hidden" );
      //alert("Too much Text !!");
      $( "i.fa-exclamation-triangle" ).text(" Too Long. Plz keep it short and sweet !!");
      //      fa-exclamation-triangle
      return false;
    }
     else {
    //prevent default click and ajax post
    event.preventDefault();  
    //console.log('Prevented');
    //serialize data , for server
    let postTweet =  $( this ).serialize();
    //AJAX POST request to post to server 
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: postTweet
    })
    .then(function (results) {
      // function to perform 
      console.log(results); 
      let see = document.getElementById("tweets-container").innerHTML;
      //console.log(see);
      console.log(postTweet);
      loadTweets();
       
    });
     

  
    }
});
  //Load tweets via ajax get request from server '/tweets'
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (results) {
    // function to perform 
    console.log(results);  
    renderTweets(results);  
    });
  }
  loadTweets();
});



// Test / driver code (temporary)

