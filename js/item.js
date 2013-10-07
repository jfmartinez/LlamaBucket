$(document).on('pagebeforeshow', '#itempage', function(event, ui){
	
	var item_id = sessionStorage.getItem('item_id');
	sessionStorage.clear();
	$.ajax({
		url : "http://localhost:3000/item/"+item_id,
		contentType : "application/json",
		
		success : function(data){
			$('#itemimage').attr('src', data.image);
			$('#itemprice').html('<strong>Price: </strong>'+data.price);
			$('#itemname').html('<strong>Name: </strong>'+data.name);
			$('#itemdesc').html('<strong>Description: </strong>'+data.description);
			$('#itemgeneral').html('<strong>General: </strong>'+data.general);
			$('#itemyear').html('<strong>Year: </strong>'+data.year);
			$('#itemcat').html('<strong>Category: </strong>'+data.category);
			$('#itemid').html('<strong>Product ID: </strong>'+data.product_id);

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
      url : "http://localhost:3000/add_cart",
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

$(document).on('click', '#bucket_list li', function(event)
{
	var name_to_delete = $(this).attr('id');
	$('#remove_item').on('click', function(event)
	{
		$.ajax({
      type : "POST",
      url : "http://localhost:3000/remove_from_cart",
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