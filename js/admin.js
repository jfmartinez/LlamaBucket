$(document).on('pagebeforeshow', '#adminuserlistpage', function(event){
	$.ajax({
		url : "http://"+lb_server+"/users",
		contentType : "application/json",
		success : function(data){
			var list = $('#userlist');
			console.log("on it");
			list.empty();
			var admin = ["Client", "Admin"];
			for(var i=0; i<data.length; i++){
				list.append('<li id="' + data[i].client_id + '"><a href="#"><h2>' + data[i].client_firstname + " " + data[i].client_lastname + " - " + admin[data[i].isAdmin] + '</h2><p>Email: ' + data[i].email + '</p></a></li>');
			}
			list.listview('refresh');
		},
		error : function(data){
			console.log("Failed to load user list");
		}
	});
});

$(document).on('click', '#userlist li', function(event){
	var parameter = $(this).attr('id');
	sessionStorage.setItem('user_id', parameter);
	$.mobile.changePage('#userinfopage');
});

$(document).on('pagebeforeshow', '#userinfopage', function(event){
	var user_id = sessionStorage.getItem('user_id');
	console.log(user_id);
	$.ajax({
		url : "http://"+lb_server+"/users/"+user_id,
		contentType : "application/json",
		success : function(data){
			var info = $('#userinfo');
			info.empty();
			info.append('<li>Name: ' + data[0].client_firstname + " " + data[0].client_lastname + 
				'</li><li>User ID: ' + user_id + 
				'</li><li>Email: ' + data[0].email + 
				'</li><li>Phone: ' + data[0].phone + 
				'</li><li>Address: ' + data[0].address_1 + '<br>' + data[0].address_2 + '<br>' + data[0].city + ', ' + data[0].state + ' ' + data[0].zip_code + ' ' + data[0].country + '</li>');
			info.listview().listview('refresh');
			sessionStorage.clear();
		},
		error : function(data){
			console.log("Failed to load user information.");
		}
	});
});

/* Reports go here */

$(document).on('pagebeforeshow', '#reportday', function(event){
	$.ajax({
		url : "http://"+lb_server+"/reportday", 
		contentType : "application/json",
		success : function(data){
			console.log(data);
			console.log("success");
		},
		error : function(data){
			console.log("Failed to load report.");
		}
	});
});
$(document).on('pagebeforeshow', '#reportweek', function(event){
	$.ajax({
		url : "http://"+lb_server+"/reportweek", 
		contentType : "application/json",
		success : function(data){
			console.log("success");
		},
		error : function(data){
			console.log("Failed to load report.");
		}
	});
});
$(document).on('pagebeforeshow', '#reportmonth', function(event){
	$.ajax({
		url : "http://"+lb_server+"/reportmonth", 
		contentType : "application/json",
		success : function(data){
			console.log("success");
		},
		error : function(data){
			console.log("Failed to load report.");
		}
	});
});

/* Reports end here */

$(document).on('pagebeforeshow', '#view_categories', function(event){
	$.ajax({
		url : "http://"+lb_server+"/categories",
		contentType : "application/json",
		success : function(data){
			//console.log(data);
			var category_list = $('#view_categories_list');
			var category_data = data.content;
			category_list.empty();
			for(var i = 0; i < category_data.length; i++)
			{


				category_list.append('<li id="'+ category_data[i].id+'"><a >'+ category_data[i].category +'</a></li>');
			}

			category_list.listview('refresh');
		},
		error : function(data){
			console.log("Failed to load report.");
		}
	});
});
$(document).on('pagebeforeshow', '#edit_categories', function(event, ui){
	
	var category_id = sessionStorage.getItem('category_id');
	sessionStorage.clear();
	$.ajax({
		url : "http://"+lb_server+"/category/"+category_id,
		contentType : "application/json",
		
		success : function(data){
			$('#category_name').attr('placeholder', data.category);
			$('#category_parent').attr('placeholder', data.parent);
			$('#category_id').attr('placeholder', data.id);



		},

		error : function(data){
			console.log("Item could not be loaded. (item.js)");
		}
	});
});


$(document).on('click', '#view_categories_list li', function(event)
{
	var parameter = $(this).attr('id');
	sessionStorage.setItem('category_id', parameter);
	$.mobile.changePage('#edit_categories');
});

$(document).on('click', '#save_category', function(event)
{
	var new_category_data = {
		category: $('#category_name').val(),
		parent: $('#category_parent').val(),
		id: $('#category_id').val()
	};


	$.ajax({
      type : "POST",
		url: "http://"+lb_server+"/add_category",
      data : new_category_data,
     success: function(data)
		{
        $.mobile.changePage('#view_categories');



		},
		error: function(err)
		{
			console.log("Add category failed");
			console.log(new_category_data);
		}
    });

});

