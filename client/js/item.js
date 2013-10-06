$(document).on('pagebeforeshow', '#itempage', function(event, ui){
	
	var item_id = localStorage.getItem('item_id');
	localStorage.clear();
	$('#itemcontent').empty();
	$.ajax({
		url : "http://localhost:3000/item/"+item_id,
		contentType : "application/json",
		success : function(data){
			$('#itemcontent').append('<div class="ui-grid-a"><div class="ui-block-a"><img src="' + data.image + '" id="itemimage" height=150px width=150px></div><div class="ui-block-b"><h4 id="itemprice">' + data.price + '</h4><button data-role="button">Buy</button><h4>Bid now!</h4><button data-role="button">Bid</button></div></div><div><h3 id="itemname">' + data.name + '</h3><h5 id="itemdesc">' + data.description + '</h5><h5 id="itemgeneral">' + data.general + '</h5><h5 id="itemyear">Year: ' + data.year + '</h5><h5 id="itemcat"><strong>' + data.category+ '</strong></h5></div>');

		},

		error : function(data){
			console.log("Item could not be loaded. (item.js)");
		}
	});
});

$(document).on('click', '#results li', function(event)
{
	var parameter = $(this).attr('id');
	localStorage.setItem('item_id', parameter);
	$.mobile.changePage('#itempage');
});