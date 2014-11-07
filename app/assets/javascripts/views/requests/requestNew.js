CrowdSurfing.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/requestNew"],
  tagName: "section",
  className: "new-request-modal currentUser", //TODO change that in the css and all

  events: {
    "submit form" : "sendRequest"
  },

  initialize: function(options) {
    this.autofill = new CrowdSurfing.Views.ContactAutofill({ model: this.model });
  },

  render: function() {
    this.$el.html(this.template({ model: this.model }));
    //this.$("div").html(this.autofill.render().$el);
    return this;
  },

  sendRequest: function(event) {
    event.preventDefault();
    var req = new CrowdSurfing.Models.Request();
    var $form = $("form.request-new");
    var formData = $form.serializeJSON();
    req.set(formData);
    req.save({}, {
      success: function() {
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  leave: function() {
    this.autofill.leave();
    this.remove();
  }
})
