function init() {
    var w = 500;
    var h = 300;

    //create a geograhpic projection
    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2, h/2])
                        .scale(2450);
    //create a geopath generator that transform data into svg element
    var path = d3.geoPath()
                .projection(projection);

    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

    // load the data from csv
    d3.json("LGA_VIC.json").then(function(json) {
        svg.selectAll("path")
            .data(json.features)  //use feature array from the geojson object
            .enter()
            .append("path")
            .attr("d", path);   //define d as the path generator
    })

}

window.onload = init;




