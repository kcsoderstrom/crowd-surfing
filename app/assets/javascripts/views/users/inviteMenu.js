CrowdSurfing.Views.InviteMenu = Backbone.View.extend({
  template: JST["users/inviteMenu"],
  tagName: "section",

  initialize: function () {
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill();
  },

  render: function() {
    this.$el.html(this.template());
    this.$el.append(this.contactAutofill.render().$el);
    this.$el.addClass("invite-menu");
    return this;
  },

  leave: function() {
    this.remove();
  }

});
