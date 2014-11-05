CrowdSurfing.Views.UsersSearch = Backbone.View.extend({
  template: JST["users/usersSearch"],

  events: {
    "click :radio" : "search",
    "blur input" : "search",
    "keydown input" : "searchIfReturn",
    "submit form" : "noRedirectSearch",
    "click a#load-more" : "loadMore"
  },

  initialize: function() {
    this.page = 0;
    this.matches = new CrowdSurfing.Collections.SearchResults();
    this.moreMatches = new CrowdSurfing.Collections.SearchResults();
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.advMenu = new CrowdSurfing.Views.AdvancedMenu();
  },

  render: function() {
    this.$el.html(this.template({collection: this.matches}));
    this.resultsSubview = new CrowdSurfing.Views.ResultsSubview({collection: this.matches, subcollection: this.moreMatches, el: this.$("ul")});
    this.advMenu.$el = this.$(".advMenu");
    this.advMenu.render();
    return this;
  },

  search: function() {
    var name = $("input#user-name").val();

    var $filterForm = $("form.filter-criteria");
    var filterData = $filterForm.serializeJSON();

    var sortCriterion = $("form.sort-criterion").find("input:checked").val();

    this.page = 0;
    this.matches.fetch({data: { match: name,
                                filter_by: filterData,
                                sort_by: sortCriterion,
                                page: this.page }});
  },

  searchIfReturn: function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.search();
    }
  },

  noRedirectSearch: function(event) {
    event.preventDefault();
    this.search();
  },

  loadMore: function(event) {
    event.preventDefault();

    var name = $("input#user-name").val();

    var $filterForm = $("form.filter-criteria");
    var filterData = $filterForm.serializeJSON();

    var sortCriterion = $("form.sort-criterion").find("input:checked").val();

    this.page += 1;

    this.moreMatches.fetch({data: { match: name,
                                filter_by: filterData,
                                sort_by: sortCriterion,
                                page: this.page }});
  },

  leave: function() {
    this.resultsSubview.leave();
    this.remove();
  }

})
