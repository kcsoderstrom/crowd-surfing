CrowdSurfing.Views.UsersSearch = Backbone.View.extend({
  template: JST["users/usersSearch"],

  events: {
    "submit form.search" : "search",
    "click button.advanced" : "showAdvancedMenu"
  },

  initialize: function() {
    this.matches = new CrowdSurfing.Collections.SearchResults();
    this.listenTo(this.matches, "sync", this.render);
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.advMenu = new CrowdSurfing.Views.AdvancedMenu();
    //this.advMenu.render();
  },

  render: function() {
    this.$el.html(this.template({collection: this.matches}));
    this.advMenu.$el = this.$(".advMenu");
    this.advMenu.render();
    return this;
  },

  search: function(event) {
    event.preventDefault();

    var match = $(event.currentTarget).find("input").val();
    this.matches.fetch({data: {match: match}});
    this.render();
  },

  showAdvancedMenu: function(event) {
    event.preventDefault();
    if(this.advMenu.$el.hasClass("active")) {
      this.advMenu.$el.removeClass("active");
    } else {
      this.advMenu.$el.addClass("active");
    }
  }

})