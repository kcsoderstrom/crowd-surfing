CrowdSurfing.Views.InviteMenu = Backbone.View.extend({
  template: JST["users/inviteMenu"],
  tagName: "section",

  events: {
    "click button" : "sendInvitations"
  },

  initialize: function () {
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
    // this is where I will send invitations once I fix that in the controller
  },

  leave: function() {
    this.contactAutofill.remove();
    this.remove();
  }

});
