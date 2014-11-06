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
    var that = this;

  console.log(this.eventId);

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
