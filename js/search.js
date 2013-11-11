//Find search results and display them as a list
$(document).on('pagebeforeshow', '#category_results', function(event){

		//Filtering by categories.
		var parameter = sessionStorage.getItem('parameter');

		//Reset the local storage, for later user. 
		sessionStorage.clear();

		
		$.ajax({
			url : "http://"+lb_server+"/search/category="+parameter,
			contentType : "application/json",
			success : function(data){
			var list = $('#category_items');
			var length = data.content.length;

				//Clear the list beforehand
				list.empty();

				$('#category_heading').html(data.content[0].category_name);

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
					var heading = $('<p style="vertical-align: middle; color:black"></p>');
					heading.html(data.content[i].item_name);
					div.append(heading);



					var div2 = $('<div class="search_div_attribute" style="width: 33%;"></div>');

					var type = $('<p style="color: orange;"></p>');
					
					


					var type_boolean = data.content[i].is_auction;
					console.log(type_boolean);


					if(type_boolean == "both"){

						type.html("Both");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].buyout_price);
						buy.append(buy_span);
						div2.append(buy);


						var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);

					}

					else if(type_boolean == "bid")
					{	

						type.html("Bid");
						div.append(type);
					var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);
						console.log("Bid Hello!");


					}

					else if(type_boolean == "buy")
					{

						type.html("Buy");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].price);
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
		error : function(data){
			console.log("Search results not available");
		}
	});


});

//Find search results and display them as a list
$(document).on('pagebeforeshow', '#searchResults', function(event){
	var search_parameter = sessionStorage.getItem('search_parameter');



	sessionStorage.setItem('type_filter', 'all');
	$.ajax({
		url : "http://"+lb_server+"/search/item_name="+search_parameter,
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
					var heading = $('<p style="vertical-align: middle; color:black"></p>');
					heading.html(data.content[i].item_name);
					div.append(heading);



					var div2 = $('<div class="search_div_attribute" style="width: 33%;"></div>');

					var type = $('<p style="color: orange;"></p>');
					
					


					var type_boolean = data.content[i].is_auction;
					console.log(type_boolean);


					if(type_boolean == "both"){

						type.html("Both");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].buyout_price);
						buy.append(buy_span);
						div2.append(buy);


						var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);

					}

					else if(type_boolean == "bid")
					{	

						type.html("Bid");
						div.append(type);
					var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);
						console.log("Bid Hello!");


					}

					else if(type_boolean == "buy")
					{

						type.html("Buy");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].price);
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

});

//Fetch the categories before loading the page
$(document).on('pagebeforeshow', '#categories', function(event)
{

	$.ajax
	({
		url : "http://"+lb_server+"/categories",
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
	sessionStorage.clear();

	if(user_input == "")
	{

		//Do NOthing
	}

	else{

	sessionStorage.setItem('search_parameter', user_input);
	$.mobile.changePage('#searchResults');
}
	
});
//$(document).on('click', '#'

//Show the subcategories, no matter how many there are.
$(document).on('click', '#categories-list li', function()
{
	var parent_category = $(this).attr('value');
	$.ajax
	({
		url : "http://"+lb_server+"/categories/" +parent_category,
		contentType : "application/json",
		success : function(data)
		{
			//Check to see if there are more subcategories
			//If there are none, redirect to the results page.
			if(data.content.length == 0)
			{
				//There are no more subcategories, go to the search results.
				sessionStorage.setItem('parameter', parent_category);
				$.mobile.changePage($('#category_results'));


			}
			//If there are more subcategories, create the page,
			// Inject it into the index.html page, and display it.
			else
			{
				//Add correctly the information in the subcategories page
				var page_content = $("#subcategories_content")
				$('#sub_category_title').html(data.parent_name);

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
	});
});

$( "#sort_panel" ).on( "panelopen", function( event, ui ) {



	
} );

 $( document ).ready( function() { 

$(document).on('pagebefore')

$('#item_type_filter_button').bind('click', function(event)
{	

	var radio_buttons = $("input[name='item_type_filter']");
	for(var i = 0; i < radio_buttons.length; i ++)
	{

		if(radio_buttons[i].value == sessionStorage.getItem('type_filter'))
		{
			radio_buttons[i].checked = true;
		}
	}


	$('input[name="item_type_filter"]').checkboxradio('refresh');






});


 	  $("input[name='item_type_filter']" ).bind( "click", function(event)
 	  {


 	  		sessionStorage.setItem('type_filter', $(this).val());
 	  		console.log($(this).val());



 	  });

     $("#filter_by_price" ).bind( "click", function(event)
    {
    	

    	console.log($("input[name='min_price']").val());
    	console.log($("input[name='max_price']").val());

    
    	sessionStorage.setItem('minPrice', $("input[name='min_price']").val());

    	
    	sessionStorage.setItem('maxPrice', $("input[name='max_price']").val());
    	$('#filter_results').trigger('click');

     });




 });
$(document).on('click', '#filter_results', function(event)
{	
		var search_parameter = sessionStorage.getItem('search_parameter');

	console.log("Hello");	
	$.ajax
	({	
		type: "POST",
		url : "http://"+lb_server+"/filter_results",
		data : {min_price: sessionStorage.getItem('minPrice'), max_price: sessionStorage.getItem('maxPrice'), item_type: sessionStorage.getItem('type_filter'), search: search_parameter},
		success : function(data)
		{	var list = $('#results');
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
					var heading = $('<p style="vertical-align: middle; color:black"></p>');
					heading.html(data.content[i].item_name);
					div.append(heading);



					var div2 = $('<div class="search_div_attribute" style="width: 33%;"></div>');

					var type = $('<p style="color: orange;"></p>');
					
					


					var type_boolean = data.content[i].is_auction;
					console.log(type_boolean);


					if(type_boolean == "both"){

						type.html("Both");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].buyout_price);
						buy.append(buy_span);
						div2.append(buy);


						var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);

					}

					else if(type_boolean == "bid")
					{	

						type.html("Bid");
						div.append(type);
					var bid = $('<p style="color: #1CB0D9;">US $</p>');
						var bid_span = $('<span></span>');
						var bid_count = $('<p style="color:gray;"></p>');
						var bid_count_span = $('<span> bids</span>');



						bid_count.html(data.content[i].bid_count);
						bid_count.append(bid_count_span);
						bid_span.html(data.content[i].price);


						bid.append(bid_span);

						div2.append(bid);
						div2.append(bid_count);
						console.log("Bid Hello!");


					}

					else if(type_boolean == "buy")
					{

						type.html("Buy");
						div.append(type);
						var buy = $('<p style="color: #1CB0D9;">US $</p>');
						var buy_span = $('<span></span>');
						buy_span.html(data.content[i].price);
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
		error: function(data)
		{

			console.log(data);
		}
});
});
