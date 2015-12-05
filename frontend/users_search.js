var UsersSearch = function($el) {
  this.$el = $el;
  this.$input = this.$el.find('input');
  this.$ul = this.$el.find('.users');
  this.$el.on('input', this.handleInput.bind(this));
};

UsersSearch.prototype.renderResults = function(response) {
  for(var i = 0; i < response.length; i++) {
    var element = response[i];

    this.$ul.append("<li><a href=\"/users/"+element.id+"\">"+element.username + "</a>");
    this.$ul.append("button").addClass("follow-toggle").data("userid", element.id).data("initialfollowstate", element.follows)
    this.$ul.append("<%= escape_javascript render(:partial => '../app/views/follows/form', :locals => { :user => User.find(" + element.id + ") }) %>");
    this.$ul.append("</li>");
  }

  class="follow-toggle"
  value="<%= buttontext %>"
  data-userid="<%= user.id %>"
  data-initialfollowstate="<%= initialfollowstate"

  // var listItems = "";
  // response.forEach(function(element){
  //   listItems += "<li><a href=\"/users/"+element.id+"\">"+element.username + "</a>";
  //   listItems += "<%= escape_javascript render(:partial => '../app/views/follows/form', :locals => { :user => User.find(" + element.id + ") }) %>";
  //   listItems += "</li>";
  // });
  // this.$ul.html(listItems);
};


UsersSearch.prototype.handleInput = function(e) {
  $.ajax({
    url: "/users/search",
    type: "GET",
    dataType: "json",
    data: { query: this.$input.val() },
    success: this.renderResults.bind(this)
  });
};

module.exports = UsersSearch;
