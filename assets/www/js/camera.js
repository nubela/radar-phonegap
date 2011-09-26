var feedUrl = "http://ec2-75-101-174-29.compute-1.amazonaws.com";

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
		error: function (jqXHR, textStatus, errorThrown) {
			navigator.notification.alert("Failed to contact server, please try again later.");
		},
		success: function(data) {
			if (data.res == false) {
				navigator.notification.alert(data.error);
			} else {
				navigator.notification.alert('You have successfully posted your ad!');
			}
		}
	})
}

function snapAndSubmit() {
	if ((!$("#category").val()) || (!$("#email").val()) || (!$("#title").val()) || (!$("#price").val())) {
		navigator.notification.alert('You need to enter all fields.');
	}

	else {
		navigator.camera.getPicture(function(imageData) {
			navigator.notification.alert('Uploading your image, feel free to browse other ads while this happens.');
			navigator.geolocation.getCurrentPosition(function(position) {
				uploadAd(imageData, position, $("#category").val(), $("#email")
						.val(), $("#title").val(), $("#description").val(), $("#price").val());
			}, generalFailure);
		}, generalFailure, {
			quality : 50
		});
	}
}