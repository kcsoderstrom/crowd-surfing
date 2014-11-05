CrowdSurfing.Views.ResultsSubview = Backbone.View.extend({
  template: function(args) {
    var filepath = this.modelsName + "/resultsSubview";
    return JST[filepath].bind(this, args);

  },

  initialize: function(options) {
    this.subcollection = options.subcollection;
    this.modelsName = options.modelsName;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.subcollection, "sync", this.subrender);
  },

  render: function() {
    console.log(this.template());
    this.$el.html(this.template({collection: this.collection}));
    return this;
  },

  subrender: function() {
    this.$el.append(this.template({collection: this.subcollection}));
    return this;
  },

  leave: function() {
    this.remove();
  }

});
