CrowdSurfing.Views.MessageNew = Backbone.View.extend({
  template: JST["messages/messageNew"],

  events: {
    "click button" : "sendMessage"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");  //TODO change that in the css and all
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  sendMessage: function(event) {
    event.preventDefault();
    var msg = new CrowdSurfing.Models.Message();
    var $form = $("form.message-new");
    var formData = $form.serializeJSON();
    msg.set(formData);
    msg.save({}, {
      success: function() {
        Backbone.history.navigate("/messages", {trigger: true});
      }
    });
  }
})