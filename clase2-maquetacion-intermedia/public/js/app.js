(function() {
	/*function tipo1(){
		console.log("funcion tipo 1");
	}

	tipo1();

	var tipo2 = function(){
		console.log("funcion tipo 2");
	}

	tipo2();*/

	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
	var mapOptions = {
		zoom: 12,
		center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"Hello World!"
	});

// To add the marker to the map, call setMap();
marker.setMap(map);
})();