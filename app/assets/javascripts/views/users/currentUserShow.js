CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
    this.$el.addClass("current-user-for-real");
  },

  render: function() {
    var that = this;
    this.$el.html(this.template({model: this.model, collection: this.collection}));
    return this;
  },

  subviews: function() {
    if(!this._subviews) {
      this._subviews = [];
    }
    return this._subviews;
  }


});