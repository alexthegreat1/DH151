/**
 * @file Code for the Leaflet map
 * @author Alex Haddad <@alexthegreat1>
 */

// TODO: - add images
const cities = [
	{
		title: "Los Angeles, USA",
		description: "I was born in LA county and have lived here all my life.",
		imagePath: "assets/los-angeles.jpg",
		latitude: 34.052235,
		longitude: -118.243683,
	},
	{
		title: "Vancouver, CAN",
		description: "Visited when I was 13.",
		imagePath: "assets/vancouver.jpg",
		latitude: 49.2827,
		longitude: -123.1207,
	},
	{
		title: "Puerto Vallarta, MEX",
		description: "Visited twice, last time when I was 10.",
		imagePath: "assets/puerto-vallarta.jpg",
		latitude: 20.6534,
		longitude: -105.2253,
	},
	{
		title: "Paris, FRA",
		description: "Visited twice, last time when I was 16. Some of my dad's family lives here.",
		imagePath: "assets/paris.jpg",
		latitude: 48.8566,
		longitude: 2.3522,
	},
	{
		title: "Yerevan, ARM",
		description:
			"Visited three times, last time when I was 18. Most of my mom's family lives here.",
		imagePath: "assets/yerevan.jpg",
		latitude: 40.1872,
		longitude: 44.5152,
	},
];

var standard = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
var smooth = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png", {
	maxZoom: 20,
	attribution:
		'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
});
var smoothDark = L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
	{
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	}
);
var terrain = L.tileLayer(
	"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}",
	{
		attribution:
			'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		subdomains: "abcd",
		minZoom: 0,
		maxZoom: 18,
		ext: "png",
	}
);
// var hell = L.tileLayer(
// 	"https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}",
// 	{
// 		attribution:
// 			'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 		apikey: "<your apikey>",
// 		maxZoom: 22,
// 	}
// );
// var pioneer = L.tileLayer(
// 	"https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}",
// 	{
// 		attribution:
// 			'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 		apikey: "<your apikey>",
// 		maxZoom: 22,
// 	}
// );
// var matrix = L.tileLayer(
// 	"https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
// 	{
// 		attribution:
// 			'<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 		minZoom: 0,
// 		maxZoom: 22,
// 		subdomains: "abcd",
// 		accessToken: "<your accessToken>",
// 	}
// );
var night = L.tileLayer(
	"https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
	{
		attribution:
			'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
		bounds: [
			[-85.0511287776, -179.999999975],
			[85.0511287776, 179.999999975],
		],
		minZoom: 1,
		maxZoom: 8,
		format: "jpg",
		time: "",
		tilematrixset: "GoogleMapsCompatible_Level",
	}
);
var watercolor = L.tileLayer(
	"https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
	{
		attribution:
			'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		subdomains: "abcd",
		minZoom: 1,
		maxZoom: 16,
		ext: "jpg",
	}
);

var map = L.map("map", {
	layers: [standard],
});

var baseMaps = {
	Standard: standard,
	Light: smooth,
	"Smooth Dark": smoothDark,
	Terrain: terrain,
	Night: night,
	Watercolor: watercolor,
	// Hell: hell,
	// Pioneer: pioneer,
	// Matrix: matrix,
};

// create a feature group
let myMarkers = L.featureGroup();

// loop through data
cities.forEach(function (city, index) {
	let marker = L.marker([city.latitude, city.longitude]).bindPopup(/*html*/ `
			<h1>${city.title}</h1>
			<img src=${city.imagePath} width="300px" />
			<p>${city.description}</p>
		`);

	myMarkers.addLayer(marker);

	$(".sidebar").append(
		/*html*/ `<div class="sidebar-item" onclick="flyToIndex(${index})">${city.title}</div>`
	);
});

myMarkers.addTo(map);

// define layers
let layers = {
	"My Markers": myMarkers,
};

// add layer control box
L.control.layers(baseMaps, layers).addTo(map);

map.fitBounds(myMarkers.getBounds());

function flyToIndex(index) {
	map.flyTo([cities[index].latitude, cities[index].longitude], 12);
	myMarkers.getLayers()[index].openPopup();
}
