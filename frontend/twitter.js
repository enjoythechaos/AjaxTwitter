var FollowToggle = require('./follow_toggle.js');
var UsersSearch = require('./users_search.js');

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    console.log("doc ready");
    $('button.follow-toggle').each(function (idx, element) {
      new FollowToggle($(element));
    });
    $('.users-search').each(function(idx, element) {
      new UsersSearch($(element));
    });
  }
};
