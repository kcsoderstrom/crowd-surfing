CrowdSurfing.Views.InviteMenu = Backbone.View.extend({
  template: JST["users/inviteMenu"],
  tagName: "section",
  className: "invite-menu transient active",

  events: {
    "click button" : "sendInvitations"
  },

  initialize: function (options) {
    this.eventId = options.eventId;
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill();
  },

  render: function() {
    this.$el.html(this.template());
    this.$("div").html(this.contactAutofill.render().$el);
    return this;
  },

  sendInvitations: function(event) {
    event.preventDefault();
    var that = this;

    this.contactAutofill.userIds.forEach(function(receiverId){
      inv = new CrowdSurfing.Models.Request();
      inv.save({
        event_id: that.eventId,
        receiver_id: receiverId,
        details: "",
        status: "",
        invitation: true }, {
          success: function() {
            Backbone.history.navigate("", {trigger: true});
          }
        })
    });
  },

  leave: function() {
    this.contactAutofill.remove();
    this.remove();
  }

});
