var feedUrl = "http://ec2-75-101-174-29.compute-1.amazonaws.com";

function generalFailure() {
	navigator.notification.alert('An unexpected error has occured!');
}

$(document).ready(function() {
	$(".catgraybox > p").live("click", function(e) {
		e.preventDefault();
		$(".catholder").addClass("hidden");
		$(".loading").removeClass("hidden");
		
		navigator.geolocation.getCurrentPosition(function(position) {
			initCategories($(this).text(),position.coords.latitude, position.coords.longitude);
		},generalFailure);
	})
});

function unzip(that) {
	$(that).parent().parent().find(".descbox").toggleClass("hidden");
	$(that).parent().parent().find(".orangebutton").toggleClass("hidden");
}

function initCategories(category_name,latitude, longitude) {
	navigator.notification.alert('worksie');
	$(".loadingtext").html("Getting "+category_name+" ads near you...");
	var data= {
			"long": longitude,
			"lat": latitude,
			"total": 25,
			"type": "categorized",
			"category": category_name,
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
				
				var description = ad.description;
				if ($.trim(description).length == 0) {
					description = "No description for this post.";
				}
				
				var container = $(".specialcontainer2").clone().removeClass("specialcontainer2").removeClass("hidden").addClass("itemcontainer");
				$(container).find(".1").html(title);
				$(container).find(".price").html("$" + ad.price);
				$(container).find(".category").html(ad.category.name);
				$(container).find(".thumbimg").attr("src",feedUrl + "/static/uploads/" + ad.image);
				$(container).find(".descbox").html(description);
				$(container).find("a").attr("href", "mailto:"+ad.contact_email);
				$(".specialcontainer2").after(container);
			}
			
		},
	});
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
		error: function (jqXHR, textStatus, errorThrown) {
			navigator.notification.alert("Error connecting to server.");
			$(".loadinggif").css("display", "none");
			$(".loadingtext").html("Server error, please try again later.");
		},
		success: function (data) {
			
			if (!data.res) {
				$(".loadinggif").css("display", "none");
				$(".loadingtext").html(data.error);
				return;
			}

			var ads = data.ads;

			$(".loading").addClass("hidden");
			for (i = 0; i < ads.length; i++) {
				var ad = ads[i];
				
				var title = ad.title;
				if (title.length > 22) {
					title = title.substring(0,20) + "..";
				}
				
				
				var p1 = new LatLon(latitude, longitude);
				var p2 = new LatLon(ad.location.latitude, ad.location.longitude);
				var dist = p1.distanceTo(p2) * 1000;
				
				var container = $(".specialcontainer").clone().removeClass("specialcontainer").removeClass("hidden").addClass("itemcontainer");
				$(container).find(".1").html(title);
				if (dist < 1000)
					$(container).find(".distance").html(String(dist) + "m");
				else 
					$(container).find(".distance").html(String(dist/1000) + "km");
				$(container).find(".price").html("$" + ad.price);
				$(container).find(".category").html(ad.category.name);
				$(container).find(".thumbimg").attr("src",feedUrl + "/static/uploads/" + ad.image);
				$(container).find(".desctitle").html(ad.title);
				$(container).find(".actualdesc").html(ad.description);
				$(container).find("a").attr("href", "mailto:"+ad.contact_email);
				$(container).find(".thumbimglink").attr("href",feedUrl + "/static/uploads/" + ad.image);
				$(".specialcontainer").before(container);
			}
			
		},
	});
	
}


function initGPS() {
	navigator.geolocation.getCurrentPosition(function(position) {
		initFrontpage(position.coords.latitude, position.coords.longitude);
	},generalFailure);
}


