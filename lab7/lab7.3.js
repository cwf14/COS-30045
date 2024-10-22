var w = 300;
var h = 300;
var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

// Define SVG container (increase width to fit the chart and legend)
var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w + 100)  // Add space for the legend
            .attr("height", h);

// Stack the data for 'grapes', 'oranges', and 'apples' columns in reverse order
var series = d3.stack()
    .keys(["grapes", "oranges", "apples"])  // Reverse order so 'grapes' (blue) is at the bottom
    (dataset);

// Define Scales, position the bars horizontally
var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .range([0, w])
                .padding(0.1);

// Define Scale, the heights of the bars based on the total values
var yScale = d3.scaleLinear()
                .domain([0,d3.max(dataset, function(d) {
                    return d.apples + d.oranges + d.grapes;
                })])
                .range([h,0]);

// Define a custom color scale for 'apples' (green), 'oranges' (orange), and 'grapes' (blue)
var color = d3.scaleOrdinal()
              .domain(["apples", "oranges", "grapes"])
              .range(["#2ca02c", "#ff7f0e", "#1f77b4"]);    // color for the stack bar chart

// Create groups for each stack
var groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", function(d) {
                    return color(d.key);  // Use the stack key to match colors
                });

// Add rectangles for each stack segment
var rects = groups.selectAll("rect")
                    .data(function(d) { return d; })
                    .enter()
                    .append("rect")
                    .attr("x", function(d,i) {
                        return xScale(i);
                    })
                    .attr("y", function(d,i) {
                        return yScale(d[1]);
                    })
                    .attr("height", function(d) {
                        return yScale(d[0]) - yScale(d[1]);
                    })
                    .attr("width", xScale.bandwidth());

// Create the legend to the right of the chart
var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                    return "translate(" + (w + 10) + "," + (i * 20) + ")";  // Position to the right of the chart
                });

// Add colored rectangles for the legend
legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

// Add text labels for the legend
legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
