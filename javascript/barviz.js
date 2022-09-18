var margin = {top: 20, right: 30, bottom: 40, left: 150},
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar_viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "test")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("javascript/African Independence timeline - Colonizer List.csv").then(function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 25])
    .range([ 0, (width)]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "X-axis")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, (height) ])
    .domain(data.map(function(d) { return d.Colonizer; }))
    .padding(.1);

  svg.append("g")
    .attr("class", "Y-axis")
    .call(d3.axisLeft(y))

  var tooltip = d3.select("#bar_viz")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "10px")
        .style("background-color", "white")
        .style("border-radius", "4px")

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.Colonizer); })
    .attr("width", function(d) { return x(d.Number_of_colonies); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#800080")
    .on("mouseover", function (d,i) {
  tooltip
    .html(`<div>Colonizer: ${d.Colonizer}</div><div># of Colonies: ${d.Number_of_colonies}</div>`)
    .style('visibility', 'visible');
    d3.select(this).transition().attr("fill","#F7931E");
  })
    .on("mousemove", function() {
        tooltip
            .style('top', d3.event.pageY - 10 + 'px')
            .style('left', d3.event.pageX + 10 + 'px');
          })
    .on("mouseleave", function() {
      tooltip.html(``).style('visibility', 'hidden');
      d3.select(this).transition().attr("fill","#800080");
    });

})
