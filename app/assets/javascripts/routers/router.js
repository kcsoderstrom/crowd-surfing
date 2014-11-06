CrowdSurfing.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    "_=_" : "currentUserShow",
    "edit" : "currentUserEdit",
    "users/:id" : "userShow",
    "users/:id/requests/new" : "requestNewForUser",
    "search" : "search",
    "messages" : "messagesIndex",
    "messages/new" : "messageNew",
    "messages/:id" : "messageShow",
    "requests/new" : "requestNew",
    "events/new" : "eventNew",
    "sad_face" : "loginErrors"
  },

  initialize: function(options) {
    this.$el = options.$el;
    this.$headerEl = options.$headerEl;
    this.collection = options.collection;
    this.collection.fetch();
    var headerView = new CrowdSurfing.Views.Header({el: this.$headerEl,
                                                    model: this.collection.getOrFetch(window.currentUserId)});
    // THIS NEEDS TO NOT BE THERE ON THE LANDING PAGE!!
    headerView.render();
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
    this._swapView(welcomeView);
  },

  currentUserShow: function() {
    var user = this.collection.getOrFetch(window.currentUserId);
    var showView = new CrowdSurfing.Views.CurrentUserShow({model: user, collection: this.collection});
    this._swapView(showView);
  },

  currentUserEdit: function() {
    var user = this.collection.getOrFetch(window.currentUserId);
    var editView = new CrowdSurfing.Views.CurrentUserEdit({model: user});
    this._swapView(editView);
  },

  userShow: function(id) {
    var user = this.collection.getOrFetch(id);
    var showView = new CrowdSurfing.Views.UserShow({model: user});
    this._swapView(showView);
  },

  search: function() {
    var searchView = new CrowdSurfing.Views.SearchView({collection: this.collection});
    this._swapView(searchView);
  },

  messageNew: function() {
    var msg = new CrowdSurfing.Models.Message();
    var newView = new CrowdSurfing.Views.MessageNew({model: msg});
    this._swapView(newView);
  },

  messagesIndex: function() {
    var messages = new CrowdSurfing.Collections.Messages();
    messages.fetch();
    var indexView = new CrowdSurfing.Views.MessagesIndex({collection: messages});
    this._swapView(indexView);
  },

  messageShow: function(id) {
    var message = new CrowdSurfing.Models.Message();
    message.set({id: id});
    message.fetch();
    var showView = new CrowdSurfing.Views.MessageShow({model: message});
    this._swapView(showView);
  },

  requestNew: function() {
    var req = new CrowdSurfing.Models.Request();
    var newView = new CrowdSurfing.Views.RequestNew({model: req});
    this._swapView(newView);
  },

  eventNew: function() {
    var evt = new CrowdSurfing.Models.Event();
    var newView = new CrowdSurfing.Views.EventNew({model: evt});
    this._swapView(newView);
  },

  loginErrors: function() {
    var welcomeView = new CrowdSurfing.Views.Welcome({loginErrors: true});
    this._swapView(welcomeView);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.leave();
    this._currentView = newView;
    this.$el.html(newView.render().$el);
  }

});
