//Sign in the user.
$(document).on('click', '#sign_in_submit', function(event)
{ 
  $.ajax({
    type : "POST",
    url : "http://localhost:3000/sign_in",
    data : { username : $('#username').val(), password : $('#password').val()},
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
      $.mobile.changePage('#home')
    },
    error : function(data)
    {
      console.log('you are lame');
    }
  })
});


//Show the user information on the user page.
$(document).on('pagebeforeshow', '#user_profile', function(event)
{
  $('#profile_image').attr('src',localStorage.getItem('image'));
  $('#user_profile_name').html(''+localStorage.getItem('first_name') +' '+ localStorage.getItem('last_name'));
  $('#user_profile_email').html(localStorage.getItem('email'));
  $('#user_profile_phone').html(localStorage.getItem('phone'));



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
    url : "http://localhost:3000/update_user_info",
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
      url : "http://localhost:3000/get_addresses",
      contentType : "application/json",
      success : function(data)
      {
        var list = $('#user_address_list')
        list.empty();

        for(var i = 0; i < data.content.length; i++)
        {
            list.append('<li><a href="#address_confirmation_dialog" data-icon="delete" data-rel="dialog" placeholder="'+data.content[i].mail_address1+'"">'+data.content[i].mail_address1+'</a></li>');
        }

        list.listview('refresh');
      },
      error : function(data)
      {
        console.log('no brego');
      }
    })
});

$(document).on('click', '#add_mail_address', function(event)
{
  $.ajax({
    type : "POST",
    url : "http://localhost:3000/add_mail_address",
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
      url : "http://localhost:3000/delete_address",
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
      url : "http://localhost:3000/get_notifications",
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
      url : "http://localhost:3000/get_bids",
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




