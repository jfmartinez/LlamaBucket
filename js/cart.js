
var cart_total;

$(document).on('pagebeforeshow', '#user_bucket', function(event){

	$.ajax({
		url : "http://localhost:5000/cart/" + localStorage.getItem('id'),
		contentType : "application/json",
		success : function(data){
			var list = $('#bucket_list');


			//Clear the list beforehand
			list.empty();

			//Go over all the items that were fetched and create the appropiate list items
			for(var i = 0; i < data.items.length; i++)
			{
				list.append('<li data-icon="delete" id="'+data.items[i].item_name+'">'+
					'<a href="#item_confirmation_dialog" data-rel="dialog"><img src="'+ data.items[i].item_image +'"/>'+
					'<p class="ui-li-aside"><strong>$'+ data.items[i].price_buy+'</strong></p>'+
					'<h5 style="font-size: 12px;">'+data.items[i].item_name+'</h5>'+
					'<p>' + data.items[i].item_description + '</p>'+
				
					'</a></li>'

					);
			}

			$("#bucket_items").html('Items: '+data.items.length);
			$("#bucket_subtotal").html('Bucket subtotal: $'+data.sum_price);
			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');

		},
		error : function(data){
			console.log("User bucket information not available");
		}
	});

});

$(document).on('click', '#bucket_checkout', function(event)
{
	//I can only press checkout button from the bucket, right?
	sessionStorage.setItem('bucket_id', localStorage.getItem('id'));
	$.mobile.changePage('#checkout');
});




