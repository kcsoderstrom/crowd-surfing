CrowdSurfing.Views.CurrentUserEdit = Backbone.View.extend({
  template: JST["users/currentUserEdit"],

  events: {
    "click button" : "updateProfile"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser")
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
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
  }

})