CrowdSurfing.Views.CurrentUserShow = Backbone.View.extend({
  template: JST["users/currentUserShow"],

  events: {
    "click a.invite" : "openInviteView"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
    this.$el.addClass("current-user-for-real");
  },

  render: function() {
    var that = this;
    this.$el.html(this.template({model: this.model, collection: this.collection}));
    return this;
  },

  openInviteView: function(event) {
    event.preventDefault();

    if(this.inviteView) {
      this.inviteView.leave();
    }

    var $li = $(event.currentTarget).closest("li");

    this.inviteView = new CrowdSurfing.Views.InviteMenu({eventId: $li.data("eventId")});
    $li.append(this.inviteView.render().$el);
  },

  leave: function() {
    this.inviteView && this.inviteView.leave();
    this.remove();
  }


});
