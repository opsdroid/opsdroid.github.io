(function(){ //begin script

  // keep track of when the next message should be displayed
  var timeCounter;

  function pad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  function uuid(len) {
    // Generate a unique id
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    var output = '';
    for (var i = 0; i < len; i++) {
    	var pos = Math.floor(Math.random() * chars.length);
    	output += chars.substring(pos,pos+1);
    }
    return output;
  }

  function generate_message(user, message, id){
    // generate a message div element to be appended to the chat
    var d = new Date();
    var time = d.getHours() + ":" + pad(d.getMinutes(), 2);
    var profile = {"opsdroid": "https://github.com/opsdroid/style-guidelines/raw/master/logos/logo-dark.png",
                   "user": "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm"};
    return "<div id=\"" + id + "\" class=\"message " + user + "\"><img class=\"profile\" src=\"" + profile[user] + "\"><h4>" + user + " <small>" + time + "</small></h4><p>" + message + "</p></div>";
  }

  function add_message(user, message, timeout){
    // show "user is typing", then add a message, then fade it out again
    setTimeout(function(){
      $(".chat-demo").append("<div class=\"typing\">" + user + " is typing...</div>");
    }, timeout);
    setTimeout(function(){
      var id = uuid(5)
      $(".typing").remove();
      $(".chat-demo").append(generate_message(user, message, id));
      $("#" + id).delay(7000).fadeOut(1000, function() { $(this).remove()});
    }, 500 + timeout);
  }

  function add_chat(message, response) {
    // add a message from the user followed by a response from opsdroid
    add_message("user", message, timeCounter);
    add_message("opsdroid", response, timeCounter + 1000);
    timeCounter += 5000;
  }

  function play_chat(){
      timeCounter = 1000;
      add_chat("Hi opsdroid!", "Hello user");
      add_chat("How are you?", "Good thanks! My load average is 0.2, 0.1, 0.1.");
      add_chat("When did you last see John?", "I last saw John 2 hours ago.");
      add_chat("What is the status of myorg/repo#376?", "3/3 checks passed. Merging can be performed automatically.");
      add_chat("Merge myorg/repo#376", "myorg/repo#376 merged successfully.");
      add_chat("Thanks opsdroid", "You're welcome! 😀");
      return timeCounter;
  }

  $(document).ready(function() {
    if ( $(".chat-demo").length ) {

      // preload avatars
      var opsdroidavatar = new Image();
      opsdroidavatar.src = "https://github.com/opsdroid/style-guidelines/raw/master/logos/logo-dark.png"
      var useravatar = new Image();
      useravatar.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=60&d=mm"

      // play the chat once and get the length of time the chat will play for
      var interval = play_chat();

      // set an interval to repeat that chat, with a small delay between each loop
      setInterval(function(){
        play_chat();
      }, interval + 5000);

    }
  });

})(); // end script
