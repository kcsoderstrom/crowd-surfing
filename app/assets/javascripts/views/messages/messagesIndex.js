CrowdSurfing.Views.MessagesIndex = Backbone.View.extend({
  template: JST["messages/messagesIndex"],
  tagName: "section",
  className: "user-show", // TODO: stupid name

  events: {
    "click a#add-contact" : "addContact",
    "click a#new-msg" : "newMessage"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
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

  leave: function() {
    this.remove();
  }
});
