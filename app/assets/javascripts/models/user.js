CrowdSurfing.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function(jsonResp) {

    if (jsonResp.sent_messages) {
      this.sentMessages = new CrowdSurfing.Collections.Messages(jsonResp.sent_messages, {parse: true});
      delete jsonResp.sent_messages;
    }

    if (jsonResp.received_messages) {
      this.receivedMessages = new CrowdSurfing.Collections.Messages(jsonResp.received_messages, {parse: true});
      delete jsonResp.received_messages;
    }

    if (jsonResp.sent_requests) {
      this.sentRequests = new CrowdSurfing.Collections.Requests(jsonResp.sent_requests, {parse: true});
      delete jsonResp.sent_requests;
    }

    if (jsonResp.received_requests) {
      this.receivedRequests = new CrowdSurfing.Collections.Requests(jsonResp.received_requests, {parse: true});
      delete jsonResp.received_requests;
    }

    if(jsonResp.profile) {
      this._profile = new CrowdSurfing.Models.Profile(jsonResp.profile, {parse: true});
      delete jsonResp.profile;
    }

    if(jsonResp.contacts) {
      this.contacts = new CrowdSurfing.Collections.Users(jsonResp.contacts, {parse: true});
      delete jsonResp.contacts;
    }

    if(jsonResp.is_contact != undefined) {
      this.isContact = jsonResp.is_contact;
      delete jsonResp.is_contact;
    }

    return jsonResp;
  },

  profile: function() {
    return this._profile || { escape: function() {} };
  }
  
});
