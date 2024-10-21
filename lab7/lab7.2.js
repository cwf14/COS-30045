
    var w = 300;
    var h = 300;
    var dataset = [5,6,1,2,4];

    // Define the outer and inner radii of the pie chart
    var outerRadius = w /2;   // Radius for the outer edge of the pie chart
    var innerRadius = 0;      // Radius for the inner edge

    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    // Create a pie layout function
    var pie = d3.pie();

    // Create an arc generator for the pie slices
    var arc = d3.arc()
                .outerRadius(outerRadius)  // Set the outer radius of the pie slices
                .innerRadius(innerRadius);   // Set the inner radius (0 for a pie chart)

    // Define a color scale to fill pie slices with different colors
    var color = d3.scaleOrdinal(d3.schemeCategory10);


    // Create groups for each slice and position them using the arc's center
    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))   // Bind the dataset to the pie layout
                    .enter()
                    .append("g")
                    .attr("class", "arc")   // Add class for styling
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")"); // Move each arc group to the center of the chart

    // Append path elements (the pie slices) to each group
    arcs.append("path")
        .attr("fill", function(d, i) {  // Fill each slice with a different color
            return color(i);
        })
        .attr("d", function(d, i) {    // Use the arc generator to define the path for each slice
            return arc(d, i);
        });


    // Append text labels to each slice
    arcs.append("text")
        .text(function(d) {  // Add the value of each slice as text
            return d.value;
        })
        .attr("transform", function(d) {
            return "translate(" +arc.centroid(d) + ")";
        });

  

