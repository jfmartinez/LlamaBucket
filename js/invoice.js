//Loads a page containing the invoice
$(document).on('pagebeforeshow', '#invoicepage', function(event)
{
	
});

$(document).on('click', '#invoicelist li', function(event, ui){
	var parameter = $(this).attr('id');
	sessionStorage.setItem('invoice_id', parameter);
	$.mobile.changePage('#invoicepage');

});

//Loads a page containing a list of invoices
$(document).on('pagebeforeshow', '#invoicelistpage', function(event, ui){
	$.ajax({
		url :lb_server+"/invoice",
		contentType : "application/json",
		success : function(data){
			var list = $('#invoicelist');
			list.empty();

			for(var i=0; i<data.length; i++){
				var entry = data[i];
				list.append('<li  id=\"' + entry.invoiceId + '\"><a href="#"><h2>Listing: ' + entry.item + '</h2>' + 
							'<p>Seller: ' + entry.seller + '</p>' + 
							'<p>' + entry.date + '</p>' + 
							'<p>' + entry.time + '</p>' + 
							'<p class="ui-li-aside">' + entry.price + '</p></a></li>');
			}

			list.listview('refresh');
		},
		error : function(data){
			console.log("Invoice list could not be loaded. (invoice.js)");
		}
	});
});