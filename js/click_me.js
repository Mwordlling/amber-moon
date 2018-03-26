/**
 * Created by yevheniia on 26.03.18.
 */
var width = 20;
var height = 20;

var div = d3.select("#figure1")
    .append('div')
    .style("position", "absolute")
    .attr('class', "click_me");

div.append('p')
    .html("click me")
    .attr('class', "click_me");

var svg = div.append('svg')
    .attr("width", width)
    .attr("height", height);

svg.append("line")
    .style("stroke", "white")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 10)
    .attr("y2", 10);

svg.append("line")
    .style("stroke", "white")
    .attr("x1", 0)
    .attr("y1", 20)
    .attr("x2", 10)
    .attr("y2", 10);


var div_m = d3.select("#figureM1")
    .append('div')
    .style("position", "absolute")
    .attr('class', "click_me");

div_m.append('p')
    .html("click me")
    .attr('class', "click_me");

var svg_m = div_m.append('svg')
    .attr("width", width)
    .attr("height", height);

svg_m.append("line")
    .style("stroke", "white")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 10)
    .attr("y2", 10);

svg_m.append("line")
    .style("stroke", "white")
    .attr("x1", 0)
    .attr("y1", 20)
    .attr("x2", 10)
    .attr("y2", 10);
