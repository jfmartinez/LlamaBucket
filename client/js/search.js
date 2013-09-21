//Find search results and display them as a list
$(document).on('pagebeforeshow', '#searchResults', function(event){
	$.ajax({
		url : "http://localhost:3000/search_results",
		contentType : "application/json",
		success : function(data){
			var list = $('#results');
			var length = data.content.length;
			
			//Clear the list beforehand
			list.empty();

			//Go over all the items that were fetched and create the appropiate list items
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

//Fetch the categories before loading the page
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
				if(data.content[i].parent == null)
				{
					list.append('<li data-icon=\"arrow-r\" data-iconpos=\"right\" value=\"'+data.content[i].id+'\"><a href=\"#\">'+data.content[i].category+'</a></li>')
				}
			}

			list.listview('refresh');
		},
		error : function(data)
		{
			console.log("no brego");
		}
	})
});

$(document).on('click', '#categories li', function()
{
	$.ajax
	({
		url : "http://localhost:3000/categories",
		contentType : "application/json",
		success : function(data)
		{
			var list = $(this);

			list.append('<ul data-role=\"listview\" id=\"\">')

			//Clear the list
			list.empty();

			for(var i = 0; i < data.content.length; i++)
			{
				if(data.content[i].parent == list.attr('value'))
				{
					list.append('<li data-icon=\"arrow-r\" data-iconpos=\"right\" value=\"'+data.content[i].id+'\"><a href=\"#\">'+data.content[i].category+'</a></li>')
				}
			}

			list.append('</ul>')

			list.listview('refresh');
		},
		error : function(data)
		{
			console.log("no brego");
		}
	})
});

