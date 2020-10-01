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
        var skills = [];
        $.each( data, function( _, repo ) {
          if (repo.name.search("skill-") == 0) {
            repo.real_name = repo.name.substring(6)
            skills.push(repo)
          }
        });

        // Update page
        append_modules(sortByKey(skills, "stargazers_count"), "#skills")


      });

    }
  });

})(); // end script
