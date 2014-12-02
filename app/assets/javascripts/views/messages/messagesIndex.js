CrowdSurfing.Views.MessagesIndex = Backbone.View.extend({
  template: JST["messages/messagesIndex"],
  tagName: "section",
  className: "I-want-this-centered white", // TODO: stupid name

  events: {
    "click a#add-contact" : "addContact",
    "click a#new-msg" : "newMessage",
    "click h2#inbox-header" : "inboxDisplay",
    "click h2#sent-header" : "sentMessagesDisplay",
    "click ul.messages > li" : "selectMessage",
    "click .msg-header button" : "newMessage"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render); // THIS IS BAD BC IF THEY LOAD LATE YOU WILL BE CLICKING AND THEN BOOM
    this.activeFolder = "inbox";
  },

  render: function() {
    if(!this.activeMessage) {
      if(this.activeFolder === "inbox" && this.collection.received_messages) {
        this.activeMessage = this.collection.received_messages.models[0];
      } else if( this.activeFolder === "sent" && this.collection.sent_messages ){
        this.activeMessage = this.collection.sent_messages.models[0];
      }
    }
    this.$el.html(this.template({collection: this.collection, model: this.activeMessage, active: this.activeFolder}));
    return this;
  },

  selectMessage: function(event) {
    var $li = $(event.currentTarget);
    var id = $li.data("id");
    if(this.activeMessage) {
      this.stopListening(this.activeMessage);
    }

    if(this.activeFolder === "inbox") {
      this.activeMessage = this.collection.received_messages.getOrFetch(id);
    } else {
      this.activeMessage = this.collection.sent_messages.getOrFetch(id);
    }
    this.listenTo(this.activeMessage, "sync", this.render);
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
    this.activeFolder = "inbox";
  },

  sentMessagesDisplay: function() {
    $("ul#sent-messages").addClass("active");
    $("ul#inbox").removeClass("active");
    this.activeFolder = "sent";
  },

  leave: function() {
    this.remove();
  }
});
