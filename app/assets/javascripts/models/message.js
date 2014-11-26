CrowdSurfing.Models.Message = Backbone.Model.extend({
  urlRoot: '/api/messages',
  parse: function(jsonResp) {
    if(jsonResp.receiver_id || jsonResp.sender_id) {
      this._user = new CrowdSurfing.Models.User();
      this._user.set({name: jsonResp.receiver_name || jsonResp.sender_name, id: jsonResp.receiver_id || jsonResp.sender_id, location: jsonResp.location});
      delete jsonResp.sender_id
      delete jsonResp.sender_name
      delete jsonResp.receiver_id
      delete jsonResp.receiver_name
    }

    if(jsonResp.receiver || jsonResp.sender) {
      var inInbox = jsonResp.receiver.id === window.currentUserId;
      var userId = (inInbox ? jsonResp.sender.id : jsonResp.receiver.id );
      var userName = (inInbox ? jsonResp.sender.name : jsonResp.receiver.name );
      var location = (inInbox ? jsonResp.sender.location : jsonResp.receiver.location );
      this._user = new CrowdSurfing.Models.User();
      this._user.set({name: userName, id: userId, location: location});
      delete jsonResp.sender;
      delete jsonResp.receiver;
    }
    return jsonResp;
  },

  user: function() {
    if(!this._user) {
      this._user = new CrowdSurfing.Models.User();
      this._user.set(this.get("user"));
    }
    return this._user;
  }
});
