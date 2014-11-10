CrowdSurfing.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/requestNew"],
  tagName: "section",
  className: "new-request-modal modal currentUser", //TODO change that in the css and all

  events: {
    "submit form" : "sendRequest"
  },

  initialize: function(options) {
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill({ model: this.model });
  },

  render: function() {
    this.$el.html(this.template({ model: this.model }));
    this.$("div").html(this.contactAutofill.render().$el);
    return this;
  },

  sendRequest: function(event) {
    event.preventDefault();
    var req = new CrowdSurfing.Models.Request();

    var details = $("input#req-details").val();
    var eventId = $("input#req-evt-id").val();

    this.contactAutofill.userIds.forEach(function(receiverId){
      req = new CrowdSurfing.Models.Request();
      req.save({
        event_id: eventId,
        receiver_id: receiverId,
        details: details,
        invitation: false }, {
          success: function() {
            Backbone.history.navigate("", {trigger: true});
          }
        })
    });
  },

  leave: function() {
    this.contactAutofill.leave();
    this.remove();
  }
})
