//Find search results and display them as a list
$(document).on('pagebeforeshow', '#searchResults', function(event){

	//Check to see if there is a parameter being passed from the sessionStorage
	if(sessionStorage.getItem('parameter'))
	{
		//Filtering by categories.
		var parameter = sessionStorage.getItem('parameter');

		//Reset the local storage, for later user. 
		sessionStorage.clear();

		
		$.ajax({
		url : "http://localhost:5000/search/category="+parameter,
		contentType : "application/json",
		success : function(data){
			var list = $('#results');
			var length = data.content.length;
			
			//Clear the list beforehand
			list.empty();

			

			//Go over all the items that were fetched and create the appropiate list items
			for(var i = 0; i < length; i++)
			{


					list.append("<li id=\""+
					data.content[i].item_id+"\"><a href=\"#\"><div class=\"ui-grid-b\"><div class=\"ui-block-a\"><img src=\""+
					data.content[i].item_image+"\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+
					data.content[i].item_name+"</h5><p>"+
					data.content[i].item_description+"</p></div><div class=\"ui-block-c\"><h6 align=\"center\"> Buy: $"+
					data.content[i].price+"</h6></div></div></a></li>");
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');
		},
		error : function(data){
			console.log("Serach results not available");
		}
	});


	}
	else if(sessionStorage.getItem('search_parameter'))
	{
		var search_parameter = sessionStorage.getItem('search_parameter');
		sessionStorage.clear();

		$.ajax({
			url : "http://localhost:5000/search/item_name="+search_parameter,
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

					var t = $('<li id="' + data.content[i].item_id + '"></li>');
					
					
					var link = $('<a href="#"></a>');
					


					var img = $('<img height="100%" />');
					img.attr('src', data.content[i].item_image);
					console.log(data.content[i].item_name);
					console.log(img);

					var div = $('<div class="search_div_attribute" style="width:66%;"></div>');
					var heading = $('<p></p>');
					heading.html(data.content[i].item_name);
					div.append(heading);



					var div2 = $('<div class="search_div_attribute" style="width: 33%;"></div>');

					var type = $('<p></p>');
					
					


					var type_boolean = data.content[i].is_auction;
					console.log(type_boolean);


					if(type_boolean == "both"){

					type.html("Both");
					div.append(type);
					var buy = $('<p style="color: blue;">US $</p>');
					var buy_span = $('<span></span>');
					buy_span.html(data.content[i].price_buy);
					buy.append(buy_span);
					div2.append(buy);


					var bid = $('<p style="color: blue;">US $</p>');
					var bid_span = $('<span></span>');
					bid_span.html(data.content[i].price_bid);

					bid.append(bid_span);
					div2.append(bid);
					}

					else if(type_boolean == "bid")
					{
					type.html("Bid");
					div.append(type);
					var bid = $('<p style="color: blue;">US $</p>');
					var bid_span = $('<span></span>');
					bid_span.html(data.content[i].price_bid);

					bid.append(bid_span);
					div2.append(bid);
					console.log("Bid Hello!");


					}

					else if(type_boolean == "buy")
					{

					type.html("Buy");
					div.append(type);
					var buy = $('<p style="color: blue;">US $</p>');
					var buy_span = $('<span></span>');
					buy_span.html(data.content[i].price_buy);
					buy.append(buy_span);
					div2.append(buy);


					}
										link.append(img);

					link.append(div);
					link.append(div2);
				
					t.append(link);
					


					// list.append('<li id="'+ data.content[i].item_id + '"><a href=')
					list.append(t);
					console.log(t);
					console.log(list);

					// list.append("<li id=\""+data.content[i].item_id+"\"><a href=\"#\"><div class=\"ui-grid-b\"><div class=\"ui-block-a\"><img src=\""+
					// 	data.content[i].item_image+"\" height=\"60\" width=\"60\"></div><div class=\"ui-block-b\"><h5>"+
					// 	data.content[i].item_name+"</h5><p>"+data.content[i].description+"</p></div><div class=\"ui-block-c\"><h6 align=\"center\"> Buy: $"+
					// 	data.content[i].price+"</h6></div></div></a></li>");
				}

				//Refresh the ul so that all elements are views properly.
				list.listview('refresh');
			},
			error : function(data)
			{
				console.log('Failed to load')
			}
		});
	}
});

//Fetch the categories before loading the page
$(document).on('pagebeforeshow', '#categories', function(event)
{

	$.ajax
	({
		url : "http://localhost:5000/categories",
		contentType : "application/json",
		success : function(data)
		{
			var list = $('#categories-list');

			//Clear the list
			list.empty();

			for(var i = 0; i < data.content.length; i++)
			{
				if(data.content[i].parent_id == null)
				{
					list.append('<li data-icon=\"arrow-r\" data-iconpos=\"right\" value=\"'+data.content[i].cat_id+'\"><a href=\"#\">'+data.content[i].category_name+'</a></li>')
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
	sessionStorage.setItem('search_parameter', user_input);
	$.mobile.changePage('#searchResults');
	
});


//Show the subcategories, no matter how many there are.
$(document).on('click', '#categories-list li', function()
{
	var parent_category = $(this).attr('value');
	$.ajax
	({
		url : "http://localhost:5000/categories/" +parent_category,
		contentType : "application/json",
		success : function(data)
		{
			//Check to see if there are more subcategories
			//If there are none, redirect to the results page.
			if(data.content.length == 0)
			{
				//There are no more subcategories, go to the search results.
				sessionStorage.setItem('parameter', parent_category);
				$.mobile.changePage($('#searchResults'));

			}
			//If there are more subcategories, create the page,
			// Inject it into the index.html page, and display it.
			else
			{
				//Add correctly the information in the subcategories page
				var page_content = $("#subcategories_content")

				page_content.children().attr('id', data.parent_name + '-categories');


				// $("body").append("<div data-role=\"page\" id=\""+
				// 	data.parent_name+"\" data-url=\""+data.parent_name+"\"><div data-role=\"header\"><h3>"+
				// 	data.parent_name+"</h3><a href=\"\" data-rel=\"back\"> Back</a></div><div data-role=\"content\"><ul data-role=\"listview\" id=\""+
				// 	data.parent_name+"-categories\" class=\"ui-li-icon\"></ul></div></div></div>")
				

				var list = $("#"+data.parent_name+"-categories");

				//Clear the list
				list.empty();

				//Fill the page list with the page elements.
				for(var i = 0; i < data.content.length; i++)
				{
					if(data.content[i].parent_id == parent_category)
					{
						list.append('<li data-icon=\"arrow-r\" data-iconpos=\"right\" value=\"'+data.content[i].cat_id+'\"><a href=\"#\">'+data.content[i].category_name+'</a></li>')
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
				$.mobile.changePage($('#subcategories'));
			}
		},
		error : function(data)
		{
			console.log("Sub categories not found");
		}
	})
});



