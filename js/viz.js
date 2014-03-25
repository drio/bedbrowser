// vim ts=2 expandtab ft=javascript:

bb.viz = function() {
  var _viz = function () {},
      plots = bb.plots,
      main = bb.header,
      size = 900,
      data;

  function horizon(start, stop, chrm) {
    var context = dnaism.context()
                   .start(start)
                   .stop(stop)
                   .size(size)
                   .chrm(chrm)
                   .step(2);


    plots.selectAll(".axis")
        .data(["top", "bottom"])
      .enter().append("div")
        .attr("class", function(d) { return d + " axis"; })
        .each(function(d) { d3.select(this).call(context.axis().ticks(12).orient(d)); });


    // TODO: we will have to clean up
    //d3.select("body").append("div")
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

  function clean() {
    main.html("");

    main.append("a")
     .attr("href", "#")
     .text("Back to browsing projects")
     .on("click", function() {
       plots.html("");
       bb.browser();
     });

    var p =  main.append("p").attr("class", "region");

    p.text("Format: Chrm:start-end (Chr17:1100000-1200000)");

    p.append("input")
      .attr("type", "text")
      .attr("id", "region")
      .attr("class", "input-text");

    p.append("a")
      .attr("href", "#")
      .text("Viz it!")
      .on("click", function() {
        clean();
        horizon(1100000, 1200000, "Chr17");
      });
  }


  _viz.init = function(d) {
    data = d;
    clean();
    return _viz;
  }

  _viz.render = function() {
    main.append("p").text(JSON.stringify(data));
    return _viz;
  }

  return _viz;
}
