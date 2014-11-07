CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],
  className: "current-user-for-real",

  events: {
    "click a.invite" : "openInviteView",
    "click button.delete-contact" : "removeContact"
  },

  initialize: function() {
    this.listenTo(this.model, "sync update", this.render);

    this.eventsCollection = new CrowdSurfing.Collections.Events();
    this.eventsView = new CrowdSurfing.Views.EventsIndex({collection: this.eventsCollection});
  },

  render: function() {
    this.eventsCollection.fetch();
    var that = this;
    this.$el.html(this.template({model: this.model}));
    this.$("section.events-index").append(this.eventsView.render().$el);
    return this;
  },

  openInviteView: function(event) {
    event.preventDefault();

    if(this.inviteView) {
      this.inviteView.leave();
    }

    var $li = $(event.currentTarget).closest("li");

    this.inviteView = new CrowdSurfing.Views.InviteMenu({eventId: $li.data("eventId")});
    $li.append(this.inviteView.render().$el);
  },

  removeContact: function(event) {
    event.preventDefault();
    $button = $(event.currentTarget)
    var user = this.model;

    user.save({contact_user_id: $button.data("id"), delete_contact: true},
              {success: function() { user.fetch(); }});

  },

  leave: function() {
    this.inviteView && this.inviteView.leave();
    this.remove();
  }


});
