// Set up chart
var svgWidth = 560;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

var svg = d3
  .select("#heights")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from the combined_height_avg.csv file
d3.csv("/data/combined_height_avg.csv").then(function(hData) {

// Parse and convert to year values
  var parseTime = d3.timeParse("%Y");

  // Format the data
  hData.forEach(function(data) {
    data.Year = parseTime(data.Year);
    console.log(data.Year)
    data.Male_Height = +data.Male_Height;
    data.Female_Height = +data.Female_Height;
  });

  // Set up the scales for the chart
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(hData, d => d.Year))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 100]);

  // Determine max y value, the max of the Male_Height data
  var maleMax = d3.max(hData, d => d.Male_Height);

  // find the max of the Female_Height data
  var femaleMax = d3.max(hData, d => d.Female_Height);

  // var yMax = maleMax > femaleMax ? femaleMax : maleMax;
  var yMax;
  if (maleMax > femaleMax) {
    yMax = maleMax;
  }
  else {
    yMax = femaleMax;
  }


  // Use the yMax value to set the yLinearScale domain
  yLinearScale.domain([160, yMax]);

  // Set up the axes
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append the axes to the chartGroup
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Set up two line generators and append two SVG paths

  // Line generator for Male_Height data
  var line1 = d3.line()
    .x(d => xTimeScale(d.Year))
    .y(d => yLinearScale(d.Male_Height));

  // Line generator for Female_Height data
  var line2 = d3.line()
    .x(d => xTimeScale(d.Year))
    .y(d => yLinearScale(d.Female_Height));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(hData))
    .style("stroke", "blue")
    .style("stroke-width",2)
    .style("fill", "none")
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .data([hData])
    .append("path")
    .attr("d", line2)
    .style("stroke", "purple")
    .style("stroke-width",2)
    .style("fill", "none")
    .classed("line orange", true);

  //Append circles
     var circlesGroup = chartGroup.selectAll("circle")
     .data(hData)
     .enter()
     .append("circle")
     .attr("cx", d => xTimeScale(d.Year))
     .attr("cy", d => yLinearScale(d.Male_Height))
     .attr("r", "3")
     .attr("fill", "yellow")
     .attr("stroke-width", "0.5")
     .attr("stroke", "black");

//Axis Titles
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .text("Year");

    chartGroup.append("text")
    .attr("y", 0 - ((margin.left /2) + 10))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .text("Height (cm)");

 // Date formatter to display years nicely
 var dateFormatter = d3.timeFormat("%Y");

 // Initialize Tooltip
 var toolTip = d3.tip()
 .attr("class", "tooltip")
 .offset([80, -60])
 .html(function(d) {
   return (`<strong><h5>${dateFormatter(d.Year)}<strong><hr>${d.Male_Height}
   cm`);
 });

// Create the tooltip in chartGroup.
chartGroup.call(toolTip);

// Create "mouseover" event listener to display tooltip
circlesGroup.on("mouseover", function(d) {
 toolTip.show(d, this);
})
// Create "mouseout" event listener to hide tooltip
 .on("mouseout", function(d) {
   toolTip.hide(d);
 });

}).catch(function(error) {
  console.log(error);
});


  
