CrowdSurfing.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    "edit" : "currentUserEdit",
    "users/:id" : "userShow",
    "users/:id/messages/new" : "messageNewForUser",
    "users/:id/requests/new" : "requestNewForUser",
    "search" : "usersSearch",
    "messages" : "messagesIndex",
    "messages/new" : "messageNew",
    "messages/:id" : "messageShow",
    "requests/new" : "requestNew"
  },

  initialize: function(options) {
    this.$el = options.$el;
    this.collection = options.collection;
    this.collection.fetch();
  },

  landingPage: function() {
    if(window.currentUserId) {
      this.currentUserShow();
    } else {
      this.welcome();
    }
  },

  welcome: function() {
    var welcomeView = new CrowdSurfing.Views.Welcome();
    this.$el.html(welcomeView.render().$el);
  },

  currentUserShow: function() {
    var user = this.collection.getOrFetch(window.currentUserId);
    var showView = new CrowdSurfing.Views.CurrentUserShow({model: user, collection: this.collection});
    this.$el.html(showView.render().$el);
  },

  currentUserEdit: function() {
    var user = this.collection.getOrFetch(window.currentUserId);
    var editView = new CrowdSurfing.Views.CurrentUserEdit({model: user});
    this.$el.html(editView.render().$el);
  },

  userShow: function(id) {
    var user = this.collection.getOrFetch(id);
    var showView = new CrowdSurfing.Views.UserShow({model: user});
    this.$el.html(showView.render().$el);
  },

  usersSearch: function() {
    var searchView = new CrowdSurfing.Views.UsersSearch({collection: this.collection});
    this.$el.html(searchView.render().$el);
  },

  messageNew: function() {
    var msg = new CrowdSurfing.Models.Message();
    var newView = new CrowdSurfing.Views.MessageNew({model: msg});
    this.$el.html(newView.render().$el);
  },

  messageNewForUser: function(id) {
    var msg = new CrowdSurfing.Models.Message();
    var receiver = this.collection.getOrFetch(id);
    var newView = new CrowdSurfing.Views.MessageNew({model: msg, receiver: receiver});
    this.$el.html(newView.render().$el);
  }, //TODO: use a cookie for this?

  messagesIndex: function() {
    console.log("well you're here");
    var messages = new CrowdSurfing.Collections.Messages();
    messages.fetch();
    var indexView = new CrowdSurfing.Views.MessagesIndex({collection: messages});
    this.$el.html(indexView.render().$el);
  },

  messageShow: function(id) {
    var message = new CrowdSurfing.Models.Message();
    message.set({id: id});
    message.fetch();
    var showView = new CrowdSurfing.Views.MessageShow({model: message});
    this.$el.html(showView.render().$el);
  },

  requestNew: function() {
    var req = new CrowdSurfing.Models.Request();
    var newView = new CrowdSurfing.Views.RequestNew({model: req});
    this.$el.html(newView.render().$el);
  },

  requestNewForUser: function(id) {
    var req = new CrowdSurfing.Models.Request();
    var receiver = this.collection.getOrFetch(id);
    var newView = new CrowdSurfing.Views.RequestNew({model: req, receiver: receiver});
    this.$el.html(newView.render().$el);
  }

});