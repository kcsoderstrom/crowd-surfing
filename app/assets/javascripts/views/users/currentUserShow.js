CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
});