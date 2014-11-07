CrowdSurfing.Views.EventsIndex = Backbone.View.extend({
  template: JST["events/eventsIndex"],
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    return this;
  },

  leave: function() {
    this.remove();
  }

})
