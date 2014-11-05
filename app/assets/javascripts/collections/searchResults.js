CrowdSurfing.Collections.SearchResults = Backbone.Collection.extend({
  url: function() {
    return "api/" + this.modelsName + "/search";
  },

  initialize: function(options) {
    options = options || {};
    this.modelsName = options.modelsName;
  }
});
