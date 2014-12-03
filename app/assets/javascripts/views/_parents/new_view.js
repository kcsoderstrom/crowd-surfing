CrowdSurfing.Views.New = Backbone.View.extend({
  events: {
    "click button.submit" : "createNewModel"
  },

  render: function() {
    this.$el.html(this.template({model: this.model, receiver: this.receiver}));
    this.$("div.receiver").html(this.contactAutofill.render().$el);
    return this;
  },

  leave: function() {
    localStorage.removeItem("msgToName");
    localStorage.removeItem("reqToName");
    this.contactAutofill.leave();
    this.remove();
  }

});
