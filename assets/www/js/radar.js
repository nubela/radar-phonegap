var feedUrl = "http://192.168.1.120:5000";

function generalFailure() {
	navigator.notification.alert('An unexpected error has occured!');
}

$(document).ready(function() {
	$(".catgraybox > p").live("click", function(e) {
		e.preventDefault();
		navigator.notification.alert('worksie');
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
				$(container).find(".descbox").html(ad.description);
				$(container).find("a").attr("href", "mailto:"+ad.contact_email);
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


