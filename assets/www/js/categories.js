var feedUrl = "http://ec2-75-101-174-29.compute-1.amazonaws.com";

function generalFailure() {
	navigator.notification.alert('An unexpected error has occured!');
}

function unzip(that) {
	$(that).parent().parent().find(".descbox").toggleClass("hidden");
	$(that).parent().parent().find(".orangebutton").toggleClass("hidden");
}

function initCategories(category_name,latitude, longitude) {
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
			
			if (!data.res) {
				$(".loadinggif").css("display", "none");
				$(".loadingtext").html(data.error);
				return;
			}
			
			$(".loading").addClass("hidden");
			var ads = data.ads;
			for (i = 0; i < ads.length; i++) {
				var ad = ads[i];
				
				var title = ad.title;
				if (title.length > 22) {
					title = title.substring(0,20) + "..";
				}
				
				var description = ad.description;
				if ($.trim(description).length == 0) {
					description = "No description for this post.";
				}
				
				var p1 = new LatLon(latitude, longitude);
				var p2 = new LatLon(ad.location.latitude, ad.location.longitude);
				var dist = p1.distanceTo(p2) * 1000;
				
				var container = $(".specialcontainer2").clone().removeClass("specialcontainer2").removeClass("hidden").addClass("itemcontainer");
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
				$(".specialcontainer2").before(container);
			}
			
		},
	});
}

$(document).ready(function() {
	$(".catgraybox > p").live("click", function(e) {
		var title = $(this).text();
		e.preventDefault();
		$(".catholder").addClass("hidden");
		$(".loading").removeClass("hidden");
		
		navigator.geolocation.getCurrentPosition(function(position) {
			initCategories(title ,position.coords.latitude, position.coords.longitude);
		},generalFailure);
	})
});