CrowdSurfing.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/requestNew"],
  tagName: "section",
  className: "new-request-modal modal", //TODO change that in the css and all

  events: {
    "submit form" : "sendRequest"
  },

  initialize: function(options) {
    if(options) {
      this.receiver = options.receiver;
    }
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill({ model: this.model, receiver: this.receiver });
    this.currentUser = options.currentUser;
  },

  render: function() {
    this.$el.html(this.template({ evts: this.model.events || [], receiver: this.receiver }));
    this.$("div").html(this.contactAutofill.render().$el);
    return this;
  },

  sendRequest: function(event) {
    event.preventDefault();
    var req = new CrowdSurfing.Models.Request();
    var that = this;

    var details = $("input#req-details").val();
    var eventId = $("select#req-evt").val();

    this.contactAutofill.userIds.forEach(function(receiverId){
      req = new CrowdSurfing.Models.Request();
      req.save({
        event_id: eventId,
        receiver_id: receiverId,
        details: details,
        invitation: false }, {
          success: function() {
            $(".wax-paper").removeClass("shady");
            that.$el.removeClass("active");
            // TODO maybe show a success somewhere?
          }
        })
    });
  },

  leave: function() {
    this.contactAutofill.leave();
    this.remove();
  }
})
