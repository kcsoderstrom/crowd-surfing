CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],

  events: {
    "click a.invite" : "openInviteView"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);

    this.eventsCollection = new CrowdSurfing.Collections.Events();
    this.eventsView = new CrowdSurfing.Views.EventsIndex({collection: this.eventsCollection});
    this.$el.addClass("current-user-for-real");
  },

  render: function() {
    this.eventsCollection.fetch();
    var that = this;
    this.$el.html(this.template({model: this.model, collection: this.collection}));
    this.$("section.events").append(this.eventsView.render().$el);
    return this;
  },

  openInviteView: function(event) {
    event.preventDefault();

    if(this.inviteView) {
      this.inviteView.leave();
    }

    var $li = $(event.currentTarget).closest("li");
    console.log($li);
    console.log($li.data("event-id"));

    this.inviteView = new CrowdSurfing.Views.InviteMenu({eventId: $li.data("eventId")});
    $li.append(this.inviteView.render().$el);
  },

  leave: function() {
    this.inviteView && this.inviteView.leave();
    this.remove();
  }


});
