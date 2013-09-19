$(document).on('pagebeforeshow', '#searchResults', function(event){
	$.ajax({
		url : "http://localhost:3000/search_results",
		contentType : "application/json",
		success : function(data){
			console.log(data);
			var list = $('#results');
			var length = data.content.length;
			
			//Clear the list beforehand

			list.empty();

			for(var i = 0; i < length; i++)
			{
				list.append("<li>" +data.content[i].name +"</li>");
			}

			//Refresh the ul so that all elements are views properly.
			list.listview('refresh');
		},
		error : function(data){
			console.log("No brego");
		}
	});
});