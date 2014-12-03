CrowdSurfing.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    "_=_" : "currentUserShow",
    "edit" : "currentUserEdit",
    "users/:id" : "userShow",
    "search" : "search",
    "search/location=:location" : "searchByLocation",
    "messages" : "messagesIndex",
    "messages/new" : "messageNew",
    "messages/:id" : "messageShow",
    "events/new" : "eventNew",
    // "events/:id" : "eventShow",
    "sad_face" : "loginErrors"
  },

  initialize: function(options) {
    this.$el = options.$el;
    this.$headerEl = options.$headerEl;
    this.collection = options.collection;
    this.currentUser = this.collection.getOrFetch(window.currentUserId);
    this.headerView = new CrowdSurfing.Views.Header({el: this.$headerEl,
                                                     model: this.currentUser});
    this.headerView.render();

    $("body").on("click", ".wax-paper.shady", function(event) {
      $(event.currentTarget).removeClass("shady");
      $(".modal").removeClass("active");
    });
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
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var user = this.currentUser;
    var showView = new CrowdSurfing.Views.CurrentUserShow({model: user});
    this._swapView(showView);
  },

  currentUserEdit: function() {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var user = this.currentUser;
    var editView = new CrowdSurfing.Views.CurrentUserEdit({model: user});
    this._swapView(editView);
  },

  userShow: function(id) {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var user = this.collection.getOrFetch(id);
    var showView = new CrowdSurfing.Views.UserShow({model: user, currentUser: this.currentUser});
    this._swapView(showView);
  },

  searchByLocation: function(location) {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var searchView = new CrowdSurfing.Views.SearchView({collection: this.collection, location: location});
    this._swapView(searchView);
  },

  search: function() {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var searchView = new CrowdSurfing.Views.SearchView({collection: this.collection});
    this._swapView(searchView);
  },

  messageNew: function() {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var msg = new CrowdSurfing.Models.Message();
    var newView = new CrowdSurfing.Views.MessageNew({model: msg});
    newView.$el.addClass("active");
    this._swapView(newView);
  },

  messagesIndex: function() {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var messages = new CrowdSurfing.Collections.Messages();
    messages.fetch();
    var indexView = new CrowdSurfing.Views.MessagesIndex({collection: messages});
    this._swapView(indexView);
  },

  messageShow: function(id) {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var message = new CrowdSurfing.Models.Message();
    message.set({id: id});
    var showView = new CrowdSurfing.Views.MessageShow({model: message});
    this._swapView(showView);
  },

  eventNew: function() {
    if(!window.currentUserId) {
      Backbone.history.navigate("#", {trigger: true});
      return;
    }
    var evt = new CrowdSurfing.Models.Event();
    var newView = new CrowdSurfing.Views.EventNew({model: evt, currentUser: this.currentUser});
    this._swapView(newView);
  },

  // eventShow: function(id) {
  //   if(!window.currentUserId) {
  //     Backbone.history.navigate("#", {trigger: true});
  //     return;
  //   }
  //   var evt = new CrowdSurfing.Models.Event(); //TODO: MAKE THIS FASTER!!
  //   evt.set({id: id});
  //   var showView = new CrowdSurfing.Views.EventShow({model: evt});
  //   this._swapView(showView);
  // },

  loginErrors: function() {
    var welcomeView = new CrowdSurfing.Views.Welcome({loginErrors: true});
    this._swapView(welcomeView);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.leave();
    this._currentView = newView;
    this.$el.html(newView.render().$el);
    this.headerView.render();
  }

});
