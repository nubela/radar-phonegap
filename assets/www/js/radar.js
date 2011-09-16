var feedUrl = "http://192.168.1.120:5000";

$(document).ready(function() {
	
	$(".go_categories")[0].addEventListener('touchstart',function(e) {
		 $(this).attr("src","images/categories_s.png");
	});
	
	$(".go_camera")[0].addEventListener('touchstart',function(e) {
		 $(this).attr("src","images/camera_s.png");
	});
	
	$(".go_user")[0].addEventListener('touchstart',function(e) {
		 $(this).attr("src","images/user_s.png");
	});
	
	$(".go_categories")[0].addEventListener('touchend',function(e) {
		 window.location="categories.html";
	});
	
	$(".go_user")[0].addEventListener('touchend',function(e) {
		 window.location="user.html";
	});
	
	$(".go_camera")[0].addEventListener('touchend',function(e) {
		 window.location="camera1.html";
	});
	
});

function generalFailure() {
	navigator.notification.alert('An unexpected error has occured!');
}

function initFrontpage(latitude, longitude) {
	$(".loadingtext").html("Getting classified ads near you...");
	
	var data= {
		"long": longitude,
		"lat": latitude,
		"total": 25,
	}
	
	$.ajax({
		url: feedUrl + "/ad/list",
		dataType: 'json',
		type: 'post',
		data: data,
		success: function (data) {
			$(".loading").addClass("hidden");
			var ads = data.ads;
			for (i = 0; i < ads.length; i++) {
				var ad = ads[i];
				
				var title = ad.title;
				if (title.length > 20) {
					title = title.substring(0,20) + "..";
				}
				
				var container = $(".specialcontainer").clone().removeClass("specialcontainer").removeClass("hidden").addClass("itemcontainer");
				$(container).find(".1").html(title);
				$(container).find(".price").html("$" + ad.price);
				$(container).find(".category").html(ad.category.name);
				$(container).find(".thumbimg").attr("src",feedUrl + "/static/uploads/" + ad.image);
				$(".specialcontainer").after(container);
			}
			
		},
	});
	
}


function initGPS() {
	navigator.geolocation.getCurrentPosition(function(position) {
		initFrontpage(position.coords.latitude, position.coords.longitude);
	},generalFailure);
}
