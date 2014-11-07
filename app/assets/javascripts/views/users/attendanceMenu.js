CrowdSurfing.Views.AttendanceMenu = Backbone.View.extend({
  template: function() {return ""},
  tagName: "section",
  className: "invite-menu transient active",

  events: {
    "click" : "toggleAttendance"
  },

  initialize: function (options) {
    this.eventId = options.eventId;
    this.attending = options.attending;
  },

  render: function() {
    this.$el.html("");
    this.$("div").html(this.attending);
    return this;
  },

  toggleAttendance: function(event) {

  },

  leave: function() {
    this.remove();
  }

});
