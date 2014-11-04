CrowdSurfing.Views.Welcome = Backbone.View.extend({
  template: JST["welcome"],

  events: {
    "click a.sign-up" : "signUpModal",
    "click a.sign-in" : "signInModal",
    "click section.wax-paper" : "removeModals",
    "click input#user-username" : "activateUsername",
    "click input#fake-password" : "activatePassword",
    "blur input#user-username" : "deactivateUsername",
    "blur input#user-password" : "deactivatePassword"
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
  },

  activateUsername: function(event) {
    var $unInput = $(event.currentTarget);

    if(!$unInput.hasClass("active")) {
      $unInput.addClass("active");
      $unInput.val("");
    }
  },

  activatePassword: function(event) {
    var $pwInput = $(event.currentTarget);

    if($pwInput.is("#fake-password")) {
      $pwInput.addClass("hidden");
      $("input#user-password").addClass("active");
      $("input#user-password").focus();
    }
  },

  deactivateUsername: function(event) {
    var $unInput = $(event.currentTarget);

    if ($unInput.val().length > 0) {
      return;
    }

    if($unInput.hasClass("active")) {
      $unInput.removeClass("active");
      $unInput.val("Username");
    }
  },

  deactivatePassword: function(event) {
    var $pwInput = $(event.currentTarget);

    if ($pwInput.val().length > 0) {
      return;
    }

    if($pwInput.hasClass("active")) {
      $pwInput.removeClass("active");
      $("input#fake-password").removeClass("hidden");
    }
  }

});
