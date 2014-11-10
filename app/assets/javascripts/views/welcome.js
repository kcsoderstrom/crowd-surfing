CrowdSurfing.Views.Welcome = Backbone.View.extend({
  template: JST["welcome"],

  events: {
    "click a.sign-up" : "signUpModal",
    "click a.sign-in" : "signInModal",
    "click section.wax-paper" : "removeModals"
  },

  initialize: function(options) {
    options = options || {};
    this.loginErrors = options.loginErrors;
  },

  render: function() {
    this.$el.html(this.template({loginErrors: this.loginErrors}));
    return this;
  },

  signUpModal: function(event) {
    event.preventDefault();
    $(".sign-up").addClass("active");
    $("section.wax-paper").addClass("shady");
  },

  signInModal: function(event) {
    event.preventDefault();
    $(".sign-in").addClass("active");
    $("section.wax-paper").addClass("shady");
  },

  removeModals: function(event) {
    event.preventDefault();
    $(".sign-up").removeClass("active");
    $(".sign-in").removeClass("active");
    $(".wax-paper").removeClass("shady");
    this.loginErrors = false;
    this.render();
  },

  leave: function() {
    this.remove();
  }

});
