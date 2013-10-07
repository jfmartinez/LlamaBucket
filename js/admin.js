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