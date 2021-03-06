
//=======================================================================//
// User_store.js is responsible for managing client side user storelogic //
//=======================================================================//

var description;

//Displays the currently owned items and their respective offers to the user
$(document).on('pagebeforeshow', '#item_offers_page', function(event)
{


	var item_id = sessionStorage.getItem('item_id');
	console.log({client_id: localStorage.getItem('id'), item_id: item_id});

	$.ajax({



		type: "POST",
		url: lb_server+"/get_offers",
		data: {client_id: localStorage.getItem('id'), item_id: item_id},
		success: function(data)
		{

			var list = $('#item_offers');
			console.log(data);

			for(var i = 0; i < data.length; i++)
			{


				var date_fractions  =data[i].datetime.replace(/[TZ\:]/g, '-').split('-');
				var exp_date = new Date(date_fractions[0], date_fractions[1]-1, date_fractions[2], date_fractions[3], date_fractions[4], date_fractions[5]);
				list.append('<li><p><strong >Amount: US $ </strong>'+ data[i].bid_amount +'</p>'+
					'<p><strong>Email: </strong>' + data[i].email+'</p>'+
					'<p><strong>Name: </strong>' + data[i].client_firstname + ' ' + data[i].client_lastname +'</p>' +
					'<p><strong>Date: </strong>' +  exp_date +'</p>'+




					'</li><hr>');



			}
			list.listview('refresh');



		},
		error: function(data)
		{
			console.log(data);
		}


	});
});


//Initilizes the user store
$(document).on('pagebeforeshow', '#store', function(event){

		//Filtering by categories.
		var parameter = localStorage.getItem('id');

		//Reset the local storage, for later user. 
		sessionStorage.clear();
		console.log(parameter);

		
		$.ajax({
			url : lb_server+"/get_listings/"+parameter,
			contentType : "application/json",
			success : function(data){
				var list = $('#listings_list');
				var length = data.content.length;

				//Clear the list beforehand
				list.empty();

				//$('#category_heading').html(data.content[0].category_name);

				//Go over all the items that were fetched and create the appropiate list items

				list.append();

				for(var i = 0; i < length; i++)
				{	


					
					var t = $('<li id="' + data.content[i].item_id + '" ng-repeat="item in store | filter:search" ></li>');
					
					
					var link = $('<a href="#"></a>');
					


					var img = $('<img height="100%" />');
					img.attr('src', data.content[i].item_image);
					

					var div = $('<div class="search_div_attribute" style="width:66%;"></div>');
					var heading = $('<p style="vertical-align: middle; color:black"></p>');
					heading.html(data.content[i].item_name);
					div.append(heading);



					var div2 = $('<div class="search_div_attribute" style="width: 33%;"></div>');

					var type = $('<p style="color: orange;"></p>');
					
					


					var type_boolean = data.content[i].is_auction;


					if(type_boolean == "both"){

						type.html("Both");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].buyout_price);
						buy.append(buy_span);
						div2.append(buy);


						var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);

					}

					else if(type_boolean == "bid")
					{	

						type.html("Bid");
						div.append(type);
						var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);


					}

					else if(type_boolean == "buy")
					{

						type.html("Buy");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].price);
						buy.append(buy_span);
						div2.append(buy);


					}

					console.log(data.content[i].exp_date);


					//Gets the time left for the item
					var time_left = $('<p style="color: #2ecc71;"></p>');

					var date_fractions  =data.content[i].exp_date.replace(/[TZ\:]/g, '-').split('-');
					var exp_date = new Date(date_fractions[0], date_fractions[1]-1, date_fractions[2], date_fractions[3], date_fractions[4], date_fractions[5]);
					var current_date = new Date();

					var timeDiff = Math.abs(exp_date.getTime() - current_date.getTime());
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					console.log(current_date);
					time_left.html(diffDays + " days left");

					div.append(time_left);
					link.append(img);

					link.append(div);
					link.append(div2);

					t.append(link);
					





					// list.append('<li id="'+ data.content[i].item_id + '"><a href=')
					list.append(t);
					

				}

				//Refresh the ul so that all elements are views properly.
				list.listview('refresh');


			},
			error : function(data){
				console.log("Serach results not available");
			}
		});


});

//Adds listeners to the items in the list
$(document).on('click', '#listings_list li', function(event)
{
	var parameter = $(this).attr('id');
	sessionStorage.setItem('item_id', parameter);
	$.mobile.changePage('#manage_item_page');
});

//Initializes the item management page for the user
$(document).on('pagebeforeshow', '#manage_item_page', function(event, ui){
	
	var item_id = sessionStorage.getItem('item_id');
	$.ajax({
		url : lb_server+"/item/"+item_id,
		contentType : "application/json",
		
		success : function(data){
			
			description = data.item_description;
			item_name = data.item_name;


			$('#selling_price_tag').show();
			$('#selling_current_bidding').show()
			$('#selling_number_bids').show();
			$('#selling_buy_item').show();
			$('#selling_add_item_cart').show();
			$('#selling_bid_item').show();

			$('#selling_bid_price').html("US $"+ data.price);
			$('#selling_number_bids_count').html(data.bid_count);
			$('#selling_item_price').html("US $" + data.price);

			if(data.is_auction == "bid")
			{
				//For bidding
				$('#selling_price_tag').hide();
				$('#selling_buy_item').hide();
				$('#selling_add_item_cart').hide();
				$('#item_offers_button').show();

			}

			else if(data.is_auction == "buy"){
				$('#selling_current_bidding').hide()
				$('#selling_number_bids').hide();
				$('#selling_bid_item').hide();
				$('#item_offers_button').hide();





			}
			


			$('#selling_item_image').attr('src', data["item_image"]);
			$('#selling_item_brand').html(data.item_brand);
			$('#selling_item_category').html(data.category_name);
			$('#selling_item_year').html(data.item_year);
			$('#selling_item_id').html(data.item_id);
			$('#selling_item_seller').html(data.client_firstname + " " + data.client_lastname);
			$('#selling_item_header').html(data.item_name);
			$('#selling_item_location').html(data.city +", " + data.state + ", " + data.country );


			
		},

		error : function(data){
			console.log("Item could not be loaded. (item.js)");
		}
	});
});


//Remove option for the item
$(document).on('pagebeforeshow', '#remove_listing_store', function()
{
	$('#item_name_removal').html(item_name);



	$("#delete_listing_from_store").unbind('click').bind('click', delete_item_from_store);

});
function delete_item_from_store()
{	
	console.log("HELLO WORLD");
	var item_id = sessionStorage.getItem('item_id');

	
	$.ajax({

		type: "DELETE",
		url: lb_server + "/delete_item",
		data: {item_id : item_id},
		success: function(data)
		{

			console.log(data);
			$.mobile.changePage('#store');
		},
		error: function(data)
		{

			console.log(data);
		}

	})


}





