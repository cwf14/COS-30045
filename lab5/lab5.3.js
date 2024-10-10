
var w = 500;
var h = 300;
var barPadding = 3;
var padding = 40; // extra padding for axis labels

var maxValue = 10;
var dataset = [14,5,26,23,9,10,28,3,7,13];



var svg = d3.select("#chart")  // Select the specific div")
            .append("svg")
            .attr("width", w)
            .attr("height", h)

 // Function to update the bar chart
 function updateChart() {
    var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([padding, w - padding])
            .paddingInner(0.1);

    var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([h - padding, padding]);


    var bars = svg.selectAll("rect")
        .data(dataset);

     
    // Enter new bars
    bars.enter()
        .append("rect")
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", h - padding)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", "rgb(106,90,205)")
        .merge(bars) // Merge enter and update selections
        .transition()
        .duration(500)
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", function (d) { return yScale(d); })
        .attr("height", function (d) { return h - padding - yScale(d); })
        .attr("width", xScale.bandwidth());  // Update the width of all bars


     // Remove bars that are no longer needed
     bars.exit()
        .transition()
        .duration(500)
        .attr("x",w)
        .remove();
 }

     // Initial chart drawing
    updateChart();

    // Add button functionality
    d3.select("#addbutton").on("click", function() {
        var newNumber = Math.floor(Math.random() * maxValue);  // Generate a random number
        dataset.push(newNumber);  // Add the new number to the dataset
        updateChart()  // Update the chart
        
    });

    // Remove button functionality
    d3.select("#removebutton").on("click", function() {
        dataset.shift();
        updateChart();  // Update the chart
    });

