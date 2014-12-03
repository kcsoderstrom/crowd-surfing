CrowdSurfing.Views.EventNew = CrowdSurfing.Views.New.extend({
  template: JST["events/eventNew"],
  className: "I-want-this-centered",

  events: {
    "click button.show-images" : "showImages",
    "change .my-photo-upload": "handleFile",
    "click img.photo" : "selectEventPhoto",
    "dblclick .event-photo" : "showImages",
    "click #upload-photo" : "inputFile",
    "click button:submit" : "createNewModel"
  },

  initialize: function(options) {
    if(options) {
      this.currentUser = options.currentUser;
    }
    this.listenTo(this.model, "sync", this.render);
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill(
                                { receiver: localStorage.getItem("reqToName"),
                                  id: "req-receiver",
                                  name: "receiver" });
  },

  render: function() {
    this.$el.html(this.template({model: this.model, photos: this.currentUser.photos}));
    this.$("div.receiver").html(this.contactAutofill.render().$el);
    return this;
  },

  showImages: function(event) {
    if(event) {
      event.preventDefault();
    }

    $(".modal").addClass("active");
    $(".wax-paper").addClass("shady");
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

  createNewModel: function(event) {
    event.preventDefault();
    var that = this;

    var evt = new CrowdSurfing.Models.Event();
    var $form = $("form.event-new");
    var formData = $form.serializeJSON();
    evt.set(formData);
    evt.save({}, {
      success: function() {

        that.contactAutofill.userIds.forEach(function(receiverId){
          inv = new CrowdSurfing.Models.Request();
          inv.save({
            event_id: that.eventId,
            receiver_id: receiverId,
            details: "",
            status: "",
            invitation: true })
          });

        Backbone.history.navigate("", {trigger: true});
      }
    });
  }

})
