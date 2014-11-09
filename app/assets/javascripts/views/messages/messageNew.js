CrowdSurfing.Views.MessageNew = CrowdSurfing.Views.New.extend({
  template: JST["messages/messageNew"],
  className: "currentUser", //TODO change that in the css and all

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.contactAutofill = new CrowdSurfing.Views.ContactAutofill(
                                { receiver: localStorage.getItem("msgToName"),
                                  id: "msg-receiver",
                                  name: "receiver" });
  },

  createNewModel: function(event) {
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
  }

})
