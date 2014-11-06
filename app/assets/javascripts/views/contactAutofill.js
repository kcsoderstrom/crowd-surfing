CrowdSurfing.Views.ContactAutofill = Backbone.View.extend({
  template: JST["contactAutofill"],

  events: {
    "keyup input" : "quickSearch",
    "click input" : "stopAutofilling",
    "mousedown ul.found-users > li" : "selectReceiver",
    "blur input" : "removeFoundUsersList"
  },

  initialize: function(options) {
    options = options || {};
    this.receiver = options.receiver;
    this.name = options.name;
    this.id = options.id;
    this.matches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.listenTo(this.matches, "sync", this.subrender);
    this.userIds = [];
  },

  render: function() {
    this.$el.html(this.template({ receiver: this.receiver, name: this.name, id: this.id }));
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
      this.matches.fetch({data: { match: match, contacts_only: true }});
    } else {
      this.removeFoundUsersList();
    }
  },

  selectReceiver: function(event) {
    this.receiver = $(event.currentTarget).text();
    var $toField = this.$("input");
    this.$("ul.selected-users").append("<li>" + this.receiver + "</li>");

    this.userIds.push($(event.currentTarget).data("userId"));

    console.log($toField);
    $toField.val("");
    $("ul.found-users").empty();
  },

  removeFoundUsersList: function(event) {
    $("ul.found-users").empty();
  },

  leave: function() {
    this.remove();
  }

})
