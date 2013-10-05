$(document).on('click', '#sign_in_submit', function(event)
{

	$.ajax({
		type : "POST",
		url : "http://localhost:3000/sign_in",
		data : { username : $('#username').val(), password : $('#password').val()},
		success : function(data)
		{
			//Store the user in localSession
			localStorage.setItem('first_name', data.first_name);
			localStorage.setItem('last_name', data.last_name);
			localStorage.setItem('email', data.email);
			localStorage.setItem('image', data.image);
      $('#sign_in_button').replaceWith('<a href="#user_profile" data-role="button" id="my_profile_home">'+localStorage.getItem('first_name')+'</a>')
      $('#home').page();
			$.mobile.changePage('#home')
		},
		error : function(data)
		{
			console.log('you are lame');
		}
	})
});

$(document).on('pagebeforeshow', '#user_profile', function(event)
{
	if(localStorage.getItem('email'))
	{
		//Clear the div before adding the new information.
		$('#user_content').empty();
		$('#user_content').append('<div class="ui-grid-a"><div class="ui-block-a"><img src="'+localStorage.getItem('image')+'" height="150" width="175"></div><div class="ui-block-b"><h4></h4><div class="ui-grid-a"><div class="ui-block-a"><h2> Rank </h2></div><div class="ui-block-b"><h2> 3 Stars </h2></div></div></div></div><p><strong>Email: </strong>'+localStorage.getItem('email')+'</p><strong>Mailling Information:</strong><p>#311 Calle Ext. Los Robles</p><p>Rincon, PR 00677</p><p>United States</p>');
	}
	else
	{
		$('#user_content').empty();
		$('#user_content').append('<div class="ui-grid-a"><div class="ui-block-a"><img src="http://3.bp.blogspot.com/-Fo7AHLKOH5M/T8WeqUcZFKI/AAAAAAAAFCc/cQdII_3xu7k/s320/sloth.jpg" height="150" width="175"></div><div class="ui-block-b"><h4></h4><div class="ui-grid-a"><div class="ui-block-a"><h2> Rank </h2></div><div class="ui-block-b"><h2> 3 Stars </h2></div></div></div></div><p><strong>Email: </strong>cesarcruz91@gmail.com</p><strong>Mailling Information:</strong><p>#311 Calle Ext. Los Robles</p><p>Rincon, PR 00677</p><p>United States</p>');
	}
});