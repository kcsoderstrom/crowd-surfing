CrowdSurfing.Collections.Collection = Backbone.Collection.extend({
  getOrFetch: function(id) {
    var that = this;
    if (model = this.get(id)) {
      model.fetch();
    } else {
      model = new CrowdSurfing.Models.User();
      model.set({id: id});
      model.fetch({
        success: function() {
          that.add(model);
        }
      });
    }
    return model;
  }
})
