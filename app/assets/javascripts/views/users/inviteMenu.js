CrowdSurfing.Views.InviteMenu = Backbone.View.extend({
  template: JST["users/inviteMenu"],
  tagName: "section",

  events: {
    "click button" : "sendInvitations"
  },

  initialize: function (options) {
    this.eventId = options.eventId;
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill();
  },

  render: function() {
    this.$el.html(this.template());
    this.$el.append(this.contactAutofill.render().$el);
    this.$el.addClass("invite-menu");
    return this;
  },

  sendInvitations: function(event) {
    event.preventDefault();
    // ok I need the event's id OK I HAVE IT it is
    this.eventId;
    // I also need all the ids of all the people in the list OK I HAVE IT IT IS
    this.contactAutofill.userIds.forEach(function(receiverId){
      inv = new CrowdSurfing.Models.Request();
      inv.save({
        receiver_id: receiverId,
        details: "",
        status: "",
        invitation: true },
        {success: function() {console.log("I guess it saved?");}})
    });
    // this is where I will send invitations once I fix that in the controller
    // the controller will accept the event id and the user ids; is that all?
  },

  leave: function() {
    this.contactAutofill.remove();
    this.remove();
  }

});
