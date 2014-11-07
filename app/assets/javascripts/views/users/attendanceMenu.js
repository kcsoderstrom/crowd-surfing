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
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    console.log("rendering?");
    this.$el.html("<div>HEYY LOOK AT MEEEE</div>");
    this.$("div").html(this.attending);
    return this;
  },

  toggleAttendance: function(event) {

  },

  leave: function() {
    this.remove();
  }

});
