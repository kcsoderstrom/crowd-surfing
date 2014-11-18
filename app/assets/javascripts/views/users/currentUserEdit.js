CrowdSurfing.Views.CurrentUserEdit = Backbone.View.extend({
  template: JST["users/currentUserEdit"],
  className: "user-show",
  tagName: "section",

  events: {
    "click button.update" : "updateProfile",
    "change .my-photo-upload": "handleFile",
    "click img.photo" : "selectProfilePhoto",
    "click button.show-images" : "showImages"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");
    this.showAlbum = false;
  },

  render: function() {
    this.model.set({pic: ""});
    this.$el.html(this.template({model: this.model}));
    if($("div.wax-paper").hasClass("shady")) {
      this.showImages();
    }
    return this;
  },

  updateProfile: function(event) {
    event.preventDefault();
    var $form = this.$(".edit-profile");
    var formData = $form.serializeJSON();
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
      var $form = view.$(".edit-profile");
      var formData = $form.serializeJSON();
      console.log(formData);
      view.model.set(formData);
      view.model.set('pic', this.result);
      view.model.save();
    }
    reader.readAsDataURL(file);
  },

  selectProfilePhoto: function(event) {
    $selectedPhoto = $(event.currentTarget);
    $("img.selected").removeClass("selected");
    $selectedPhoto.addClass("selected");
    $("input#profile-photo").val($selectedPhoto.data("id"));
    var that = this;

    var $form = this.$(".edit-profile");
    var formData = $form.serializeJSON();
    this.model.save(formData);
  },

  showImages: function(event) {
    if(event) {
      event.preventDefault();
    }

    $(".modal").addClass("active");
    $(".wax-paper").addClass("shady");
  },

  leave: function() {
    this.remove();
  }

})
