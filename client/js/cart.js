
var cart_total;

$(document).on('pagebeforeshow', '#user_bucket', function(event){

	$.ajax({
		url : "http://localhost:3000/cart",
		contentType : "application/json",
		success : function(data){
			var list = $('#bucket_list');
			var item_count = $('#item_count');

			var length = data.content.length;
			var cart_total=$('#cart_total');
			//Clear the list beforehand
			list.empty();
			var cart_prices= 0;

			//Go over all the items that were fetched and create the appropiate list items
			for(var i = 0; i < length; i++)
			{
				cart_prices += data.content[i].price;
				list.append("<li><a href=\"#\"></a><div class=\"ui-grid-b\"><div class=\"ui-block-a\"> <img src=\"" + data.content[i].image + "\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+data.content[i].name + "</h5><p>" + data.content[i].description + "</p></div><div class=\"ui-block-c\"><h6 align=\"center\">Price: $"+data.content[i].price+"</h6></div></div><a href=\"#editItems\" data-rel=\"dialog\" data-position-to=\"window\" data-transition=\"pop\"></a></li>");
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');

			cart_total.empty();
			item_count.empty();
			cart_total.append("<p style=\"text-align: left !important;\">Total: $"+cart_prices + "</p>");
			item_count.append("<p>Number of Items: " + (length -1) +"</p>");
		},
		error : function(data){
			console.log("No brego");
		}
	});

});

// 
$(document).on('pagebeforeshow', '#checkout_address', function(event){

	
	$.ajax({
		url : "http://localhost:3000/checkout_address",
		contentType : "application/json",
		success : function(data)
		{
			var sub_total = 0;
			var sub_total_list = $('#sub_total');
			var sub_total_amount = $('#values');
			var item_count = 0;
			var length = data.content.length;



			for(var i = 0; i < length; i++)
			{

				sub_total += data.content[i].price;
			}
			console.log("Hello");

			sub_total_list.append("<p>Subtotal ( "+length+" items ): </p><p>Shipping: </p>");
			sub_total_amount.append("<p>$"+ sub_total+".00</p><p>$2.00</p>");
			$('#total_id').append("<p>Total</p>");
			$('#total').append("<p>$"+ (sub_total + 2)+".00</p>");

			$('#user_address').append("<p>"+data.address[0].address_one + "</p><p>" + data.address[0].address_two + "</p><p>" +data.address[0].city + ", " + data.address[0].zipcode + "</p><p>" +data.address[0].country +"</p>");
			for(var i = 0; i < length; i++)
			{
				$('#checkout_items').append("<li><a href=\"#\"></a><div class=\"ui-grid-b\"><div class=\"ui-block-a\"> <img src=\"" + data.content[i].image + "\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+data.content[i].name + "</h5><p>" + data.content[i].description + "</p></div><div class=\"ui-block-c\"><h6 align=\"center\">Price: $"+data.content[i].price+"</h6></div></div><a href=\"#editItems\" data-rel=\"dialog\" data-position-to=\"window\" data-transition=\"pop\"></a></li>");
			}	
			$('#checkout_items').listview('refresh');
					},
		error : function(data){
			console.log("No brego");
		}
	});

});





