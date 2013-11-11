


//Sign in the user.
$(document).on('click', '#sign_in_submit', function(event)
{ 
  $.ajax({
    type : "POST",
    url : "http://"+lb_server+"/sign_in",
    data : { email : $('#sign_in_email').val(), password : $('#password').val()},
    success : function(data)
    {
      //Store the user in localStorage
      localStorage.setItem('id', data.id);
      localStorage.setItem('isAdmin', data.isAdmin);

      console.log(data);

      if(data.isAdmin == 1)
      {
        console.log("True");
        $.mobile.changePage('#admin_home');
      }
      else{
      $('#home').page();
      $.mobile.changePage('#home');
    }
    },
    error : function(data)
    {
      console.log(data);
    }
  })
});


$(document).on('pagebeforeshow', '#home', function(event)
{
  if(localStorage.getItem('isAdmin') == 1)
  {
    console.log("Hello");
    $.mobile.changePage('#admin_home');
  }


  else if(localStorage.getItem('id'))
  {

    //Show all the user options
    $('#logged_in_user_options').show();
    $('#non_user_options').hide();

  }


  else{

    $('#logged_in_user_options').hide();
    $('#non_user_options').show();


  }





}






  )

//Show the user information on the user page.
$(document).on('click', '#user_profile_trigger', function(event)
{
  //Check to see if the user is signed in?
  if(localStorage.getItem('id'))
  {
    //user is signed in.
    $.mobile.changePage('#user_profile');
    $.ajax
    ({
      url : "http://"+lb_server+"/profile/" + localStorage.getItem('id'),
      contentType : "application/json",
      success : function(data)
      {
        //Add the information to the user page.
        $('#client_image').attr('src', data.image);
        $('#client_name').html('<h4>' + data.name +'</h4>');
        $('#client_email').html('<strong> Email: </strong>' + data.email);
        $('#client_rank').html('<strong>Rank: </strong>' + data.rank.toPrecision(2) + '/5');
        $('#client_add1').html(data.address_1);
        $('#client_add2').html(data.address_2);
        $('#client_add3').html(data.city +', '+data.state +' Zip: '+data.zip_code);
        $('#client_country').html(data.country);
        $('#card_number').html('<strong>Card Number: </strong> **** **** **** '+data.credit_card);
        $('#credit_card_type').html('<strong>Card Type: </strong>' + data.credit_card_type);

      },
      error : function(data)
      {
        console.log('Did not work: Profile');
      }
    })
  }

  //User is not signed in
  else
  {   
      $("#sign_in_trigger").click();
  }

});


//Before showing the edit user page, load the placeholders with the user data.
$(document).on('pagebeforeshow', '#edit_user', function(event)
{
  $('#first_name').attr('placeholder', localStorage.getItem('first_name'));
  $('#last_name').attr('placeholder', localStorage.getItem('last_name'));
  $('#email').attr('placeholder', localStorage.getItem('email'));
});

//Edit the user credentials
$(document).on('click', '#edit_user_save', function(event)
{
  $.ajax({
    type : "POST",
    url : "http://"+lb_server+"/update_user_info",
    data : $('#user_info_edit').serializeArray(),
    success : function(data)
    {
      //Store the user in localStorage
      localStorage.setItem('first_name', data.first_name);
      localStorage.setItem('last_name', data.last_name);
      localStorage.setItem('email', data.email);
      localStorage.setItem('phone', data.phone);
      localStorage.setItem('image', data.image);

      $('#sign_in_button').replaceWith('<a href="#user_profile" data-role="button" id="my_profile_home">'+localStorage.getItem('first_name')+'</a>')
      $('#home').page();
      $.mobile.changePage('#user_profile')
    },
    error : function(data)
    {
      console.log('no brego');
    },
  })
});

