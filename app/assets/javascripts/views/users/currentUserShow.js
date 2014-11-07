CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],
  className: "current-user-for-real",

  events: {
    "click a.invite" : "openInviteView",
    "click button.delete-contact" : "removeContact",
    "click button.attendance" : "openAttendanceView"
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

    if(this.attendanceView) {
      this.$el.append(this.attendanceView.render().$el);
    }
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

  openAttendanceView: function(event) {
    event.preventDefault();

    if(this.attendanceView) {
      this.attendanceView.leave();
    }

    var $li = $(event.currentTarget).closest("ul").closest("li");

    var evt = this.eventsCollection.getOrFetch($li.data("eventId"));
    this.attendanceView = new CrowdSurfing.Views.AttendanceMenu({model: evt});

    this.attendanceView.xVal = event.pageX;
    this.attendanceView.yVal = event.pageY;

    this.$el.append(this.attendanceView.render().$el);

  },

  leave: function() {
    this.attendanceView && this.attendanceView.leave();
    this.inviteView && this.inviteView.leave();
    this.remove();
  }

});
