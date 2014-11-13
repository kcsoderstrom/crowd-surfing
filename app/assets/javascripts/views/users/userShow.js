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

  initialize: function(options) {
    this.currentUser = options.currentUser;
    // this.contacts = options.contacts;
    // this.requests = options.requests;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.requestModal && this.requestModal.leave();
    this.$el.html(this.template({model: this.model}));
    return this;
  },

  addContact: function(event) {
    event.preventDefault();
    var user = this.model;
    var that = this;
    var newContact = new CrowdSurfing.Models.Contact();
    newContact.save({friend_id: this.model.id}, {
      success: function() {
        user.fetch();
        that.currentUser.contacts.add({name: user.profile().get("name"), id: user.id});
      }
    });
  },

  sendMessage: function(event) {
    localStorage.setItem("msgToName", this.model.get("name"));
    localStorage.setItem("msgToId", this.model.get("id"));
  },

  sendRequest: function(event) {
    event.preventDefault();
    if(!this.requestModal) {
      this.requestModal = new CrowdSurfing.Views.RequestNew({model: this.model, currentUser: this.currentUser});
      this.$("div.new-request-modal").html(this.requestModal.render().$el);
    }

    $(".wax-paper").addClass("shady");
    this.$(".modal").addClass("active");
  },

  removeModal: function(event) {
    $(".modal").removeClass("active");
  },

  leave: function() {
    this.requestModal && this.requestModal.leave();
    this.remove();
  }
})
