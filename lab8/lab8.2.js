function init() {
    var w = 500;
    var h = 350;

    //create a geograhpic projection
    var projection = d3.geoMercator()  
                        .center([145, -36.5]) 
                        .translate([w/2, h/2])
                        .scale(3000);

     //create a geopath generator that transform data into svg element
    var path = d3.geoPath()  
                .projection(projection);

    //define color
    var color = d3.scaleQuantize()
                .range(d3.schemePurples[9]);


    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    // Load the unemployment data from the CSV
    d3.csv("VIC_LGA_unemployment.csv").then(function(data) {
        // Set color domain based on unemployment values
        color.domain([
            d3.min(data, function(d) { return d.unemployed; }),
            d3.max(data, function(d) { return d.unemployed; })
        ]);
    
    
        d3.json("LGA_VIC.json").then(function(json) {

            //Merge the ag. data and GeoJSON
            //Loop through once for each ag. data value
            for (var i = 0; i < data.length; i++) {
                //Grab state name 
                var dataLGA = data[i].LGA;

                //Grab data value, and convert from string to float
                var dataValue = parseFloat(data[i].unemployed);

                //Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++) {
                    var jsonLGA = json.features[j].properties.LGA_name;

                    if (dataLGA == jsonLGA) {
                        //Copy the data value into the JSON
                        json.features[j].properties.value = dataValue;

                        //stop looking through the json
                        break;
                    }
                }
            }
        //Bind the updated geojson data to svg and color the regions
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                //Use color scale for the fille color based on unemployment value
                var value = d.properties.value;
                if (value) return color(value); else  return "#ccc";//if no data, use grey
            });
            
        //load VIC city data from csv 
         d3.csv("VIC_city.csv").then(function(data) {
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", 5)
                .style("fill", "red")
                .style("opacity", 0.75);
                });
            
        
        
    });
});


}

window.onload = init;




