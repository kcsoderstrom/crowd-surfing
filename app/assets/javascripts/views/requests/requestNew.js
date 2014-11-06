CrowdSurfing.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/requestNew"],

  events: {
    "click button" : "sendRequest"
  },

  initialize: function(options) {
    if(options) {
      if(options.receiver) {
        this.receiver = options.receiver;
        this.listenTo(this.receiver, "sync", this.render);
      }
    }

    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.autofill = new CrowdSurfing.Views.ContactAutofill({
      receiver: localStorage.getItem("reqToName"),
      receiverId: localStorage.getItem("reqToId")
    });
  },

  render: function() {
    console.log("main thing is rendering");
    this.$el.html(this.template({model: this.model, receiver: this.receiver}));
    this.$("div").html(this.autofill.render().$el);
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
    localStorage.removeItem("reqToName");
    localStorage.removeItem("reqToId");
    this.autofill.leave();
    this.remove();
  }
})
