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
    this.matches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.moreMatches = new CrowdSurfing.Collections.SearchResults({modelsName: "users"});
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.advMenu = new CrowdSurfing.Views.AdvancedMenu();
  },

  render: function() {
    this.$el.html(this.template({collection: this.matches}));
    this.resultsSubview = new CrowdSurfing.Views.ResultsSubview({
      collection: this.matches,
      subcollection: this.moreMatches,
      el: this.$("ul")});
    this.advMenu.$el = this.$(".advMenu");
    this.advMenu.render();
    return this;
  },

  swapTabs: function(event) {
    event.preventDefault();
    var tab = $(event.currentTarget);
    $("button.tab").removeClass("active");
    tab.addClass("active");

    this.modelsName = tab.data("models-name");
  },

  search: function() {
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

    this.fetchResults(this.matches);
  },

  loadMore: function(event) {
    event.preventDefault();
    this.fetchResults(this.moreMatches);
  },

  fetchResults: function(collection) {
    var name = $("input#user-name").val();

    var $filterForm = $("form.filter-criteria");
    var filterData = $filterForm.serializeJSON();

    var sortCriterion = $("form.sort-criterion").find("input:checked").val();

    this.page = 0;

    collection.set({modelsName: this.modelsName});
    collection.fetch({data: { match: name,
                                filter_by: filterData,
                                sort_by: sortCriterion,
                                page: this.page }});
  },

  leave: function() {
    this.resultsSubview.leave();
    this.remove();
  }

});
