
var w = 500;
var h = 400;
var barPadding = 3;
var padding = 40; // extra padding for axis labels

var maxValue = 10;
var dataset = [14,5,26,23,9,10,28,3,7,13];



var svg = d3.select("#chart")  // Select the specific div")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "slategrey")
            

 // Function to update the bar chart
 function updateChart() {
    var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([padding, w - padding])
            .paddingInner(0.1);

    var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset) ])
            .range([h - padding, padding ]);


    var bars = svg.selectAll("rect")
        .data(dataset);

     
    // Enter new bars
    bars.enter()
        .append("rect")
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", h - padding)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", "slategrey") // set the initial color
        .merge(bars) // Merge enter and update selections
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()   //smooth transition
                .duration(50)
                .attr("fill", "orange") //change color when hover
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;   // Center the text horizontally
                var yPosition = parseFloat(d3.select(this).attr("y")) + 20; // Adjust yPosition to make sure text stays inside the bar
            
            svg.append("text")  //append the tooltip text
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle") // Center the text
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(d);
            })
        .on("mouseout", function() {
            d3.select("#tooltip").remove() // Remove the tooltip when the mouse moves away
            d3.select(this)
                .transition() // Add smooth transition
                .duration(30)
                .attr("fill", "slategrey"); // Revert to original color
            })
        .transition()
        .duration(500)
        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", function (d) { return yScale(d); })
        .attr("height", function (d) { return h - padding - yScale(d); })
        .attr("width", xScale.bandwidth())  // Update the width of all bars
        .selection() 
        .append("title")  // add browser tooltip to display data value
        .text(function(d) {
            return "This value is " +d;
        });

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
        var newNumber = Math.floor(Math.random() * maxValue) +1;  // Generate a random number
        dataset.push(newNumber);  // Add the new number to the dataset
        updateChart()  // Update the chart
        
    });

    // Remove button functionality
    d3.select("#removebutton").on("click", function() {
        dataset.shift();
        updateChart();  // Update the chart
    });


