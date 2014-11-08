CrowdSurfing.Collections.Collection = Backbone.Collection.extend({
  getOrFetch: function(id) {
    var model;
    var that = this;
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new CrowdSurfing.Models.User();
      model.set({id: id});
      model.fetch({
        success: function() {
          that.add(model);
        }
      });
      return model;
    }
  }
})
