CrowdSurfing.Views.UserShow = Backbone.View.extend({
  template: JST["users/userShow"],

  tagName: "section",

  events: {
    "click a#add-contact" : "addContact"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("user-show");
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;x
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
  }
})