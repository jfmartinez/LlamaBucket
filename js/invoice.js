//Loads a page containing the invoice
$(document).on('pagebeforeshow', '#invoicepage', function(event, ui){
	var invoice_id = sessionStorage.getItem('invoice_id');
	sessionStorage.clear();
	
	if(invoice_id == undefined)
	{

		invoice_id = 0;
	}

	$.ajax({
		url : "http://localhost:3000/invoice/"+invoice_id,
		contentType : "application/json",
		success : function(data){
			var invoice = $('#invoiceinfo');
			invoice.empty();
			invoice.append('<li>Invoice Number: ' + data.invoiceId + '</li>'+ 
				'<li>Buyer: ' + data.buyer + '</li>' + 
				'<li>Seller: ' + data.seller + '</li>'+ 
				'<li>Item: ' + data.item + '</li>' + 
				'<li>Price: ' + data.price + '</li>' + 
				'<li>Date: ' + data.date + '</li>' + 
				'<li>Time: ' + data.time + '</li></ul>');

			invoice.listview('refresh');
		},
		error : function(data){
			console.log("Invoice could not be loaded. (invoice.js)");
		}
	});
});

$(document).on('click', '#invoicelist li', function(event, ui){
	var parameter = $(this).attr('id');
	sessionStorage.setItem('invoice_id', parameter);
	$.mobile.changePage('#invoicepage');

});

//Loads a page containing a list of invoices
$(document).on('pagebeforeshow', '#invoicelistpage', function(event, ui){
	$.ajax({
		url : "http://localhost:3000/invoice",
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