function init() {
    var w = 600;
    var h = 300;
    var padding = 60; // Added padding for the chart

    var dataset;

    // Load data from CSV and format the date and number fields
    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1), // ensure date format
            number: +d.number  // Convert the number field to an integer
        };
    }).then(function(data) {
        dataset = data;   // Store the loaded data
        lineChart(dataset); // call lineChart once dataset is ready
        console.table(dataset, ["date", "number"]);
    });

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w + padding * 2) // Add padding to the width
                .attr("height", h + padding * 2) // Add padding to the height
                .append("g")
                .attr("transform", "translate(" + padding + "," + padding + ")"); // Shift chart for padding

    
     // Function to create the line chart
    function lineChart(dataset) {
        // Scales 
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) { return d.date; }),
                d3.max(dataset, function(d) { return d.date; })
            ])
            .range([0, w]); // Map to chart width

        // Y-axis scale (linear scale for numbers)
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })]) // Maximum value for y-axis
            .range([h, 0]);   // Map to chart height (flipped for y)

        // area generator
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })   // X-value for each data point
            //base line for area shape 
            .y0(function() { return yScale.range() [0]; })     // Base line for the area shape
            .y1(function(d) { return yScale(d.number); });   // Y-value for each data point

        // Append the area
        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "#31343c"); // Fill color for the area
    
        // Line generator
        var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.number); });
        
        // Append the path (line)
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")  // Class for styling
            .attr("d", line)  // Path description
            .attr("fill", "none")
            .attr("stroke", "slategrey")
            .attr("stroke-width", 0.5);

        // Add a dashed line at the half-million mark
        svg.append("line")
            .attr("class", "line halfMilMark")
            //start of line 
            .attr("x1", 0 )
            .attr("y1", yScale(500000))
            //end of line
            .attr("x2", w)
            .attr("y2", yScale(500000))
            .attr("stroke-dasharray", "4 4") // Dashed line style
            .attr("stroke", "red") // Add red color
        
        // Add text label for the half-million mark
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", 10)
            .attr("y", yScale(500000) - 7)  // Y position of text (slightly above the line)
            .attr("fill", "red") // Make the text red
            .text("Half a million unemployed");

        // Add the X Axis
        var xAxis = d3.axisBottom(xScale);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")") // Position x-axis at the bottom
            .call(xAxis);

        // Add the Y Axis
        var yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        
        }
}

window.onload = init;
