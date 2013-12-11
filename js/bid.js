
$(document).on('click', '#bid_success', function()
{


	$.mobile.changePage('#itempage');
})
$(document).on('pagebeforeshow', '#bid_on_item', function()
{


	$('#item_bid_header').html($('#item_header').html());
	$('#current_bid_price_dialog').html($('#bid_price').html());

	$('#submit_bid').unbind('click').bind('click', submit_bid);
					$('#user_bid_amount_item').val("");





})



function send_error(message)
{


	$('#error_message').html(message);

	$('#error_popup').popup("open", function(){



	});
}

function submit_bid()
{	console.log("BUTTON HAS BEEN PRESSED");
	var current_bid = parseFloat($('#bid_price').html().replace(/[^0-9]+/g, ""));

	bid_amount = parseInt($('#user_bid_amount_item').val());
	//Initialize post data request
	var data = {};
	data.item_name = $('#item_header').html();
	data.bid_amount = parseFloat($('#user_bid_amount_item').val());
	data.user_id = parseInt(localStorage.getItem('id'));
	data.item_id = parseInt(sessionStorage.getItem('item_id'));
	console.log(data);
	$.ajax({
		type: "POST",
		url: lb_server + '/submit_bid',
		data: data,
		success : function(data)
		{
			console.log(data);
			if(data.issue == "bank")
			{
				send_error(data.message);
				$('#user_bid_amount_item').val("");

				//Display message about insufficient funds
			}
			else if(data.issue =="current price")
			{
				$('#current_bid_price_dialog').html("US $" + data.price);
				send_error(data.message);
				$('#user_bid_amount_item').val("");


			}
			else if(data.issue=="highest_bidder")
			{

				$('#user_bid_amount_item').val("");
				send_error(data.message);


			}
			else if(data.issue =="owner")
			{

				$('#user_bid_amount_item').val("");
				send_error(data.message);
			}

			else
			{

				console.log("SUCCESS");
				$('#item_bid_success').html($('#item_header').html());

				$.mobile.changePage('#bid_success');

			}


		},
		error: function(data)
		{


			console.log("ERROR SUBMITTING BID");
		}








	});



}