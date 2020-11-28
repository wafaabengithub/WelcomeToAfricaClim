<!DOCTYPE html>
<html>
<head>
	
	<title>Choropleth Tutorial - Leaflet</title>
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

	<link rel="stylesheet" href="leaflet.css" />
	<script src="leaflet.js"></script>



	<style>
		#map {
			width: 1200px;
			height: 700px;
		}
		.info {
		    padding: 6px 8px;
		    font: 14px/16px Arial, Helvetica, sans-serif;
		    background: white;
		    background: rgba(255,255,255,0.8);
		    box-shadow: 0 0 15px rgba(0,0,0,0.2);
		    border-radius: 5px;
		}
		.info h4 {
		    margin: 0 0 5px;
		    color: #d11;
		}
	</style>

	
</head>
<body>

<div id='map'></div>

<script type="text/javascript" src="fin.geojson"></script>

<script type="text/javascript">

	var map = L.map('map').setView([33.976483, -6.870933], 4);


	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	/*var test1= L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);*/

	

	// get color depending on population density value
	function getColor(d) {
		return d == "01." ? '#fb9a99' :
		       d == "02." ? '#a6cee3' :
		       d == "03." ? '#1f78b4' :
		       d == "04." ? '#b2df8a' :
		       d == "05." ? '#33a02c' :
		       d == "06." ? '#e31a1c ' :
		       d == "07." ? '#fdbf6f' :
		       d == "08." ? '#ff7f00' :
		       d == "09." ? '#cab2d6' :
		       d == "10." ? '#6a3d9a' :
		       d == "11." ? '#ffff99' :
		       d == "12." ? '#b15928' :

							'#FFEDA0';
	}

	function Monstyle(feature) {
		return {
			weight: 2,
			opacity: 10,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.code_region)
		};
	}

	function highlightFeature(e) {
	    var layer = e.target;

	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 0.7
	    });

	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	        layer.bringToFront();
	    }
	        info.update(layer.feature.properties);

	}

	function resetHighlight(e) {
    	geojson.resetStyle(e.target);
    	    info.update();

	}
	function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
	function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Informations sur l\'état sanitaire des régions du Maroc le 22-10-2020</h4>' +  (props ?
        'code_region: <b>' + props.code_region  + '</b> <br />nom_region: <b>' + props.nom_region 
        + '</b> <br /> superficie_Km2: <b>' + props.superficie_Km2
        + '</b> <br /> population: <b>' + props.population 
        + '</b> <br /> total_des_cas: <b>' + props.total_des_cas 
        + '</b> <br /> cas_journaliers:  +<b>' + props.cas_journaliers
        + '</b> <br /> décès_journaliers:  +<b>' + props.décès_journaliers
        : ' Merci de mettre le cursuer sur la region');
};

info.addTo(map);

	var geojson = L.geoJson(wafaa, {
		style: Monstyle,
	    onEachFeature: onEachFeature,
}).addTo(map);

     

        // var overlayMaps = {
        //     "geojson": geojson,
        //  };

        // //var control = L.control.layers(baseMaps, overlayMaps)
        // var control = L.control.selectLayers(  overlayMaps)
        // control.addTo(map);



        L.marker([32.994156, -7.617428], {
		color: 'red',
		fillColor: '#d11',
		fillOpacity: 0.5
	}).addTo(map)
		.bindPopup("Le pic des nouveaux cas et décès! ");





		

</script>

</body>
</html>
