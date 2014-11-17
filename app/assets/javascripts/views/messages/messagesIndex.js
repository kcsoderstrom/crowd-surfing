CrowdSurfing.Views.MessagesIndex = Backbone.View.extend({
  template: JST["messages/messagesIndex"],
  tagName: "section",
  className: "user-show", // TODO: stupid name

  events: {
    "click a#add-contact" : "addContact",
    "click a#new-msg" : "newMessage",
    "click h2#inbox-header" : "inboxDisplay",
    "click h2#sent-header" : "sentMessagesDisplay"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render); // THIS IS BAD BC IF THEY LOAD LATE YOU WILL BE CLICKING AND THEN BOOM
  },

  render: function() {
    this.$el.html(this.template({collection: this.collection}));
    return this;
  },

  newMessage: function(event) {
    event.preventDefault();
    if(!this.messageModal) {
      this.messageModal = new CrowdSurfing.Views.MessageNew({model: new CrowdSurfing.Models.Message()});
      this.$("div.new-message-modal").html(this.messageModal.render().$el);
    }

    $(".wax-paper").addClass("shady");
    this.$("section.modal").addClass("active");
  },

  removeModal: function(event) {
    $(".wax-paper").removeClass("shady");
    $(".modal").removeClass("active");
  },

  inboxDisplay: function() {
    $("ul#inbox").addClass("active");
    $("ul#sent-messages").removeClass("active");
  },

  sentMessagesDisplay: function() {
    $("ul#sent-messages").addClass("active");
    $("ul#inbox").removeClass("active");
  },

  leave: function() {
    this.remove();
  }
});