//Load the user list of addresses
$(document).on('pagebeforeshow', '#address_list', function(event)
{
    $.ajax({
      url : "http://"+lb_server+"/get_addresses/"+localStorage.getItem('id'),
      contentType : "application/json",
      success : function(data)
      {
        var list = $('#user_address_list')
        list.empty();

        for(var i = 0; i < data.content.length; i++)
        {
            list.append('<li><a href="#address_confirmation_dialog" data-icon="delete" data-rel="dialog" placeholder="'+data.content[i].address_1+'"">'+data.content[i].address_1+'</a></li>');
        }

        list.listview('refresh');
      },
      error : function(data)
      {
        console.log('no brego');
      }
    })
});

//Load the user list of addresses
$(document).on('pagebeforeshow', '#credit_card_list', function(event)
{
    $.ajax({
      url : "http://"+lb_server+"/get_credit_cards/"+localStorage.getItem('id'),
      contentType : "application/json",
      success : function(data)
      {
        var list = $('#card_list')
        list.empty();

        for(var i = 0; i < data.length; i++)
        {
            list.append('<li><a href="#delete_card" data-rel="dialog" placeholder="'+data[i].number+'"> <strong>'+data[i].type+' Ending in: '+data[i].number+'</strong></a></li>');
        }

        //Refresh the list, this is so jQuery Mobile can apply its proper classes. 
        list.listview('refresh');

      },
      error : function(data)
      {
        console.log('No function, credit card list');
      }
    })
});

$(document).on('click', '#add_mail_address', function(event)
{
  $.ajax({
    type : "POST",
    url : "http://"+lb_server+"/add_mail_address",
    data : $('#new_address').serializeArray(),
    success : function(data)
    {
      console.log('Worked');
     $.mobile.changePage('#address_list');
    },
    error : function(data)
    {
      console.log('no brego');
    },
  });
});

$(document).on('click', '#user_address_list li', function(event)
{
  var address_to_delete = $(this).children().children().children().attr('placeholder');
  $('#delete_address').on('click', function()
  {
    $.ajax({
      type : "POST",
      url : "http://"+lb_server+"/delete_address",
      data : { address1 : address_to_delete},
      success : function(data)
      {
        $.mobile.changePage('#address_list');
      },
      error : function(data)
      {
        console.log('no brego');
      }
    })
  });
});


$(document).on('pagebeforecreate', '#notifications', function(event)
 {

   $.ajax({
      url : "http://"+lb_server+"/get_notifications",
      contentType : "application/json",
      success : function(data)
      {
         var notifications = data;           
    var list = $('#notifications_list');
    list.empty();
    for(var i = 0; i < notifications.length; i++)
    {
      list.append('<li>'+
        '<a href="#">'+
       '<h5 style="font-size: 12px;">'+notifications[i].description+'</h3>'+
       '<p><strong>Date: </strong> '+ notifications[i].date +'</p>'+
      '</a></li>'

        );
    }
    list.listview('refresh');
      },
      error : function(data)
      {
        console.log('no brego');
      }
    })
   
               
               
});


$(document).on('pagebeforecreate', '#items_bidded', function(event)
 {

   $.ajax({
      url : "http://"+lb_server+"/get_bids",
      contentType : "application/json",
      success : function(data)
      {
         var bids = data;           
    var list = $('#bids_list');
    list.empty();
    for(var i = 0; i < bids.length; i++)
    {
      list.append('<li>'+
        '<a href="#"><img src="'+ bids[i].image +'"/>'+
        '<p class="ui-li-aside"><strong>Amount: '+ bids[i].amount+'</strong></p>'+
       '<h5 style="font-size: 12px;">'+bids[i].item_name+'</h3>'+


       '<p><strong>Seller: </strong>'+bids[i].seller+'</p>'+
       '<p><strong>Date: </strong> '+ bids[i].date +'</p>'+
      '</a></li>'

        );
    }
    list.listview('refresh');
      },
      error : function(data)
      {
        console.log('no brego');
      }
    })
   
               
               
});


$(document).on('click', '#log_out_button', function(event)
{
  localStorage.clear();
  $.mobile.changePage('#home');
})





