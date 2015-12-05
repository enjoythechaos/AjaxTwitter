var FollowToggle = function($el) {
  this.$el = $el;
  this.userId = $el.data('userid');
  this.followState = $el.data('initialfollowstate');
  this.render();
  this.$el.on('click', this.handleClick.bind(this));
};

FollowToggle.prototype.render = function() {
  if (this.followState === 'unfollowed') {
    this.$el.html("Follow");
    this.$el.prop("disabled", false);
  } else if (this.followState === 'followed') {
    this.$el.html("Unfollow");
    this.$el.prop("disabled", false);
  } else {
    this.$el.prop("disabled", true);
    if (this.followState === 'unfollowing') {
      this.$el.html("Unfollowing");
    } else {
      this.$el.html("Following");
    }
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  if (this.followState === "followed") {
    var type = "DELETE";
    this.followState = "unfollowing";
  } else {
    var type = "POST";
    this.followState = "following";
  }
  this.render();
  $.ajax({
    url: this.userId + "/follow",
    type: type,
    dataType: "json",
    success: function() {
      this.followState = this.followState === "unfollowing" ? "unfollowed" : "followed";
      this.render();
    }.bind(this)
  });
  // Fill this out later.
  // Prevent default behavior!
  alert("You changed follow state.");
};

module.exports = FollowToggle;
