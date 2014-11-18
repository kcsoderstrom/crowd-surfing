CrowdSurfing.Views.AttendanceMenu = Backbone.View.extend({
  template: function() {return ""},
  tagName: "section",
  className: "invite-menu transient active",

  events: {
    "click li" : "toggleAttendance"
  },

  initialize: function (options) {
    this.eventId = options.eventId;
    this.attending = options.attending;
  },

  render: function() {
    this.$el.html('<ul><li id="true">Yes</li><li id="false">No</li></ul>');

    this.$el.css("top", (this.yVal - 57) + 'px');
    this.$el.css("left", (this.xVal) + 'px');
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
    var $li = $(event.currentTarget);
    var is_attending = $li.attr("id");
    var evt = this.model;

    if(this.model.get("is_attending") != is_attending) {
      this.model.save({is_attending: is_attending}, {
        success: function() {
          evt.collection.fetch();
        }
      });
    }
    this.remove();
  },

  leave: function() {
    this.remove();
  }

});
