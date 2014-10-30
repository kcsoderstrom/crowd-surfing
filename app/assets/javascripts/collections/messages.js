CrowdSurfing.Collections.Messages = Backbone.Collection.extend({
  url: "/api/messages",

  getOrFetch: function(id) {
    var model;
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new CrowdSurfing.Models.Message();
      model.set({id: id});
      model.fetch();
      return model;
    }
  }

});