var sportsItems = new Array(
	new Item("Jordan", "Tenis", "2013", "Sports Wear", "10.00"),
	new Item("Jordan", "Tenis", "2011", "Sports Wear", "5.00"),
	new Item("Jordan", "Tenis", "2012", "Sports Wear", "7770.00"),
	new Item("Jordan", "Tenis", "2010", "Sports Wear", "170.00"),
	new Item("Jordan", "Tenis", "2009", "Sports Wear", "150.00")

	);

$(document).on('pagebeforeshow', "#listings", function(event, ui){
	var len = sportsItems.length;
	
	var list = $("#item-list");
	list.empty();
	var item;
	for( var i = 0; i < len; i++){
		item = sportsItems[i];
		list.append("<li><a href=\"#\">" + 
			"<h2>" + item.brand + " " + item.name + "</h2>" + 
			"<p>Year: " + item.year + "</p>" + 
			"<p><strong>" + item.category + "</strong></p>" +
			"<p class=\"ui-li-aside\">" + item.buyPrice + "</p>" +
			"</a></li>");
	}
	list.listview("refresh");
});

