CrowdSurfing.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: CrowdSurfing.Models.User,

  parse: function(jsonResp) {
    if(jsonResp.current_user) {
      this.currentUser = new CrowdSurfing.Models.User(jsonResp.current_user, {parse: true});
      delete jsonResp.current_user;
    }

    return jsonResp.users;
  },

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

});
