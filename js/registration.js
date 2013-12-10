
//Register a user
$(document).on('click', '#register_user', function (event) {

  $.ajax({
    
    type : "POST",

    url : "http://" + lb_server + "/register_user",

    data : $('#new_user').serializeArray(),

    success : function (data) {

      console.log(data);
      
      console.log('User has been signed in.');

      //Store the user in localStorage
      localStorage.setItem('id', data.id);

      $.mobile.changePage('#user_profile');
    },

    error : function (data) {
      console.log(data);

      $.mobile.changePage('#home')
    }
  });
});

$(document).on('change', '#register_same_address', function(event) {
  
  if ($('#register_same_address').is(':checked')){
    //Use only one address.
    $('#register_billing_address1').addClass('ui-disabled');
    $('#register_billing_address2').addClass('ui-disabled');
    $('#register_billing_city').addClass('ui-disabled');
    $('#register_billing_zipcode').addClass('ui-disabled');
    $('#register_billing_state').addClass('ui-disabled');
    $('#register_billing_country').addClass('ui-disabled');
  }

  else {
    $('#register_billing_address1').removeClass('ui-disabled');
    $('#register_billing_address2').removeClass('ui-disabled');
    $('#register_billing_city').removeClass('ui-disabled');
    $('#register_billing_zipcode').removeClass('ui-disabled');
    $('#register_billing_state').removeClass('ui-disabled');
    $('#register_billing_country').removeClass('ui-disabled');
  }


});