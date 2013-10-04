//Find search results and display them as a list
$(document).on('pagebeforeshow', '#searchResults', function(event){

	//Check to see if there is a parameter being passed from the localStorage
	if(localStorage.getItem('parameter'))
	{
		//Filtering by categories.
		var parameter = localStorage.getItem('parameter');

		//Reset the local storage, for later user. 
		localStorage.clear();

		
		$.ajax({
		url : "http://localhost:3000/search/category="+parameter,
		contentType : "application/json",
		success : function(data){
			var list = $('#results');
			var length = data.content.length;
			
			//Clear the list beforehand
			list.empty();

			//Go over all the items that were fetched and create the appropiate list items
			for(var i = 0; i < length; i++)
			{
				list.append("<li id=\""+data.content[i].id+"\"><a href=\"#\"><div class=\"ui-grid-b\"><div class=\"ui-block-a\"><img src=\""+ data.content[i].image+"\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+data.content[i].name+"</h5><p>"+data.content[i].description+"</p></div><div class=\"ui-block-c\"><h6 align=\"center\"> Buy: $"+data.content[i].price+"</h6></div></div></a></li>");
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');
		},
		error : function(data){
			console.log("No brego");
		}
	});


	}
	else if(localStorage.getItem('search_parameter'))
	{
		var search_parameter = localStorage.getItem('search_parameter');
		localStorage.clear();

		$.ajax({
			url : "http://localhost:3000/search/item_name="+search_parameter,
			contentType : "application/json",
			success : function(data)
			{
				var list = $('#results');
				var length = data.content.length;
				
				//Clear the list beforehand
				list.empty();

				//Go over all the items that were fetched and create the appropiate list items
				for(var i = 0; i < length; i++)
				{
					list.append("<li id=\""+data.content[i].id+"\"><a href=\"#\"><div class=\"ui-grid-b\"><div class=\"ui-block-a\"><img src=\""+ data.content[i].image+"\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+data.content[i].name+"</h5><p>"+data.content[i].description+"</p></div><div class=\"ui-block-c\"><h6 align=\"center\"> Buy: $"+data.content[i].price+"</h6></div></div></a></li>");
				}

				//Refresh the ul so that all elements are views properly.
				list.listview('refresh');
			},
			error : function(data)
			{
				console.log('Dios da y Dios quita, aqui te quito.')
			}
		});
	}
});

//Fetch the categories before loading the page
$(document).on('pagebeforeshow', '#categories', function(event)
{

	$.ajax
	({
		url : "http://localhost:3000/categories",
		contentType : "application/json",
		success : function(data)
		{
			var list = $('#categories-list');

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

//Search by name
$(document).on('click', '#search_button', function(event)
{
	//get the user input, remove the whitespaces and convert to lower case.
	var user_input = $("#search_basic").val().toLowerCase().replace(/\s/g, '');
	localStorage.setItem('search_parameter', user_input);
	$.mobile.changePage('#searchResults');
	
});


//Show the subcategories, no matter how many there are.
$(document).on('click', '#categories-list li', function()
{
	var parent_category = $(this).attr('value');
	$.ajax
	({
		url : "http://localhost:3000/categories/" +parent_category,
		contentType : "application/json",
		success : function(data)
		{
			//Check to see if there are more subcategories
			//If there are none, redirect to the results page.
			if(data.content.length == 0)
			{
				//There are no more subcategories, go to the search results.
				localStorage.setItem('parameter', parent_category);
				$.mobile.changePage($('#searchResults'));

			}
			//If there are more subcategories, create the page,
			// Inject it into the index.html page, and display it.
			else
			{
				//Create a new page that will be the list of subcategories
				$("body").append("<div data-role=\"page\" id=\""+data.parent_name+"\" data-url=\""+data.parent_name+"\"><div data-role=\"header\"><h3>"+data.parent_name+"</h3><a href=\"\" data-rel=\"back\"> Back</a></div><div data-role=\"content\"><ul data-role=\"listview\" id=\""+data.parent_name+"-categories\" class=\"ui-li-icon\"></ul></div></div></div>")
				

				var list = $("#"+data.parent_name+"-categories");

				//Initialize the page
				$page = $('#'+data.parent_name+'');
				$page.page();

				//Clear the list
				list.empty();

				//Fill the page list with the page elements.
				for(var i = 0; i < data.content.length; i++)
				{
					if(data.content[i].parent == parent_category)
					{
						list.append('<li data-icon=\"arrow-r\" data-iconpos=\"right\" value=\"'+data.content[i].id+'\"><a href=\"#\">'+data.content[i].category+'</a></li>')
					}
				}

				//Refresh the list, this is so jQuery Mobile can apply its proper classes. 
				if ( list.hasClass('ui-listview')) {
					list.listview('refresh');
     			} 
				else {

    				list.trigger('create');
     			}



				//Change the ul ID, this is done in order for the function to work again.
				list.attr('id', 'categories-list');

				//Change to the newly created list.
				$.mobile.changePage($('#'+data.parent_name+''));
				}
		},
		error : function(data)
		{
			console.log("no brego");
		}
	})
});



