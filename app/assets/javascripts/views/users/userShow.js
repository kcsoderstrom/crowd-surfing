CrowdSurfing.Views.UserShow = Backbone.View.extend({
  template: JST["users/userShow"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");  //TODO change that in the css and all
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
})