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
    // router.forEach(function (prop) {
    //   if (router.hasOwnProperty(prop)) {
    //     if (typeof prop === 'function') {
    //       switch (prop) {
    //       case: 'initialize'
    //       case: '_swapView'
    //       case: 'welcome'
    //         break;
    //       default:
    //
    //       }
    //     }
    //   }
    //})
    Backbone.history.start();
  }
};

$(function() {
  CrowdSurfing.initialize();
})
