
mapboxgl.accessToken = "pk.eyJ1Ijoib2Jpd3VqaSIsImEiOiJja3B3ZHdvenkwMHV4MnFucHc2YW9tcHcyIn0.wI9Kn7vACQdq61dnjStghg";

var map;

d3.json("javascript/africa.json").then(createMap);

function createMap(data) {
  //Setup mapbox-gl map
  map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [15, -6],
      liglatbounds: ([-73.9876, 40.7661], [-73.9397, 40.8002]),
      zoom: 2.5,
      interactive: false,
  });

  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);

  var container = map.getCanvasContainer();
  dataset = d3.csv("javascript/African Independence timeline - Colonizer List.csv").then(function(data) {return data});
  console.log(dataset);

  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "2000")
    .style("position", "absolute")
    .style("z-index", 10);

  var leg = d3
    .select("#legend")
    .append("svg")
    .attr("width", "220")
    .attr("height", "400")
    .style("position", "absolute")
    .style("z-index", 5)
    // .style("background", "white")


    console.log(data.properties);

  var key = ["United States", "Britain", "Italy", "Egypt", "France", "Spain", "Belgium", "Portugal", "South Africa", "Ethiopia"]
  var color = d3.scaleOrdinal()
      .domain(data.map(function(d) {return d.properties.colonizer}))
      .range(d3.schemeSet1)

  let dots = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("r", 10)
    .style("opacity", 0.7)
    .style("fill", function(d) {return color(d.properties.colonizer)})

    leg.selectAll("legenddots")
      .data(key)
      .enter()
      .append("circle")
        .attr("cx", 100)
        .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .attr("class", "legend")
        .style("fill", function(d){ return color(d)})

    leg.selectAll("legendlabels")
    .data(key)
    .enter()
    .append("text")
      .attr("class", "legend")
      .attr("x", 120)
      .attr("y", function(d,i){ return 100 + i*25})
      .style("fill", function(d){ return color(d)})
      .style("stroke", "#000000")
      .style("stroke-width", "1px")
      .text(function(d) {return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")




    render();

    // Projection method:
    // Project geojson coordinate to the map's current state

    function project(d) {
      return map.project(new mapboxgl.LngLat(d[0], d[1]));
    }

    //Render method redraws lines
    function render() {
      d3.selectAll(".circle")
        .attr("cx", function(d) {
          return project(d.geometry.coordinates).x;
        })
        .attr("cy", function(d) {
          return project(d.geometry.coordinates).y;
        });
    }

}
