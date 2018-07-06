$(document).ready(function(){
  //Github
  var repoContent = "";
  var gh = new GitHub()
  var bannedRepos = [
    "sc-milo-batch",
    "sc-sso-api",
    "nightwatch-recorder-2016",
    "r7ec2",
    "r7PopUpStore"
  ];

  gh.getOrganization('canalplus').getRepos().then(function(r) {
    r.data = r.data
      // avoid parsing forks
      .filter(function(e) {
        return !e.fork && bannedRepos.indexOf(e.name) < 0;
      })
      // sort by date
      .sort(function(a, b) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

    document.querySelector('#reposLength span').innerHTML = r.data.length;
    document.querySelector('#lastCommit').innerHTML = '<a href="https://github.com/' + r.data[0].full_name + '" target="_blank"><strong><i class="fa fa-fw fa-calendar" aria-hidden="true"></i> Last commit: </strong>' + moment(r.data[0].pushed_at).fromNow() + '</a>';


    for (var i = 0; i < r.data.length; i++) {
      var language = (r.data[i].language) ? r.data[i].language : "";

      repoContent += '<div class="grid__item">';
      repoContent += '  <article class="archive__item">';
      repoContent += '    <a class="btn btn--large btn--inverse" href="' + r.data[i].html_url + '" target="_blank">' + r.data[i].name + '</a>';
      repoContent += '    <p class="archive__item-excerpt" itemprop="description"><strong><i class="fa fa-fw fa-file-code-o" aria-hidden="true"></i> ' + language + '</strong>';
      repoContent += '    <br/>' + (r.data[i].description !== null ? r.data[i].description : '') + '</p>';
      repoContent += '    <p class="archive__item-excerpt page__meta" itemprop="description"><strong><i class="fa fa-fw fa-calendar" aria-hidden="true"></i> Last commit: </strong>' + moment(r.data[i].pushed_at).fromNow() + '</p>';
      repoContent += '    </article>';
      repoContent += '</div>';
    }
    document.getElementById('content').innerHTML = repoContent;
  })

  // CAN'T SEE ME
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    document.location.href = 'https://matias.ma/nsfw/';
  });

  // ASCII ART
  var asciiText  = "\n";
      asciiText += "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n";
      asciiText += "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n";
      asciiText += "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n";
      asciiText += "@@@@@@#    ,@@@@@...;@@@@...#@@@:..@@@@@...'@@@@...@@@@@@   @@@@@@@\n";
      asciiText += "@@@@@        @@@,    @@@@    @@@   @@@@;    @@@@   @@@@@@   @@@@@@@\n";
      asciiText += "@@@@        ;@@@     @@@@    '@@   @@@@     @@@@   @@@@@@   @@@@@@@\n";
      asciiText += "@@@@   @@@@@@@@,     @@@@     @@   @@@'  `  @@@@  `@@;;;;   ;;;;@@@\n";
      asciiText += "@@@`  :@@@@@@@@   '  #@@@  `  .@   @@@   +  @@@+  ;@@           @@@\n";
      asciiText += "@@@   @@@@@@@@;  #@  .@@+  @   @  .@@+  @@  ;@@.  #@@           @@@\n";
      asciiText += "@@@   +@@@@@@@   @@   @@,  @#     '@@   @@   @@   @@@           @@@\n";
      asciiText += "@@@:   @@@@@@;        @@   @@     @@+        @@   @@@@@@@   @@@@@@@\n";
      asciiText += "@@@@    ;+`+@         @@   @@@    @@         @@   ...@@@@   @@@@@@@\n";
      asciiText += "@@@@'      @'  .@@@@  +@   @@@`   @#  `@@@+  @@      @@@@   @@@@@@@\n";
      asciiText += "@@@@@#     @   @@@@@  .@  `@@@@   @   @@@@@  ,@      @@@@   @@@@@@@\n";
      asciiText += "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n";
      asciiText += "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n";
      asciiText += "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n";
      asciiText += "\n";
      asciiText += "                                         VOUS ETES \u2260 VOUS MERITEZ +\n";
      asciiText += "\n";
      asciiText += "Interessé par la télévision de demain et ses nouveaux usages?\n";
      asciiText += "Rejoignez CANAL+, premier groupe de télévison payante en France.\n";
      asciiText += "\n";
      asciiText += "Renseignez-vous sur le groupe, nos métiers, nos offres sur\n";
      asciiText += "\n";
      asciiText += "                                http://www.vousmeritezcanalplus.com\n";
      asciiText += "\n";
      asciiText += "------------------------------------------------↑ ↑ ↓ ↓ ← → ← → b a";
  console.log(asciiText)
});
