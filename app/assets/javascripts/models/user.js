CrowdSurfing.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function(jsonResp) {
    if (jsonResp.messages) {
      this.messages = new CrowdSurfing.Collections.Messages(jsonResp.messages, {parse: true});
      delete jsonResp.messages;
    }

    // if (jsonResp.requests) {
    //   this.requests = new CrowdSurfing.Collections.Requests(jsonResp.requests, {parse: true});
    //   delete jsonResp.requests;
    // }

    if(jsonResp.profile) {
      this.profile = new CrowdSurfing.Models.Profile(jsonResp.profile, {parse: true});
      delete jsonResp.profile;
    }

    return jsonResp;
  }
});