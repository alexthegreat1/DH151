// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 2;
let path = "data/meteorite-landings-sorted-by-mass.csv";
let markers = L.featureGroup();

// initialize
$(document).ready(function () {
	createMap(lat, lon, zl);
	readCSV(path);
});

// create the map
function createMap(lat, lon, zl) {
	map = L.map("map").setView([lat, lon], zl);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);
}

// function to read csv data
function readCSV(path) {
	Papa.parse(path, {
		header: true,
		download: true,
		preview: 1000, // preview of 5000 points out of 45,000 b/c hangs otherwise
		complete: function (data) {
			console.log(data);

			// map the data
			mapCSV(data);
		},
	});
}

function mapCSV(data) {
	// circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: "white",
		fillColor: "dodgerblue",
		fillOpacity: 1,
	};

	// loop through each entry
	data.data.forEach(function (item, index) {
		// create a marker
		let marker = L.circleMarker([item.reclat, item.reclong], circleOptions).on(
			"mouseover",
			function () {
				this.bindPopup(
					`<h3>${item.name}</h3><p><strong>Mass (g): </strong>${item.mass}</p>`
				).openPopup();
			}
		);

		// add marker to featuregroup
		markers.addLayer(marker);

		// add entry to sidebar
		$(".sidebar").append(
			/*html*/`<div class="sidebar-item" onmouseover="panToImage(${index})">
				<p>${item.name}</p>
			</div>`
		);
	});

	// add featuregroup to map
	markers.addTo(map);

	// fit map to markers
	// map.fitBounds(markers.getBounds());
}

function panToImage(index) {
	// zoom to level 17 first
	map.setZoom(8);
	// pan to the marker
	map.panTo(markers.getLayers()[index]._latlng);
}
