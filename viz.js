// vim ts=2 expandtab:

bb.viz = function() {
  var _viz = function () {},
      main = bb.main,
      data;

  _viz.init = function(d) {

    main.html("");

    main.append("a")
     .attr("href", "#")
     .text("Browse")
     .on("click", bb.browser);

    data = d;
    return _viz;
  }

  _viz.render = function() {
    main.append("p").text(JSON.stringify(data));
    return _viz;
  }

  return _viz;
}
