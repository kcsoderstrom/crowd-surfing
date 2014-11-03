CrowdSurfing.Views.RequestNew = Backbone.View.extend({
  template: JST["requests/requestNew"],

  events: {
    "click button" : "sendRequest",
    "keyup input#req-receiver" : "quickSearch"
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
    this.matches.forEach(function(match){
      that.$el.append("<div>" + match.escape("username") + "</div>");
    });
  },

  sendRequest: function(event) {
    event.preventDefault();
    var req = new CrowdSurfing.Models.Request();
    var $form = $("form.request-new");
    var formData = $form.serializeJSON();
    req.set(formData);
    req.save({}, {
      success: function() {
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  quickSearch: function(event) {
    var that = this;
    var $searchBar = $(event.currentTarget);
    var match = $searchBar.val();

    if(match.length > 1) {
      this.matches.fetch({data: { match: match }});
    }
  }
})