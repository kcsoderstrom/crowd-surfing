CrowdSurfing.Views.CurrentUserEdit = Backbone.View.extend({
  template: JST["users/currentUserEdit"],

  events: {
    "click button" : "updateProfile",
    "change .my-photo-upload": "handleFile",
    "click img.photo" : "selectProfilePhoto"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");
  },

  render: function() {
    if(this.model.pic) {
      console.log("trying to delete ok")
      delete this.model.pic; // Clean out the file
    }
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  updateProfile: function(event) {
    event.preventDefault();
    var that = this;
    var $form = this.$(".edit-profile");
    var formData = $form.serializeJSON();

    console.log(formData);

    this.model.save(formData, {
      success: function() {
        Backbone.history.navigate("/", {trigger: true});
      },

      error: function() {
        console.log("didn't work ok");
      }
    })
  },

  handleFile: function (event) {
    var file = event.currentTarget.files[0];
    var view = this;
    var reader = new FileReader();
    reader.onload = function(event) {
      // note that this isn't saving
      view.model.set('pic', this.result);
    }
    reader.readAsDataURL(file);
  },

  selectProfilePhoto: function(event) {
    $selectedPhoto = $(event.currentTarget);
    $("img.selected").removeClass("selected");
    $selectedPhoto.addClass("selected");
    $("input#profile-photo").val($selectedPhoto.data("id"));
  },

  leave: function() {
    this.remove();
  }

})
