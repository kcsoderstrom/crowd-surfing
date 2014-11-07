CrowdSurfing.Views.SearchView = Backbone.View.extend({

  template: JST["search"],

  events: {
    "click :radio" : "search",
    "blur input" : "search",
    "submit form" : "search",
    "keydown input" : "search",

    "click a#load-more" : "loadMore",
    "click button.tab" : "swapTabs",

    "click label" : "loadForm"
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
    this.usersAdvMenu = new CrowdSurfing.Views.AdvancedMenu({modelsName: "users"});
    this.eventsAdvMenu = new CrowdSurfing.Views.AdvancedMenu({modelsName: "events"});

    this.modelsName = "events";
    this.search({type: undefined});
    this.modelsName = "users";
    this.search({type: undefined});

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

    this.usersAdvMenu.$el = this.$(".adv-menu.users");
    this.usersAdvMenu.render();

    this.eventsAdvMenu.$el = this.$(".adv-menu.events");
    this.eventsAdvMenu.render();
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

    this.page = 0;
    this.fetchResults(this.matches[this.modelsName]);
  },

  loadMore: function(event) {
    event.preventDefault();
    this.fetchResults(this.moreMatches[this.modelsName]);
  },

  fetchResults: function(collection) {
    var that = this;

    var userName = $("input#user-name").val();
    var eventName = $("input#event-title").val();

    var $filterForm = $("form.filter-criteria");
    var filterData = $filterForm.serializeJSON();

    var sortCriterion = $("form.sort-criterion").find("input:checked").val();

    collection.modelsName = this.modelsName;
    collection.fetch({
                        data: { user_match: userName,
                                event_match: eventName,
                                filter_by: filterData,
                                sort_by: sortCriterion,
                                page: this.page },

                        success: function() {
                          that.page += 1;
                        }
                      });

  },

  loadForm: function(event) {
    $label = $(event.currentTarget);
    $labelId = $label.attr("id");

    if($labelId === "sort-label") {
      $("form.sort-criterion").toggleClass("active");
    } else if ($labelId === "filter-label") {
      $("form.filter-criteria").toggleClass("active");
    } else if ($labelId === "name-label") {
      $("form.search").toggleClass("active");
    }
    console.log($label.attr("id"))
  },

  leave: function() {
    this.usersResultsSubview.leave();
    this.eventsResultsSubview.leave();
    this.remove();
  }

});
