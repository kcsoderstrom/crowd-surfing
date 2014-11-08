CrowdSurfing.Collections.SearchResults = CrowdSurfing.Collections.Collection.extend({
  url: function() {
    return "api/" + this.modelsName + "/search";
  },

  initialize: function(options) {
    options = options || {};
    this.modelsName = options.modelsName;
  }
});
