CrowdSurfing.Views.Header = Backbone.View.extend({
  template: JST["header"],

  events: {
    "click .user-img" : "toggleDropdown",
    "click ul.dropdown" : "toggleDropdown",
    "click document" : "removeDropdown"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    console.log("rendered with", this.model);
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  toggleDropdown: function() {
    $dropdown = $("ul.dropdown");

    if($dropdown.hasClass("active")) {
      $dropdown.removeClass("active");
    } else {
      $dropdown.addClass("active");
    }
  },

  removeDropdown: function(event) {
    //TODO: THAT'S REALLY BAD
    console.log(event.currentTarget);
  },

  leave: function() {
    this.remove();
  }

});
