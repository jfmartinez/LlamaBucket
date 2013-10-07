$(document).on('pagebeforeshow', '#adminuserlistpage', function(event){
	$.ajax({
		url : "http://localhost:3000/users",
		contentType : "application/json",
		success : function(data){
			var list = $('#userlist');
			list.empty();
			var admin = ["Client", "Admin"];
			for(var i=0; i<data.length; i++){
				list.append('<li id="' + data[i].userId + '"><a href="#"><h2>' + data[i].firstname + " " + data[i].lastname + " - " + admin[data[i].isAdmin] +
					'</h2><p>Email: ' + data[i].email + '</p></a></li>');
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
		url : "http://localhost:3000/users/"+user_id,
		contentType : "application/json",
		success : function(data){
			console.log(data);
			var info = $('#userinfo');
			info.empty();
			info.append('<li>Name: ' + data.firstname + " " + data.lastname + 
				'</li><li>User ID: ' + user_id + 
				'</li><li>Email: ' + data.email + 
				'</li><li>Phone: ' + data.phone + 
				'</li><li>Address: ' + data.address + '</li>');
			info.listview('refresh');
			sessionStorage.clear();
		},
		error : function(data){
			console.log("Failed to load user information.");
		}
	});
});

$(document).on('pagebeforeshow', '#repgenpage', function(event){
	$.ajax({
		url : "http://localhost:3000/report",
		contentType : "application/json",
		success : function(data){
			//console.log(data);
			var header = $('#repname');
			header.empty();
			header.append(data[0].report_name);
			var report = $('#repgen');
			report.empty();
			report.append('<li><p><h2>Item: ' + data[0].itemA + '</h2></p><p>Buyer: ' + data[0].buyerA + '</p><p>Seller: ' + data[0].sellerA + '</p><p>Price: ' + data[0].priceA + '</p></li>' + 
				'<li><p><h2>Item: ' + data[0].itemB + '</h2></p><p>Buyer: ' + data[0].buyerB+ '</p><p>Seller: ' + data[0].sellerB + '</p><p>Price: ' + data[0].priceB + '</p></li>' + 
				'<li><p><h2>Item: ' + data[0].itemC + '</h2></p><p>Buyer: ' + data[0].buyerC+ '</p><p>Seller: ' + data[0].sellerC + '</p><p>Price: ' + data[0].priceC + '</p></li>' + 
				'<li><p><h2>Item: ' + data[0].itemD + '</h2></p><p>Buyer: ' + data[0].buyerD+ '</p><p>Seller: ' + data[0].sellerD + '</p><p>Price: ' + data[0].priceD + '</p></li>');
			report.listview('refresh');

		},
		error : function(data){
			console.log("Failed to load report.");
		}
	});
});



$(document).on('pagebeforeshow', '#edit_categories', function(event){
	$.ajax({
		url : "http://localhost:3000/categories",
		contentType : "application/json",
		success : function(data){
			//console.log(data);
			var category_list = $('#view_categories_list');
			var category_data = data.content;
			for(var i = 0; i < category_data.length; i++)
			{


				category_list.append('<li><a href="#edit_category" id="#category_'+ category_data[i].id+ '"">'+ category_data[i].category +'</a></li>');
			}
		},
		error : function(data){
			console.log("Failed to load report.");
		}
	});
});

