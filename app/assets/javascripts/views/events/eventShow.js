CrowdSurfing.Views.EventShow = Backbone.View.extend({
  template: JST["events/eventShow"],
  tagName: "section",
  className: "user-show",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  leave: function() {
    this.remove();
  }

})
