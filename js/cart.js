
var cart_total;

$(document).on('pagebeforeshow', '#user_bucket', function(event){

	$.ajax({
		url : lb_server+"/cart/" + localStorage.getItem('id'),
		contentType : "application/json",
		success : function(data){
			var list = $('#bucket_list');


			//Clear the list beforehand
			list.empty();

			//Go over all the items that were fetched and create the appropiate list items
			for(var i = 0; i < data.items.length; i++)
			{
				list.append('<li data-icon="delete" id="'+data.items[i].listing_id+'" item_id="' + data.items[i].item_id +'" item_name="' + data.items[i].item_name+'">'+
					'<a href="#item_confirmation_dialog" data-rel="dialog"><img src="'+ data.items[i].item_image +'"/>'+
					'<p class="ui-li-aside"><strong>$'+ data.items[i].price+'</strong></p>'+
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




$(document).on('click', '#bucket_list li', function()
{	console.log("CLICKED");

	$('#cart_prompt_title').html($(this).attr('item_name'));

	$.mobile.changePage('#delete_cart_prompt');

		sessionStorage.setItem('item_id',$(this).attr('item_id'));

	$('#view_cart_listing').unbind('click').bind('click', function()
	{
		$.mobile.changePage('#itempage');
	});

	sessionStorage.setItem('delete_listing_cart', $(this).attr('id'));

	$('#delete_cart_listing').unbind('click').bind('click', function()
	{	
		  $.mobile.showPageLoadingMsg(); 



		$.ajax({

  type: "DELETE",
                url: lb_server + "/drop_from_bucket",
                data: {user_id : localStorage.getItem('id'), listing_id : sessionStorage.getItem('delete_listing_cart')},

                success: function(data)
                {
                        console.log("ITEM DELETED");
                        $('#open_bucket').click();
                          $.mobile.hidePageLoadingMsg(); 


                },
                error: function(data)
                {
  $.mobile.hidePageLoadingMsg(); 
                }



                });

	})







});


