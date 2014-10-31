CrowdSurfing.Views.AdvancedMenu = Backbone.View.extend({
  template: JST["users/advancedMenu"],

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});