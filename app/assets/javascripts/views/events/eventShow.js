CrowdSurfing.Views.EventShow = Backbone.View.extend({
  template: JST["events/eventShow"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  leave: function() {
    this.remove();
  }

})
