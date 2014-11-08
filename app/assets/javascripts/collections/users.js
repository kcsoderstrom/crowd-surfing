CrowdSurfing.Collections.Users = CrowdSurfing.Collections.Collection.extend({
  url: "/api/users",
  model: CrowdSurfing.Models.User,

  //TODO: Do I ever even use this??
  parse: function(jsonResp) {
    if(jsonResp.current_user) {
      this.currentUser = new CrowdSurfing.Models.User(jsonResp.current_user, {parse: true});
      delete jsonResp.current_user;
    }

    return jsonResp.users;
  }

});
