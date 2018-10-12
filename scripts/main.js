const collapseBtn = document.getElementById('collapseBtn');
const navigation = document.getElementsByClassName('navigation');

collapseBtn.addEventListener('click', function(e){
  collapseBtn.setAttribute('aria-pressed', e.target.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  // navigation[0].setAttribute('id', navigation[0].getAttribute('id') === 'collapse' ? '' : 'collapse');
  navigation[0].setAttribute('style', navigation[0].getAttribute('style') === 'display: block;' ? '' : 'display: block;');

  
});

////////////////////////////////////////////////////////////////////////
// Script for populating latest blog posts from Medium as found in blog.js
//

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
                                + "<a href=\"" + item.link + "\" target=\"_blank\">"
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

////////////////////////////////////////////////////////////////////
// Script for populating modules from GitHub as found in modules.js
//

(function(){ //begin script

  var append_modules = function(list, target){
    $.each(list, function( _, repo ) {
      $( "<a/>", {
        "href": repo.html_url,
        "title": repo.description,
        html: repo.real_name
      }).appendTo( target );
    });
  }

  var sortByKey = function(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  $(document).ready(function() {
    if ( $(".modules").length ) {

      // Load repos from GitHub Api
      $.getJSON( "https://api.github.com/orgs/opsdroid/repos?per_page=100", function( data ) {
        var connectors = [];
        var databases = [];
        var skills = [];
        $.each( data, function( _, repo ) {
          if (repo.name.search("skill-") == 0) {
            repo.real_name = repo.name.substring(6)
            skills.push(repo)
          }
          if (repo.name.search("database-") == 0) {
            repo.real_name = repo.name.substring(9)
            databases.push(repo)
          }
          if (repo.name.search("connector-") == 0) {
            repo.real_name = repo.name.substring(10)
            connectors.push(repo)
          }
          console.log(repo)
        });

        // Update page
        append_modules(sortByKey(connectors, "stargazers_count"), "#connectors")
        append_modules(sortByKey(databases, "stargazers_count"), "#databases")
        append_modules(sortByKey(skills, "stargazers_count"), "#skills")


      });

    }
  });

})(); // end script
