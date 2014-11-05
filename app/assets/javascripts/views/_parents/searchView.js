CrowdSurfing.Views.SearchView = Backbone.View.extend({

  template: JST["search"],

  events: {
    "click :radio" : "search",
    "blur input" : "search",
    "submit form" : "search",
    "keydown input" : "search",

    "click a#load-more" : "loadMore",
    "click button.tab" : "swapTabs"
  },

  initialize: function() {
    this.page = 0;
    this.modelsName = "users";

    this.userMatches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.moreUserMatches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.eventMatches = new CrowdSurfing.Collections.SearchResults({modelsName: "events"});
    this.moreEventMatches = new CrowdSurfing.Collections.SearchResults({modelsName: "events"});

    this.matches = { users: this.userMatches, events: this.eventMatches };
    this.moreMatches = { users: this.moreUserMatches, events: this.moreEventMatches };

    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.advMenu = new CrowdSurfing.Views.AdvancedMenu();
  },

  render: function() {
    this.$el.html(this.template({collection: this.matches}));

    this.usersResultsSubview = new CrowdSurfing.Views.ResultsSubview({
      collection: this.matches["users"],
      subcollection: this.moreMatches["users"],
      el: this.$("ul#users-results"),
      modelsName: "users" });

    this.eventsResultsSubview = new CrowdSurfing.Views.ResultsSubview({
      collection: this.matches["events"],
      subcollection: this.moreMatches["events"],
      el: this.$("ul#events-results"),
      modelsName: "events" });

    this.advMenu.$el = this.$(".advMenu");
    this.advMenu.render();
    return this;
  },

  swapTabs: function(event) {
    event.preventDefault();
    var tab = $(event.currentTarget);
    $("button.tab").removeClass("active");
    this.$("section").removeClass("active");

    tab.addClass("active");
    $("section#" + tab.attr("id")).addClass("active");

    this.modelsName = tab.data("models-name");
  },

  search: function(event) {
    if(event.type === "submit") {
      event.preventDefault();
    }

    if(event.type === "keydown") {
      if(event.keycode !== 13) {
        return;
      }
      // only search when they press the return key
      event.preventDefault();
    }

    this.fetchResults(this.matches[this.modelsName]);
  },

  loadMore: function(event) {
    event.preventDefault();
    this.fetchResults(this.moreMatches[this.modelsName]);
  },

  fetchResults: function(collection) {
    var name = $("input#user-name").val();

    if(this.modelsName === "events") {
      name = $("input#event-title").val();
      console.log("TERRIBLE NAME", name);
    }

    var $filterForm = $("form.filter-criteria");
    var filterData = $filterForm.serializeJSON();

    var sortCriterion = $("form.sort-criterion").find("input:checked").val();

    this.page = 0;

    collection.modelsName = this.modelsName;
    collection.fetch({data: { match: name,
                              filter_by: filterData,
                              sort_by: sortCriterion,
                              page: this.page }});
  },

  leave: function() {
    this.usersResultsSubview.leave();
    this.eventsResultsSubview.leave();
    this.remove();
  }

});
