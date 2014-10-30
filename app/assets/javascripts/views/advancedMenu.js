CrowdSurfing.Views.AdvancedMenu = Backbone.View.extend({
  template: JST["advancedMenu"],

  render: function() {
    this.$el.html(this.template());
    console.log(this.$el);
    return this;
  }

});