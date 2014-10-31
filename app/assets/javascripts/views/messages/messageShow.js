CrowdSurfing.Views.MessageShow = Backbone.View.extend({
  template: JST["messages/messageShow"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser"); //TODO: this is terrible
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
});