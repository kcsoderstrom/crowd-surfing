CrowdSurfing.Models.Event = Backbone.Model.extend({
  urlRoot: "/api/events",

  parse: function(jsonResp) {
    if(jsonResp.request_receivers) {
      this.request_receivers = jsonResp.request_receivers;
      delete jsonResp.request_receivers;
    }
    if(jsonResp.invitation_receivers) {
      this.invitation_receivers = jsonResp.invitation_receivers;
      delete jsonResp.invitation_receivers;
    }
    if(jsonResp.invitation_senders) {
      this.invitation_senders = jsonResp.invitation_senders;
      delete jsonResp.invitation_senders;
    }

    if(jsonResp.attendees) {
      this.attendees = jsonResp.attendees;
      delete jsonResp.attendees;
    }
    
    return jsonResp;
  }
})
