CrowdSurfing.Collections.Requests = Backbone.Collection.extend({
  url: "/api/requests",

  getOrFetch: function(id) {
    var model;
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new CrowdSurfing.Models.Request();
      model.set({id: id});
      model.fetch();
      return model;
    }
  }

});