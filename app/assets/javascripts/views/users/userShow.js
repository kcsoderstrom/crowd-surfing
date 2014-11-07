CrowdSurfing.Views.UserShow = Backbone.View.extend({
  template: JST["users/userShow"],

  tagName: "section",
  className: "user-show",

  events: {
    "click a#add-contact" : "addContact",
    "click a#msg-send" : "sendMessage",
    "click a#req-send" : "sendRequest",
    "click .wax-paper.shady" : "removeModal"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.requestModal = new CrowdSurfing.Views.RequestNew({model: this.model});
  },

  render: function() {
    console.log("rendering for some reason");
    this.$el.html(this.template({model: this.model}));
    this.$("div.new-request-modal").html(this.requestModal.render().$el);
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
    localStorage.setItem("msgToId", this.model.get("name"));
  },

  sendRequest: function(event) {
    event.preventDefault();

    this.$(".wax-paper").addClass("shady");
    this.$("section.new-request-modal").addClass("active");
  },

  removeModal: function(event) {
    console.log("WHAT MAKES YOU THINK THIS IS HAPPENING!?");
    console.log(event);
    $(".wax-paper").removeClass("shady");
    $(".new-request-modal").removeClass("active");
  },

  leave: function() {
    this.requestModal.leave();
    this.remove();
  }
})
