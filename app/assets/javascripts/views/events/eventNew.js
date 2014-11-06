CrowdSurfing.Views.EventNew = Backbone.View.extend({
  template: JST["events/eventNew"],

  events: {
    "click button" : "createEvent",
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.autofillSubview = new CrowdSurfing.Views.ContactAutofill(
                                { receiver: localStorage.getItem("reqToName"),
                                  id: "req-receiver",
                                  name: "receiver" });
  },

  render: function() {
    this.$el.html(this.template({model: this.model, receiver: this.receiver}));
    return this;
  },

  createEvent: function(event) {
    event.preventDefault();
    var evt = new CrowdSurfing.Models.Event();
    var $form = $("form.event-new");
    var formData = $form.serializeJSON();
    evt.set(formData);
    evt.save({}, {
      success: function() {
        Backbone.history.navigate("/messages", {trigger: true});
      }
    });
  },

  leave: function() {
    localStorage.removeItem("msgToName");
    this.autofillSubview.leave();
    this.remove();
  }

})
