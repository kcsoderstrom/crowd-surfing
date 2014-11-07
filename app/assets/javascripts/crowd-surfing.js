window.CrowdSurfing = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    var col = new CrowdSurfing.Collections.Users;
    this.$headerEl = $("div.header");
    this.$mainEl = $("section.main");
    new CrowdSurfing.Routers.Router({$el: this.$mainEl,
                                     $headerEl: this.$headerEl,
                                     collection: col});
    Backbone.history.start();
  }
};

$(function() {
  CrowdSurfing.initialize();
})
