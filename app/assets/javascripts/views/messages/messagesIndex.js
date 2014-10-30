CrowdSurfing.Views.MessagesIndex = Backbone.View.extend({
  template: JST["messages/messagesIndex"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.$el.addClass("currentUser"); //TODO: this is terrible
  },

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    return this;
  }
});