// vim ts=2 expandtab:

bb = { version: "0.0.1" };

bb.browser = function() {
  var list,
      mainURL = "/bedserver/api/v1.0",
      main = d3.select("#main");

  list = (function() {
    var o = {},
        ds = {};

    o.addPrj = function(p) {
      ds[p] = {};
    };

    o.addSample = function(p, s) {
      ds[p][s] = 0;
    };

    o.print = function() {
      console.log(ds);
    };

    return o;
  })();

  function prjClick(name) {
    console.log("prj: " + name + " ");
  }

  function sampleClick(name) {
    console.log("sample" + " " + name);
  }

  function createEl(elText, _class) {
    main.append("input")
        .attr("type", "checkbox")
        .on("click", function() {
          if (_class == "project") prjClick(elText);
          if (_class == "sample") sampleClick(elText);
        });
    main.append("span").text(elText).attr("class", _class);
  }

  function loadData(callback) {
    d3.json(mainURL + "/projects")
      .get(function (error, data) {
        if (error) console.log("Error loading data: " + error);
        else callback(data.projects);
      });
  }

  // {"depth":["18277","36013"],"snp_density":["18277.YNPRC.Indian.chr1","19466.YNPRC.Indian.chr1"]}
  function renderView(projects) {
    Object.keys(projects).forEach(function (name) {
      list.addPrj(name);
      createEl(name, "project");
      projects[name].map(function(sample) {
        list.addSample(name, sample);
        createEl(sample, "sample");
      });
    });
  }

  loadData(renderView);
};
