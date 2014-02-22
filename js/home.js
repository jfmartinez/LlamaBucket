
//==========================================================//
// Home.js is responsible for managing client side bid logic //
//==========================================================//

//Manages home page content with respect to the user, if he's logged in or not
$(document).on('pagebeforeshow', '#home', function(event)
{

	// //If the user logged in
	if(localStorage.getItem('email'))
	{
    $('#user_options').show();
	}
	else if(!localStorage.getItem('email'))
	{
    $('#user_options').hide();

	}
});

//Properly redirect the user depending on his status on the page.
$(document).on('click', '#my_profile', function(event)
{
  if(localStorage.getItem('email'))
  {
    $.mobile.changePage('#user_profile');
  }
  else
  {
    $.mobile.changePage('#sign_in');
  }
});


//Server dialog error message if home page contenti s not available
$(document).on('pagebeforeshow', '#server-error-dialog', function(event)
{

  $('#issue_tag').html(sessionStorage.getItem('error_message');

})