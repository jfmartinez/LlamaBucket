$(document).on('pagebeforeshow', '#invoicepage', function(event){

	$.ajax({
		url : "http://localhost:3000/invoice"+invoice_id,
		contentType : "application/json"
		success : function(data){
			$('#invoicecontent').append('<ul data-role="listview" id="invoiceinfo">'+
											'<li>Invoice Number: ' + data.invoiceId + '</li>'+
											'<li>Buyer : ' + data.buyer + '</li>' + 
											'<li>Seller :' + data.seller + '</li>'+
											'<li>')
		}



	})








});