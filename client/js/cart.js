


$(document).on('pagebeforeshow', '#user_bucket', function(event){

	console.log("HELLO");
	$.ajax({
		url : "http://localhost:3000/cart",
		contentType : "application/json",
		success : function(data){
			var list = $('#bucket_list');
			var length = data.content.length;
			
			//Clear the list beforehand
			list.empty();

			//Go over all the items that were fetched and create the appropiate list items
			for(var i = 0; i < length; i++)
			{

				list.append("<li><a href=\"#\"></a><div class=\"ui-grid-b\"><div class=\"ui-block-a\"> <img src=\"" + data.content[i].image + "\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+data.content[i].name + "</h5><p>" + data.content[i].description + "</p></div><div class=\"ui-block-c\"><h6 align=\"center\">Buy:" +data.content[i].price+"</h6></div></div><a href=\"#editItems\" data-rel=\"dialog\" data-position-to=\"window\" data-transition=\"pop\"></a></li>");
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');
		},
		error : function(data){
			console.log("No brego");
		}
	});

})