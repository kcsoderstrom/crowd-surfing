CrowdSurfing.Views.UsersSearch = Backbone.View.extend({
  template: JST["users/usersSearch"],

  events: {
    "click :radio" : "search",
    "blur input" : "search",
  },

  initialize: function() {
    this.matches = new CrowdSurfing.Collections.SearchResults();
    this.$el.addClass("currentUser");  //TODO change that in the css and all
    this.advMenu = new CrowdSurfing.Views.AdvancedMenu();
  },

  render: function() {
    this.$el.html(this.template({collection: this.matches}));
    this.resultsSubview = new CrowdSurfing.Views.ResultsSubview({collection: this.matches, el: this.$("ul")});
    this.advMenu.$el = this.$(".advMenu");
    this.advMenu.render();
    return this;
  },

  search: function(event) {
    var username = $("input#user-username").val();

    var $filterForm = $("form.filter-criteria");
    var filterData = $filterForm.serializeJSON();

    var sortCriterion = $("form.sort-criterion").find("input:checked").val();

    this.matches.fetch({data: { match: username,
                                filter_by: filterData,
                                sort_by: sortCriterion}});
  }

})