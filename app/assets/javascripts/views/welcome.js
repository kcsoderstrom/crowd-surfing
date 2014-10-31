CrowdSurfing.Views.Welcome = Backbone.View.extend({
  template: JST["welcome"],

  events: {
    "click a.sign-up" : "signUpModal",
    "click a.sign-in" : "signInModal",
    "click section.wax-paper" : "removeModals",
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  signUpModal: function(event) {
    event.preventDefault();
    $(".sign-up").addClass("active");
    $(".wax-paper").addClass("shady");
  },

  signInModal: function(event) {
    event.preventDefault();
    $(".sign-in").addClass("active");
    $(".wax-paper").addClass("shady");
  },

  removeModals: function(event) {
    event.preventDefault();
    $(".sign-up").removeClass("active");
    $(".sign-in").removeClass("active");
    $(".wax-paper").removeClass("shady");
  }
});