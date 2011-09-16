var feedUrl = "http://192.168.1.120:5000";

function generalFailure() {
	navigator.notification.alert('An unexpected error has occured!');
}

function uploadAd(imageData, position, cat_id, email, title, desc, price) {
	var data= {
			long: position.coords.longitude,
			lat: position.coords.latitude,
			category: cat_id,
			email: email,
			price: price,
			image: imageData,
			description: desc,
			title: title,
		}
	
	
	$.ajax({
		url: feedUrl + "/ad/create",
		dataType: "json",
		type: "post",
		data: data,
		success: function(data) {
			navigator.notification.alert('You have successfully posted your ad!');
		}
	})
}

function snapAndSubmit() {
	if ((!$("#category").val()) || (!$("#email").val()) || (!$("#title").val()) || (!$("#price").val())) {
		navigator.notification.alert('You need to enter all fields.');
	}

	else {
		navigator.camera.getPicture(function(imageData) {
			navigator.geolocation.getCurrentPosition(function(position) {
				uploadAd(imageData, position, $("#category").val(), $("#email")
						.val(), $("#title").val(), $("#description").val(), $("#price").val());
			}, generalFailure);
		}, generalFailure, {
			quality : 50
		});
	}
}