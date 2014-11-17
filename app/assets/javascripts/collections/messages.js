CrowdSurfing.Collections.Messages = CrowdSurfing.Collections.Collection.extend({
  url: "/api/messages",
  parse: function(jsonResp) {
    if(jsonResp.received_messages) {
      this.received_messages = new CrowdSurfing.Collections.Messages(jsonResp.received_messages);
      delete jsonResp.received_messages;
    }

    if(jsonResp.sent_messages) {
      this.sent_messages = new CrowdSurfing.Collections.Messages(jsonResp.sent_messages);
      delete jsonResp.sent_messages;
    }

    return jsonResp;
  }
});
