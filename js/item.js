
//=================================================================//
// Item.js is responsible for managing client side item page logic //
//=================================================================//


var description;

//Initializes the item page content for the client side 
$(document).on('pagebeforeshow', '#itempage', function(event, ui){
	
	var item_id = sessionStorage.getItem('item_id');
	$.ajax({
		url :lb_server + "/item/"+item_id,
		contentType : "application/json",
		
		success : function(data){
			console.log(data);
			console.log(data[0]);


			description = data.item_description;


			$('#price_tag').show();
			$('#current_bidding').show();
			$('#number_bids').show();
			$('#buy_item').show();
			$('#add_item_cart').show();
			$('#bid_item').show();

			$('#bid_price').html("US $"+ data.price);
			$('#number_bids_count').html(data.bid_count);
			$('#item_price').html("US $" + data.price);

			if(data.is_auction == "both" || data.is_auction =="bid")
			{
				//For bidding
				$('#price_tag').hide();
				$('#buy_item').hide();
				$('#add_item_cart').hide();

				if(data.is_auction == "both")
				{

					$('#buy_item').show();
					$('#item_price').html("US $" + data.buyout_price);
					$('#price_tag').show();

				}

			}

			else if(data.is_auction == "buy"){
				$('#current_bidding').hide()
				$('#number_bids').hide();
				$('#bid_item').hide();




			}
			






			$('#item_image').attr('src', data["item_image"]);
			$('#item_brand').html(data.item_brand);
			$('#item_category').html(data.category_name);
			$('#item_year').html(data.item_year);
			$('#item_id').html(data.item_id);
			$('#buy_item').attr('val', data.item_id);
			$('#item_seller').html(data.client_firstname + " " + data.client_lastname);
			$('#item_header').html(data.item_name);
			$('#item_location').html(data.city +", " + data.state + ", " + data.country );



		},

		error : function(data){
			console.log("Item could not be loaded. (item.js)");
		}
	});
});



//Displays a popup with the item description
$(document).on('pagebeforeshow', '#item_desc', function(event, ui){


	$('#item_desc_text').html(description);
});

//Add listeners for the items in a list
$(document).on('click', '#results li', function(event)
{
	var parameter = $(this).attr('id');
	sessionStorage.setItem('item_id', parameter);
	$.mobile.changePage('#itempage');
});

//Add lsiteners for the items sorted by categories
$(document).on('click', '#category_items li', function(event)
{
	var parameter = $(this).attr('id');
	sessionStorage.setItem('item_id', parameter);
	$.mobile.changePage('#itempage');
});

//Add listner for the items bidded
$(document).on('click', '#all_items_bidded li', function(event)
{

	var parameter = $(this).attr('id');
	sessionStorage.setItem('item_id', parameter);
	$.mobile.changePage('#itempage');
});


//Manages add to bucket option in the itempage
$(document).on('click', '#buy_add_check', function(event)
{
	var data_to_send = {
		name: $('#itemname').html().replace('<strong>Name: </strong>', ''),
		description: $('#itemdesc').html().replace('<strong>Description: </strong>', ''),
		image: $('#itemimage').attr('src'),
		price: $('#itemprice').html().replace('<strong>Price: </strong>', '')
	}

	$.ajax({
		type : "POST",
		url : lb_server+"/add_cart",
		data : data_to_send,
		success : function(data)
		{
			$.mobile.changePage('#user_bucket');
		},
		error : function(data)
		{
			console.log('no brego');
		}
	})
});


//Manages item viewing in the bucket
$(document).on('click', '#bucket_list li', function(event)
{
	var name_to_delete = $(this).attr('id');
	$('#remove_item').on('click', function(event)
	{
		$.ajax({
			type : "POST",
			url : lb_server+"/remove_from_cart",
			data : {name : name_to_delete},
			success : function(data)
			{
				$.mobile.changePage('#user_bucket');
			},
			error : function(data)
			{
				console.log('no brego');
			}
		})
	})
})