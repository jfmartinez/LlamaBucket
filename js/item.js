$(document).on('pagebeforeshow', '#itempage', function(event, ui){
	
	var item_id = sessionStorage.getItem('item_id');
	sessionStorage.clear();
	$.ajax({
		url : "http://localhost:3000/item/"+item_id,
		contentType : "application/json",
		success : function(data){
			console.log(data);
			$('#itemimage').attr('src', data.image);
			$('#itemprice').html('<strong>Price: </strong>'+data.price);
			$('#itemname').html('<strong>Name: </strong>'+data.name);
			$('#itemdesc').html('<strong>Description: </strong>'+data.description);
			$('#itemgeneral').html('<strong>General: </strong>'+data.general);
			$('#itemyear').html('<strong>Year: </strong>'+data.year);
			$('#itemcat').html('<strong>Category: </strong>'+data.category);

		},

		error : function(data){
			console.log("Item could not be loaded. (item.js)");
		}
	});
});

$(document).on('click', '#results li', function(event)
{
	var parameter = $(this).attr('id');
	sessionStorage.setItem('item_id', parameter);
	$.mobile.changePage('#itempage');
});