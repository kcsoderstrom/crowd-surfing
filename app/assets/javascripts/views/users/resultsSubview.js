CrowdSurfing.Views.ResultsSubview = Backbone.View.extend({
  template: JST["users/resultsSubview"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    return this;
  }

});