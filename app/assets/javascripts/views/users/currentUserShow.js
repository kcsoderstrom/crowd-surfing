CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],
  className: "I-want-this-centered",

  events: {
    "click a.invite" : "openInviteView",
    "click button.delete-contact" : "removeContact",
    "click button.attendance" : "openAttendanceView",
    "click button.delete-event" : "deleteEvent",
    "click a#location" : "searchByLocation",
    "dblclick li.time" : "editProperty",
    "dblclick li.date" : "editProperty",
    "blur input.time" : "updateProperty",
    "blur input.date" : "updateProperty",

    "change .my-photo-upload": "handleFile",
    "click img.photo" : "selectEventPhoto",
    "dblclick .event-photo" : "showImages",
    "click #upload-photo" : "inputFile"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    if(this.model.contacts) {
      this.listenTo(this.model.contacts, "add", this.render);
    }
    if(this.model.sentRequests) {
      this.listenTo(this.model.sentRequests, "add", this.render);
    }
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

    $("body").on("mousedown", function(event) {
      if(!$(event.target).closest(".invite-menu").hasClass("transient")) {
        $(".invite-menu.transient").removeClass("active");
      }
    })
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
    this.attendanceView.yVal = event.pageY - $("section.events-index").offset().top + 57;

    this.$el.append(this.attendanceView.render().$el);

    $("body").on("mousedown", function(event) {
      if(!$(event.target).closest(".invite-menu").hasClass("transient")) {
        $(".invite-menu.transient").removeClass("active");
      }
    })

  },

  deleteEvent: function(event) {
    var $li = $(event.currentTarget).closest("ul").closest("li");
    var evt = this.eventsCollection.getOrFetch($li.data("eventId"));
    evt.destroy();
  },

  searchByLocation: function(event) {
    event.preventDefault();
    Backbone.history.navigate("search?location=" + this.model.profile().get("location"), {trigger: true});
  },

  editProperty: function(event) {
    var $li = $(event.currentTarget);
    $li.find("div").addClass("hidden");
    $li.find("input").removeClass("hidden");
    $li.find("input").focus();
  },

  updateProperty: function(event) {
    var $li = $(event.currentTarget).closest("li");
    var property = $(event.currentTarget).attr("class");

    $li.find("div").removeClass("hidden");
    $(event.currentTarget).addClass("hidden");
    var $li = $(event.currentTarget).closest("ul").closest("li");
    var evt = this.eventsCollection.getOrFetch($li.data("eventId"));

    var newVal = $(event.currentTarget).val();

    if(property === "time") {
      evt.save({time: newVal}, {});
    } else if(property === "date") {
      evt.save({date: newVal}, {});
    }
  },

  handleFile: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    var evt = new CrowdSurfing.Models.Event();
    evt.set('id', this.selectedEventId);

    var reader = new FileReader();
    reader.onload = function(event) {
      evt.set('pic', this.result);
      evt.save({}, {success: function() {that.eventsCollection.fetch()}});
    }
    reader.readAsDataURL(file);
  },

  selectEventPhoto: function(event) {
    var that = this;
    $selectedPhoto = $(event.currentTarget);
    $("img.selected").removeClass("selected");
    $selectedPhoto.addClass("selected");

    var evt = new CrowdSurfing.Models.Event();
    evt.set('id', this.selectedEventId);
    evt.set('photo_id', $selectedPhoto.data("id"))

    evt.save({}, {success: function() {that.eventsCollection.fetch()}});
  },

  showImages: function(event) {
    this.selectedEventId = $(event.currentTarget).closest("li").data("event-id");

    $(".modal").addClass("active");
    $(".wax-paper").addClass("shady");
  },

  inputFile: function(event) {
    document.getElementById("photo-input").click();
  },

  leave: function() {
    this.attendanceView && this.attendanceView.leave();
    this.inviteView && this.inviteView.leave();
    this.remove();
  }

});
