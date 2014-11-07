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
    this.$el.html("<ul><li>Yes</li><li>No</li><li>Maybe</li></ul>");
    this.$("div").html(this.attending);

    this.$el.css("top", (this.yVal + 20) + 'px');
    this.$el.css("left", (this.xVal + 20) + 'px');
    this.$el.css("position", "absolute");
    this.$el.css("background", "white");
    this.$el.css("border-radius", "5px");
    this.$el.css("padding", "5px");
    this.$el.css("border", "1px solid #B3B3B3");
    this.$("li").hover(function(event) {
      $(this).css("background", event.type === "mouseenter" ? "gray" : "transparent");
    });
    return this;
  },

  toggleAttendance: function(event) {

  },

  leave: function() {
    this.remove();
  }

});
