var w = 500;
var h = 300;
var barPadding = 3;
var padding = 40; // extra padding for axis labels

var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 7, 13];

// To shift the x scale properly             
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([padding, w - padding])
    .paddingInner(0.05);

// To shift the y scale properly  
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h - padding, padding]);

var svg = d3.select("#chart")  // Select the specific div
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Initial drawing of the bar chart
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return yScale(d); // Flip to bottom-left origin
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return h - padding - yScale(d);
    })
    .attr("fill", "rgb(106,90,205)");

// Add value text on top of each bar
svg.selectAll("text.value")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "value")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2; // Center text horizontally
    })
    .attr("y", function (d) {
        return yScale(d) - 5; // Position the text above the bar
    })
    .attr("text-anchor", "middle")
    .text(function (d) {
        return d;
    })
    .attr("fill", "black")
    .attr("font-size", "14px");


// Button click event to update data
d3.select("#updatebutton").on("click", function () {
    // Generate new random dataset
    var newData = [];
    for (var i = 0; i < dataset.length; i++) {
        var newNumber = Math.floor(Math.random() * 25);
        newData.push(newNumber);
    }

    // Update yScale domain based on new data
    yScale.domain([0, d3.max(newData)]);

    // Update all the rectangles in the chart
    svg.selectAll("rect")
        .data(newData)
        .transition()  // Add smooth transition
        .duration(500) // Duration of the transition
        .attr("y", function (d) {
            return yScale(d); // Flip to bottom-left origin
        })
        .attr("height", function (d) {
            return h - padding - yScale(d);
        });

    // Update the text on top of each bar
    svg.selectAll("text.value")
        .data(newData)
        .transition()  // Add smooth transition
        .duration(500) // Duration of the transition
        .attr("y", function (d) {
            return yScale(d) - 5; // Adjust text position above the bar
        })
        .text(function (d) {
            return d;
        });
});


