$(document).ready(function() {
  // --- our code goes here ---
  //const char = document.querySelector('textarea');
  $("textarea").on('input', function() {
   // let inputTweetLength = document.getElementById("tweet-text").value.length;
    //document.getElementsByClassName('counter')[0].innerHTML= 140-inputTweetLength;
    var charLeft = 140-this.value.length;
    document.getElementsByClassName('counter')[0].innerHTML= charLeft;
    if (charLeft <0 ) {
      document.getElementsByClassName('counter')[0].style.color = "red";
    }
  });
});