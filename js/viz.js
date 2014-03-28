// vim ts=2 expandtab ft=javascript:

bb.viz = function(data) {
  var _viz = function () {},
      plots = bb.plots,
      main = bb.header,
      size = 900;

  function horizon(start, stop, chrm) {
    var context = dnaism.context()
                   .start(start)
                   .stop(stop)
                   .size(size)
                   .chrm(chrm)
                   .step(2);

    plots.selectAll().remove();
    d3.select(".current-region").remove();

    main.append("div")
        .attr("class", "current-region")
        .text(chrm + ":" + start + "-" + stop);

    plots.selectAll(".axis")
        .data(["top", "bottom"])
      .enter().append("div")
        .attr("class", function(d) { return d + " axis"; })
        .each(function(d) { d3.select(this).call(context.axis().ticks(12).orient(d)); });


    plots.append("div")
        .attr("class", "rule")
        .call(context.rule());


    var source_bedserver = context.bedserver(bb.server);
    var metrics = [];
    Object.keys(data).forEach(function (prjName) {
      Object.keys(data[prjName]).forEach(function (sampleName) {
        if (data[prjName][sampleName])
          metrics.push(source_bedserver.metric(prjName, sampleName));
      });
    });


    plots.selectAll(".horizon")
        .data(metrics)
      .enter().insert("div", ".bottom")
        .attr("class", "horizon")
      .call(context.horizon()
        .format(d3.format(".2")));

    context.on("focus", function(i) {
      d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
    });

  }

  function getRegion() {
    var v = d3.select("input")[0][0].value,
        _, result = {};

    _  = v.split(":");
    if (_.length !== 2) return null;

    result["chrm"] = _[0];
    _  = _[1].split("-");
    if (_.length !== 2) return null;
    result["start"] = +_[0];
    result["stop"]  = +_[1];

    return result;
  }

  function clean() {
    main.html("");

    main.append("button")
     .text("Back to browsing projects")
     .on("click", function() {
       plots.html("");
       bb.browser();
     });

    var p =  main.append("p").attr("class", "region");

    p.text("Region (Ex. Chr17:1100000-1200000)");

    p.append("input")
      .attr("type", "text")
      .attr("id", "region")
      .attr("class", "input-text");

    p.append("button")
      .text("Viz it!")
      .on("click", function() {
        var c = getRegion();
        clean();
        if (c)
          horizon(c["start"], c["stop"], c["chrm"]);
        else
          console.log("Problems parsing region.");
      });
  }

  clean();
}
