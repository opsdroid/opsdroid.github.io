// This script is used in main.js - it's here for maintainability proposes

(function(){ //begin script

  $(document).ready(function() {
    var blog_posts = $(".blog-posts")
    if ( blog_posts.length ) {

      // Load Medium feed using 3rd-party API because Medium doesn't support client-side RSS feed retrieval
      // See https://github.com/Medium/medium-api-docs/issues/51#issuecomment-216080183 for more details
      $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'json',
        data: {
          rss_url: 'https://medium.com/feed/opsdroid'
        }
      }).done(function (response) {
        if ( response.status != 'ok' ) { throw response.message; }
        for ( var i in response.items ) {
          if ( i < 3 ) {
            var item = response.items[i];
            blog_posts.append("<div class=\"blog-post\">"
                              + "<p class=\"date\">" + item.pubDate.slice(0,10) + "</p>"
                              + "<p class=\"link\">"
                                + "<a href=\"" + item.link + "\" target=\"_blank\" rel=\"noopener\" rel=\"noreferrer\">"
                                  + item.title
                                + "</a>"
                              + "</p>"
                            + "</div>")
          }
        }
      });
    }
  });
})(); // end script
