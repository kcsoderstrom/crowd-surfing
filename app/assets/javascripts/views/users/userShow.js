CrowdSurfing.Views.UserShow = Backbone.View.extend({
  template: JST["users/userShow"],

  tagName: "section",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("user-show");
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
})