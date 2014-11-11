CrowdSurfing.Collections.Collection = Backbone.Collection.extend({
  getOrFetch: function(id) {
    var model = new CrowdSurfing.Models.User();
    var that = this;
    if (model = this.get(id)) {
      model.fetch();
    } else {
      console.log("CHECK THE VARIABLES ON", this)
      model = new CrowdSurfing.Models.User();
      model.set({id: id});
      model.fetch({
        success: function() {
          // var maybeAlreadyExists;

          // if(maybeAlreadyExists = that.get(id)) {
          //   //model.cid = maybeAlreadyExists.cid;
          //   return;
          // }
          that.add(model);
        }
      });

      return model;
    }
  }
})
