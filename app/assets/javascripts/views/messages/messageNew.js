CrowdSurfing.Views.MessageNew = Backbone.View.extend({
  template: JST["messages/messageNew"],
  className: "currentUser", //TODO change that in the css and all

  events: {
    "click button" : "sendMessage"
  },

  initialize: function(options) {

    this.listenTo(this.model, "sync", this.render);
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill(
                                { receiver: localStorage.getItem("msgToName"),
                                  id: "msg-receiver",
                                  name: "receiver" });
  },

  render: function() {
    this.$el.html(this.template({model: this.model, receiver: this.receiver}));
    this.$("div.msg-receiver").html(this.contactAutofill.render().$el);
    return this;
  },

  sendMessage: function(event) {
    event.preventDefault();
    var subject = $("input#msg-subject").val();
    var body = $("textarea#msg-body").val();

    this.contactAutofill.userIds.forEach(function(receiverId){
      msg = new CrowdSurfing.Models.Message();
      msg.save({
        receiver_id: receiverId,
        subject: subject,
        body: body }, {
          success: function() {
            Backbone.history.navigate("", {trigger: true});
          }
        })
    });
  },

  leave: function() {
    localStorage.removeItem("msgToName");
    this.contactAutofill.leave();
    this.remove();
  }

})
