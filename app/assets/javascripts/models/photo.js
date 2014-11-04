CrowdSurfing.Models.Photo = Backbone.Model.extend({
  parse: function(jsonResp) {
    if(jsonResp.url) {
      this.src_url = jsonResp.url;
      delete jsonResp.url;
    }

    return jsonResp;
  }
});
