CrowdSurfing.Views.Header = Backbone.View.extend({
  template: JST["header"],

  events: {
    "mouseup .user-img" : "toggleDropdown",
    "mouseup ul.dropdown" : "toggleDropdown",
    "click" : "removeDropdown"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  toggleDropdown: function() {
    $dropdown = $("ul.dropdown");

    if($dropdown.hasClass("active")) {
      $dropdown.removeClass("active");
    } else {
      $dropdown.addClass("active");
      $("body").one("mousedown", function(event) {
        if(!$(event.target).closest("ul").hasClass("transient")) {
          $(".active").removeClass("active");
        }
      });
    }

  },

  removeDropdown: function(event) {
    //if($("ul.dropdown").hasClass("active")) {
    //  $("ul.dropdown").removeClass("active");
    //}

    //TODO: something.
  },

  leave: function() {
    this.remove();
  }

});
