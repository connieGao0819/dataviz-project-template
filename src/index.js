// v0.2_11.03.2017
import {advertisingAndMarketing} from "./dataByIndustry.js"
import {businessProductsAndServices} from "./dataByIndustry.js"
import {computerHardware} from "./dataByIndustry.js"
import {construction} from "./dataByIndustry.js"
import {consumerProductsAndServices} from "./dataByIndustry.js"
import {education} from "./dataByIndustry.js"
import {energy} from "./dataByIndustry.js"
import {engineering} from "./dataByIndustry.js"
import {environmentalServices} from "./dataByIndustry.js"
import {financialServices} from "./dataByIndustry.js"
import {foodAndBeverage} from "./dataByIndustry.js"
import {governmentServices} from "./dataByIndustry.js"
import {health} from "./dataByIndustry.js"
import {humanResources} from "./dataByIndustry.js"
import {iTServices} from "./dataByIndustry.js"
import {logisticsAndTransportation} from "./dataByIndustry.js"
import {manufacturing} from "./dataByIndustry.js"
import {media} from "./dataByIndustry.js"
import {realEstate} from "./dataByIndustry.js"
import {retail} from "./dataByIndustry.js"
import {security} from "./dataByIndustry.js"
import {software} from "./dataByIndustry.js"
import {telecommunications} from "./dataByIndustry.js"
import {travelAndHospitality} from "./dataByIndustry.js"

$(".dropdown-menu button").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text());
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  $(this).addClass("selected")
});

// set fixed ratio

function getRatio(side) {
    return (( margin[side] / width ) * 100 + 1) + "%";
}

var margin = {left: 10, top: 10, right: 10, bottom: 10},
    width = 1080 - margin.left - margin.right,
    height = 680 - margin.top - margin.bottom,
    marginRatio = {
        left: getRatio("left"),
        top: getRatio("top"),
        right: getRatio("right"),
        bottom: getRatio("bottom")
    };

var svg_map = d3.select("div#map")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("padding", marginRatio.top + " " + marginRatio.right + " " + marginRatio.bottom + " " + marginRatio.left)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .attr("class", "graph-svg-placeholder");

// add base map

var projection = d3.geo.albersUsa()
    .scale(1400)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var g = svg_map.append("g")
    .style("stroke-width", "1px");

d3.json("./data/us.json", function (error, us) {
    if (error) throw error;
    g.selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "feature");
    g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function (a, b) {
            return a !== b;
        }))
        .attr("class", "mesh")
        .attr("d", path);
});


// add slider

var slider_x = d3.scaleLinear()
    .domain([2007, 2017])
    .range([0, 640 - margin.left - margin.right])
    .clamp(true);

