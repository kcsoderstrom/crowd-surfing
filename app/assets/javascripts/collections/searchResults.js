CrowdSurfing.Collections.SearchResults = Backbone.Collection.extend({
  url: "/api/users/search",
  model: CrowdSurfing.Models.User
});