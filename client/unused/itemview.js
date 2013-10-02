
//Display item page
$(document).on('pagebeforeshow', '#items', function(event, ui){
	var itemInfo = $("#itemview");
	itemInfo.empty();
	itemInfo.append("<h2>" + sportsItems[0].brand + " " + sportsItems[0].name "</h2>" +
		"<p>Buy it now Price: " + sportsItems[0].buyPrice + "</p>" + 
		"<p>Year: " + sportsItems[0].year + "</p>" + 
		"<p>Category: " + sportsItems[0].year + "</p>" 

	);
	itemInfo.page("refresh");

});
