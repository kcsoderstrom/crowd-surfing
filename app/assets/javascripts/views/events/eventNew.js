CrowdSurfing.Views.EventNew = CrowdSurfing.Views.New.extend({
  template: JST["events/eventNew"],
  // className: "common-modal",
  className: "I-want-this-centered",

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill(
                                { receiver: localStorage.getItem("reqToName"),
                                  id: "req-receiver",
                                  name: "receiver" });
  },

  createNewModel: function(event) {
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
  }

})
