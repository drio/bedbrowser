// vim ts=2 expandtab ft=javascript:

bb = { version: "0.0.1" };
bb.header = d3.select("#header");
bb.plots = d3.select("#plots");
bb.server = "http://localhost:5000";

bb.browser = function() {
  var list,
      mainURL = "/bedserver/api/v1.0",
      main = bb.header;

  list = (function() {
    var o = {},
        ds = {};

    o.addPrj = function(p) {
      ds[p] = {};
    };

    o.addSample = function(p, s) {
      ds[p][s] = false;
    };

    o.setAll = function(p, tf) {
      main.selectAll("input")[0].forEach(function(e) {
        if (e.id.indexOf(p) > -1) {
          Object.keys(ds[p]).forEach(function(s) {
            ds[p][s] = tf;
          });
          e.checked = tf;
        }
      });
    };

    o.set = function(p, s) {
      ds[p][s] = !ds[p][s];
    };


    o.active = function() {
      return ds;
    };

    return o;
  })();

  function click(prj, sample) {
    list.toggle(prj, sample);
    console.log(list.active());
  }

  function createPrj(prj) {
   var p =  main.append("p")
                .text(prj).attr("class", "project");

    p.append("a")
     .attr("href", "#")
     .text("all")
     .on("click", function() { list.setAll(prj, true); });

    p.append("a")
     .attr("href", "#")
     .text("none")
     .on("click", function() { list.setAll(prj, name); });
  }

  function createSample(prj, sample) {
    var i = main.append("p");

    i.append("input")
     .attr("type", "checkbox")
     .attr("id", "[" + prj + "," + sample + "]")
     .on("click", function() { list.set(prj, sample); });

    i.append("text").text(sample);
  }

  function run() {
    bb.viz().init(list.active()).render();
  }

  function loadData(callback) {
    d3.json(mainURL + "/projects")
      .get(function (error, data) {
        if (error) console.log("Error loading data: " + error);
        else callback(data.projects);
      });
  }

  function renderView(projects) {
    main.html("");

    main.append("a")
     .attr("href", "#")
     .text("Run")
     .on("click", run);

    Object.keys(projects).forEach(function (name) {
      createPrj(name);
      list.addPrj(name);
      projects[name].map(function(sample) {
        list.addSample(name, sample);
        createSample(name, sample);
      });
    });
  }

  loadData(renderView);
};
