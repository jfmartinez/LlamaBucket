$(document).on('pagebeforeshow', '#searchResults', function(event){
	$.ajax({
		url : "http://localhost:3000/search_results",
		contentType : "application/json",
		success : function(data){
			var list = $('#results');
			var length = data.content.length;
			
			//Clear the list beforehand

			list.empty();

			for(var i = 0; i < length; i++)
			{
				list.append("<li><div class=\"ui-grid-b\"><div class=\"ui-block-a\"><img src=\""+ data.content[i].image+"\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+data.content[i].name+"</h5><p>"+data.content[i].description+"</p></div><div class=\"ui-block-c\"><h6 align=\"center\"> Buy: $"+data.content[i].price+"</h6></div></div></li>");
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');
		},
		error : function(data){
			console.log("No brego");
		}
	});
});

$(document).on('pagebeforeshow', '#categoriesView', function(event)
{
	$.ajax
	({
		url : "http://localhost:3000/categories",
		contentType : "application/json",
		success : function(data)
		{
			var list = $('#categories');

			//Clear the list
			list.empty();

			for(var i = 0; i < data.content.length; i++)
			{
				list.append('<li data-icon=\"arrow-r\" data-iconpos=\"right\"><a href=\"#\">'+data.content[i]+'</a></li>')
			}

			list.listview('refresh');
		},
		error : function(data)
		{
			console.log("error en categorias");
		}
	})
});