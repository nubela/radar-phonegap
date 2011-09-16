var feedUrl = "http://192.168.0.193:5000/pointy/create";

$(document).ready(function() {
	//grabGPS();
});

/*
 * Preps and upload it via AJAX., parse result.
 */
function uploadPointy(imageData, position) {

	navigator.notification.alert('uploading!');
	$.post(feedUrl,
			{
				long: position.coords.longitude,
				lat: position.coords.latitude,
				image: imageData,
			},
			function(data) {
				var json_res = $.parseJSON(data);
				navigator.notification.alert(json_res.res);
			}
	);
	
}

function grabGPS() {
	navigator.geolocation.getCurrentPosition(function(position) {
		$(".gpscoord").html(position.coords.latitude+ " , " + position.coords.longitude);
	}, generalFailure);
}

function generalFailure() {
	navigator.notification.alert('Failure!');
}

/*
 * Grab picture and location, as per pointy's requirements.
 */
function addPointy() {
	navigator.camera.getPicture(function(imageData) {
		navigator.geolocation.getCurrentPosition(function(position) {
			uploadPointy(imageData, position);
		}, generalFailure);
	}, generalFailure, {
		quality : 50
	});
}