CrowdSurfing.Views.MessageNew = Backbone.View.extend({
  template: JST["messages/messageNew"],

  events: {
    "click button" : "sendMessage",
    "keyup input#msg-receiver" : "quickSearch",
    "click input#msg-receiver" : "stopAutofilling",
    "click ul.found-users > li" : "selectReceiver",
    "blur input#msg-receiver" : "removeFoundUsersList"
  },

  initialize: function(options) {
    if(options) {
      if(options.receiver) {
        this.receiver = options.receiver;
        this.listenTo(this.receiver, "sync", this.render);
      }
    }

    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.matches = new CrowdSurfing.Collections.SearchResults();
    this.listenTo(this.matches, "sync", this.subRender);
  },

  render: function() {
    this.$el.html(this.template({model: this.model, receiver: this.receiver}));
    return this;
  },

  subRender: function() {
    var that = this;
    that.$("ul.found-users").html(
      function() {
        var str = ""
        that.matches.forEach(function(match){
          str += ("<li>" + match.escape("username") + "</li>");
        });
        return str;
      }()
    )
  },

  sendMessage: function(event) {
    event.preventDefault();
    var msg = new CrowdSurfing.Models.Message();
    var $form = $("form.message-new");
    var formData = $form.serializeJSON();
    msg.set(formData);
    msg.save({}, {
      success: function() {
        Backbone.history.navigate("/messages", {trigger: true});
      }
    });
  },

  quickSearch: function(event) {
    var that = this;
    var $searchBar = $(event.currentTarget);
    var match = $searchBar.val();

    if(match.length > 1) {
      this.matches.fetch({data: { match: match, contacts_only: true }});
    } else {
      this.removeFoundUsersList();
    }
  },

  selectReceiver: function(event) {
    var receiverName = $(event.currentTarget).text();
    var $toField = $("input#msg-receiver");
    $toField.val(receiverName);
    $("ul.found-users").empty();
  },

  removeFoundUsersList: function(event) {
    $("ul.found-users").empty();
  }

})