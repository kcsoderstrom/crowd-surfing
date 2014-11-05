CrowdSurfing.Views.MessageNew = Backbone.View.extend({
  template: JST["messages/messageNew"],

  events: {
    "click button" : "sendMessage"
  },

  initialize: function(options) {

    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.matches = new CrowdSurfing.Collections.SearchResults();
    this.autofillSubview = new CrowdSurfing.Views.ContactAutofill(
                                { receiver: localStorage.getItem("msgToName"),
                                  id: "msg-receiver",
                                  name: "receiver" });
    this.listenTo(this.matches, "sync", this.subRender);
  },

  render: function() {
    this.$el.html(this.template({model: this.model, receiver: this.receiver}));
    this.$("div.msg-receiver").html(this.autofillSubview.render().$el);
    return this;
  },

  subRender: function() {
    var that = this;
    that.$("ul.found-users").html(
      function() {
        var str = ""
        that.matches.forEach(function(match){
          str += ("<li>" + match.get("name") + "</li>");
        });
        return str;
      }()
    )
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
  },

  leave: function() {
    localStorage.removeItem("msgToName");
    this.autofillSubview.leave();
    this.remove();
  }

})
