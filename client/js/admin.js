$(document).on('pagebeforeshow', '#adminuserlistpage', function(event){
	console.log('helo');
	$.ajax({
		url : "http://localhost:3000/users",
		contentType : "application/json",
		success : function(data){
			var list = $('#userlist');
			list.empty();
			var admin = ["Client", "Admin"];
			for(var i=0; i<data.length; i++){
				list.append('<li><a href="#"><h2>' + data[i].firstname + " " + data[i].lastname + " - " + admin[data[i].isAdmin] +
					'</h2><p>Email: ' + data[i].email + '</p></a></li>');
			}
			list.listview('refresh');
		},
		error : function(data){
			console.log("Failed to load user list");
		}
	});
});

