var feedUrl = "http://192.168.1.120:5000";

$(document).ready(function() {
	
});

function generalFailure() {
	navigator.notification.alert('An unexpected error has occured!');
}

function initFrontpage(latitude, longitude) {
	$(".loadingtext").html("Getting classified ads near you...");
	$.post(feedUrl + "/ad/list", {
		"long": longitude,
		"lat": latitude,
		"total": 25,
	}, function(data) {
		navigator.notification.alert('works!');
		var json_res = $.parseJSON(data);
		$(".loading").addClass("hidden");
	});
}

function initGPS() {
	navigator.geolocation.getCurrentPosition(function(position) {
		initFrontpage(position.coords.latitude, position.coords.longitude);
	},generalFailure);
}