CrowdSurfing.Views.ContactAutofill = Backbone.View.extend({
  template: JST["contactAutofill"],

  events: {
    "keydown input" : "selectReceiver",
    "mousedown ul.found-users > li" : "selectReceiver",
    "blur input" : "selectReceiver",
    "click ul.selected-users li" : "removeReceiver",
    "keyup input" : "quickSearch"
  },

  initialize: function(options) {
    options = options || {};
    //this.receiver = options.receiver;
    //this.name = options.name;
    //this.some_id = options.id;
    //this.receiverId = options.receiverId;
    this.userIds = [];
    if(this.model) {
      this.userIds.push(this.model.id);
    }
    this.matches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.listenTo(this.matches, "sync", this.subrender);


  },

  render: function() {
    if(this.model && this.model.id) {
      if(this.userIds.indexOf(this.model.id) === -1) {
        this.userIds.push(this.model.id);
      }
    }

    this.$el.html(this.template({ model: this.model, name: "FIX-THIS-LATER" }));

    return this;
  },

  subrender: function() {
    var that = this;
    that.$("ul.found-users").html(
      function() {
        var str = ""
        that.matches.forEach(function(match){
          str += ('<li data-user-id="' + match.get("id") + '">' + match.get("name") + "</li>");
        });
        return str;
      }()
    )
  },

  quickSearch: function(event) {
    var that = this;
    var $searchBar = $(event.currentTarget);
    var match = $searchBar.val();

    if(match.length > 1) {
      this.matches.fetch({data: { user_match: match, contacts_only: true, exclude: this.userIds }});
    } else {
      this.removeFoundUsersList();
    }
  },

  selectReceiver: function(event) {
    var $userLi;
    if(event.type === "keydown") {
      if(event.keyCode !== 13) {
        return;
      }
      event.preventDefault();
      $userLi = $("ul.found-users li").first();
    } else if(event.type === "mousedown") {
      $userLi = $(event.currentTarget);
    } else {
      $userLi = $("ul.found-users li").first();
    }

    if($userLi.length === 0) {
      return;
    }

    var userId = $userLi.data("user-id");

    this.receiver = $userLi.text();
    var $toField = this.$("input");
    this.$("ul.selected-users").append('<li data-user-id="' + userId + '"><a href="javascript:void(0)">' + this.receiver + "</a></li>");

    this.userIds.push(userId);

    $toField.val("");
    $("ul.found-users").empty();
  },

  removeReceiver: function(event) {
    var $li = $(event.currentTarget);
    var id = $li.data("user-id");

    this.userIds.splice(this.userIds.indexOf(id), 1);
    $li.remove();
  },

  removeFoundUsersList: function(event) {
    $("ul.found-users").empty();
  },

  leave: function() {
    this.remove();
  }

})
