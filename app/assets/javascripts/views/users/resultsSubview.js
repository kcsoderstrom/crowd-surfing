CrowdSurfing.Views.ResultsSubview = Backbone.View.extend({
  template: JST["users/resultsSubview"],

  initialize: function(options) {
    this.subcollection = options.subcollection;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.subcollection, "sync", this.subrender);
  },

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    return this;
  },

  subrender: function() {
    console.log("well I tried")
    console.log(this.subcollection);
    this.$el.append(this.template({collection: this.subcollection}));
    return this;
  },

  leave: function() {
    this.remove();
  }

});
