CrowdSurfing.Views.AdvancedMenu = Backbone.View.extend({
  template: JST["users/advancedMenu"],
  tagName: "section",
  className: "adv-menu",

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  leave: function() {
    this.remove();
  }

});
