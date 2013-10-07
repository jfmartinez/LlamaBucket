
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

				list.append('<li data-icon="delete" id="'+data.content[i].name+'">'+
					'<a href="#item_confirmation_dialog" data-rel="dialog"><img src="'+ data.content[i].image +'"/>'+
					'<p class="ui-li-aside"><strong>$'+ data.content[i].price+'</strong></p>'+
					'<h5 style="font-size: 12px;">'+data.content[i].name+'</h5>'+
					'<p>' + data.content[i].description + '</p>'+
				
					'</a></li>'

					);
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');

			cart_total.empty();
			item_count.empty();
			cart_total.append("<p class=\"ui-li-right\" style=\"float:right; font-size:12px; \">Total: $"+cart_prices + "</p>");
			item_count.append("<p style=\"font-size: 12px;\">Number of Items:  " + (length ) +"</p>");
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
			var total_id = $('#total_id');
			var total = $('#total');



			for(var i = 0; i < length; i++)
			{

				sub_total += data.content[i].price;
			}
			
			sub_total_list.empty();
			sub_total_amount.empty();


			total_id.empty();
			total.empty();

			$('#user_address').empty();
			$('#checkout_items').empty();
			sub_total_list.append("<p style=\"font-size:12px\" id=\"hello_world\">Subtotal ( "+length+" items ): <br /> Shipping: </p>");
			sub_total_amount.append("<p style=\"font-size:12px\">$"+ sub_total+".00 <br /> $2.00</p>");



			total_id.append("<p style=\"font-size:12px\">Total</p>");
			total.append("<p style=\"font-size:12px\">$"+ (sub_total + 2)+".00</p>");

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




