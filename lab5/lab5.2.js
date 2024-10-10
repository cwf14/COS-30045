
var w = 500;
var h = 300;
var barPadding = 3;
var padding = 40; // extra padding for axis labels


var dataset = [14,5,26,23,9,10,28,3,7,13];


// To shift the x scale properly             
var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([padding, w - padding])
        .paddingInner(0.05);

// To shift the y scale properly  
var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([h - padding, padding]);

var svg = d3.select("#chart")  // Select the specific div")
            .append("svg")
            .attr("width", w)
            .attr("height", h)

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
            return  h - padding - yScale(d);
        })
        .attr("fill", "rgb(106,90,205)")
        .transition()
        .delay(function (d,i) {
            return i * 100;
        })
        .duration(500)
        .ease(d3.easeCubicInOut);

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

// Generate new random data
function generateNewData() {
    var newData = [];
    for (var i = 0; i < dataset.length; i++) {
        var newNumber = Math.floor(Math.random() * 25);  // Random numbers between 0 and 25
        newData.push(newNumber);
    }
    return newData;
}

// Update Once button functionality
d3.select("#updatebutton").on("click", function () {
    var newData = generateNewData();


// Update yScale domain based on new data
yScale.domain([0, d3.max(newData)]);

// Update all the rectangles in the chart
svg.selectAll("rect")
            .data(newData)
            .transition()  // Add smooth transition
            .delay(function (d, i) {
                    return i * 100;  // Delay each bar's transition slightly
            })
            .duration(500) // Duration of the transition
            .ease(d3.easeCubicInOut)  // Smooth transition easing
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
        .delay(function (d, i) {
            return i * 100;  // Delay each bar's transition slightly
        })
        .duration(500) // Duration of the transition
        .ease(d3.easeCubicInOut) 
        .attr("y", function (d) {
            return yScale(d) - 5; // Adjust text position above the bar
        })
        .text(function (d) {
            return d;
        });
    });


// Transition 1 button functionality
d3.select("#transition1").on("click", function () {
    var newData = generateNewData();

    yScale.domain([0, d3.max(newData)]);

    // Apply a different transition (e.g., longer delay, slower duration)
    svg.selectAll("rect")
        .data(newData)
        .transition()
        .delay(function(d, i) {
            return i * 200;  // Longer delay between each bar
        })
        .duration(1000)  // Slower transition
        .ease(d3.easeBounceOut)  // Different easing effect
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("height", function (d) {
            return h - padding - yScale(d);
        });

        // Update the text on top of each bar
        svg.selectAll("text.value")
        .data(newData)
        .transition()
        .delay(function(d, i) {
            return i * 200;  // Longer delay between each bar
        })
        .duration(1000)  // Slower transition
        .ease(d3.easeBounceOut)  // Different easing effect
        .attr("y", function (d) {
            return yScale(d) - 5; // Adjust text position above the bar
        })
        .text(function (d) {
            return d;
        });
});

// Transition 2 button functionality
d3.select("#transition2").on("click", function () {
    var newData = generateNewData();

    yScale.domain([0, d3.max(newData)]);

    // Apply another different transition (e.g., fading effect)
    svg.selectAll("rect")
        .data(newData)
        .transition()
        .duration(700)  // Faster transition
        .ease(d3.easeLinear)  // Linear easing
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("height", function (d) {
            return h - padding - yScale(d);
        })
        .attr("fill", "rgb(34,139,34)");  // Change color as part of transition
        
        // Update the text on top of each bar
        svg.selectAll("text.value")
        .data(newData)
        .transition()
        .duration(700)  // Faster transition
        .ease(d3.easeLinear)  // Linear easing
        .attr("y", function (d) {
            return yScale(d) - 5; // Adjust text position above the bar
        })
        .text(function (d) {
            return d;
        });
    });



