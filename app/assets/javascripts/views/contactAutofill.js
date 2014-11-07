CrowdSurfing.Views.ContactAutofill = Backbone.View.extend({
  template: JST["contactAutofill"],

  events: {
    "keydown input" : "selectReceiver",
    "mousedown ul.found-users > li" : "selectReceiver",
    "click ul.selected-users li" : "removeReceiver",
    "keyup input" : "quickSearch",
    "blur input" : "removeFoundUsersList"
  },

  initialize: function(options) {
    options = options || {};
    //this.receiver = options.receiver;
    //this.name = options.name;
    //this.some_id = options.id;
    //this.receiverId = options.receiverId;
    this.matches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.listenTo(this.matches, "sync", this.subrender);
    this.userIds = [];

  },

  render: function() {
    console.log("the events arrrre", this.$el.events);

    console.log(this.model);
    if(this.model && this.model.id) {
      if(this.userIds.indexOf(this.model.id) === -1) {
        this.userIds.push(this.model.id);
      }
    }

    this.$el.html(this.template({ model: this.model, name: "FIX-THIS-LATER" }));

    console.log("the el is alright mama's alright they just need a little wl;werjlgrlhgr", this.$el);

    this.$el.on("keydown", "input", function() {
      console.log("THIS SHOULDN'T WORK ANY BETTER BUT MAYYYYYBVE")
    })
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
    console.log("QUICKSEARCH IS GETTING TRIGGERED AT ALL EVEN A LITTLE BIT")
    var that = this;
    var $searchBar = $(event.currentTarget);
    var match = $searchBar.val();

    if(match.length > 1) {
      this.matches.fetch({data: { match: match, contacts_only: true, exclude: this.userIds }});
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
    } else {
      $userLi = $(event.currentTarget);
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
