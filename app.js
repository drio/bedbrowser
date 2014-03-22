// vim ts=2 expandtab:

bb = { version: "0.0.1" };

bb.browser = function() {
  var data,
      mainURL = "/bedserver/api/v1.0";

  function loadData(callback) {
    d3.json(mainURL + "/projects")
      .get(function (error, data) {
        if (error) console.log("Error loading data: " + error);
        else callback(data);
      });
  }

  function dataReady(data) {
    d3.select("#main").append("pre").text(JSON.stringify(data));
  }

  loadData(dataReady);
};
