CrowdSurfing.Views.AdvancedMenu = Backbone.View.extend({
  template: function(args) {
    var filepath = this.modelsName + "/advancedMenu";
    return JST[filepath].bind(this, args);
  },
  tagName: "section",
  className: "adv-menu",

  initialize: function(options) {
    this.modelsName = options.modelsName;
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  leave: function() {
    this.remove();
  }

});
