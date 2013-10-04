$(document).on('pagebeforecreate', '#home', function(event)
{
	//If the user logged in
	if(localStorage.getItem('email'))
	{
		$('#sign_in_button').replaceWith('<a href="#user_profile" data-rel="dialog" id="my_profile_home">'+localStorage.getItem('first_name')+'</a>')
	}
	else
	{

	}
});