var slider = svg_map.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + 350 + "," + 5 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", slider_x.range()[0])
    .attr("x2", slider_x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { updateYear(slider_x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 30 + ")")
    .selectAll("text")
    .data(slider_x.ticks(8))
    .enter().append("text")
    .attr("x", slider_x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 8);

// add circles on map

var property = "revenue",	// initialize data, default industry: Advertising & Marketing
    industry = advertisingAndMarketing,
    year = 2007,
    data = industry.filter(function(item){
    	return item.year === year;
    });

var location = svg_map.append("g");

function updateMap(data, property){

	data.forEach(function (d) {
	    d.latitude = +d.latitude;
	    d.longitude = +d.longitude;
	});

	var formatNumber = d3.format(",.0f");

	var maxProperty = Math.max.apply(Math, data.map(function (data) {
	    return data[property];
	}));

	var radius = d3.scale.sqrt()
	    .domain([0, maxProperty])
	    .range([1.5, 35]);

	d3.selectAll(".bubble").remove();
	d3.selectAll(".legend").remove();
	
	location = svg_map.append("g")
	    .attr("class", "bubble")
	    .selectAll("circle")
	    .data(data.sort(function (a, b) {
	        return b[property] - a[property];
	    }))
	    .enter()
	    .append("circle")
	    .attr("r", function (d) {
	        return radius(d[property]);
	    })
	    .attr("transform", function (d) {
	        var location = [];
	        location.push(d.longitude);
	        location.push(d.latitude);
	        var proLocation = projection(location);
	        return "translate(" + proLocation + ")";
	    })
	    .append("title")
	    .text(function(d) { return d.city + ", " + d.state
	                + "\nIndustry: " + d.industry
	                + "\nYear: " + d.year 
	                + "\nRevenue: " + formatNumber(d.revenue)
	                + "\nHeadcount: " + formatNumber(d.workers);
	    });

	var legend = svg_map.append("g")
	    .attr("class", "legend")
	    .attr("transform", "translate(" + (width - 50) + "," + (height - 20) + ")")
	    .selectAll("g")
	    .data([maxProperty / 6, maxProperty / 2, maxProperty])
	    .enter().append("g");

	legend.append("circle")
	    .attr("cy", function (d) {
	        return -radius(d);
	    })
	    .attr("r", radius);

	legend.append("text")
	    .attr("y", function (d) {
	        return -2 * radius(d);
	    })
	    .attr("dy", "1.3em")
	    .text(d3.format(".1s"));

	console.log(industry);
	console.log(property);
}

function updateYear(currentYear) {
    currentYear = Math.round(currentYear);	// year is selected year in slider
    handle.attr("cx", slider_x(currentYear));
    var data = industry.filter(function(item){	// return data (industry) of updated year
    	return item.year === currentYear;
    });
    updateMap(data, property);
    year = currentYear;
    console.log(currentYear);
}

function updateProperty(propertyID){
	switch (propertyID) {
		case "workers": property = "workers"; break;
		case "revenue": property = "revenue"; break;
	}
	updateYear(year);
}

function updateIndustry(industryID){	// not the best practice, will optimize later
	// on change industry, replace data (industry) with new industry
	// return updated data
	switch (industryID) {
		case "advertisingAndMarketing": industry = advertisingAndMarketing; break;
		case "businessProductsAndServices": industry = businessProductsAndServices; break;
		case "computerHardware": industry = computerHardware; break;
		case "construction": industry = construction; break;
		case "consumerProductsAndServices": industry = consumerProductsAndServices; break;
		case "education": industry = education; break;
		case "energy": industry = energy; break;
		case "engineering": industry = engineering; break;
		case "environmentalServices": industry = environmentalServices; break;
		case "financialServices": industry = financialServices; break;
		case "foodAndBeverage": industry = foodAndBeverage; break;
		case "governmentServices": industry = governmentServices; break;
		case "health": industry = health; break;
		case "humanResources": industry = humanResources; break;
		case "iTServices": industry = iTServices; break;
		case "logisticsAndTransportation": industry = logisticsAndTransportation; break;
		case "manufacturing": industry = manufacturing; break;
		case "media": industry = media; break;
		case "realEstate": industry = realEstate; break;
		case "retail": industry = retail; break;
		case "security": industry = security; break;
		case "software": industry = software; break;
		case "telecommunications": industry = telecommunications; break;
		case "travelAndHospitality": industry = travelAndHospitality; break;
	}
	updateYear(2007);	// update data (industry) to default year
}

var industryIDs = [
	"advertisingAndMarketing",
	"businessProductsAndServices",
	"computerHardware",
	"construction",
	"consumerProductsAndServices",
	"education",
	"energy",
	"engineering",
	"environmentalServices",
	"financialServices",
	"foodAndBeverage",
	"governmentServices",
	"health",
	"humanResources",
	"iTServices",
	"logisticsAndTransportation",
	"manufacturing",
	"media",
	"realEstate",
	"retail",
	"security",
	"software",
	"telecommunications",
	"travelAndHospitality"
	];

industryIDs.forEach(function(item){
	document.getElementById(item).addEventListener("click", function(){
		updateIndustry(item);
		// console.log(item);
	});
})

var propertyIDs = ["workers", "revenue"];

propertyIDs.forEach(function(item){
	document.getElementById(item).addEventListener("click", function(){
		updateProperty(item);
		// console.log(item);
	});
});


updateIndustry("advertisingAndMarketing");
