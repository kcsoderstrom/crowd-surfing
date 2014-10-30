CrowdSurfing.Views.Header = Backbone.View.extend({
  template: JST["header"],

  events: {
    "submit form.sign-out" : "signOut"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  signOut: function(event) {
    event.preventDefault();
    console.log("heyyy");
    var session = new CrowdSurfing.Models.Session();
    session.destroy({
      success: function() {
        Backbone.history.navigate("/", {trigger: true});
      },

      error: function(data) {
        console.log(data);
      }
    });

  }
});