CrowdSurfing.Views.UserShow = Backbone.View.extend({
  template: JST["users/userShow"],

  tagName: "section",

  events: {
    "click a#add-contact" : "addContact",
    "click a#msg-send" : "sendMessage",
    "click a#req-send" : "sendRequest"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("user-show");
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  addContact: function(event) {
    event.preventDefault();
    var user = this.model;
    var newContact = new CrowdSurfing.Models.Contact();
    newContact.save({friend_id: this.model.id}, {
      success: function() {
        user.fetch();
      }
    });
  },

  sendMessage: function(event) {
    localStorage.setItem("msgToName", this.model.get("name"));
  },

  sendRequest: function(event) {
    localStorage.setItem("reqToName", this.model.get("name"));
  },

  leave: function() {
    this.remove();
  }
})
