


//Sign in the user.
$(document).on('click', '#sign_in_submit', function(event)
{ 
  $.ajax({
    type : "POST",
    url : lb_server+"/sign_in",
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
      url : lb_server+"/profile/" + localStorage.getItem('id'),
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
    url : lb_server+"/update_user_info",
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
    url : lb_server+"/get_addresses/"+localStorage.getItem('id'),
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
    url : lb_server+"/get_credit_cards/"+localStorage.getItem('id'),
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
    url : lb_server+"/add_mail_address",
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
      url : lb_server+"/delete_address",
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


$(document).on('pagebeforeshow', '#notifications', function(event)
{

 $.ajax({
  url : lb_server+"/get_notifications/"+localStorage.getItem('id'),
  contentType : "application/json",
  success : function(data)
  {
   var list = $('#notifications_list');
   list.empty();

   for(var i = 0; i < data.length; i++)
   {
    list.append('<li val='+data[i].listing_id+'>'+
      '<a href="#">'+
      '<h4>'+data[i].title+'</h4>'+
      '<p>'+data[i].notification_message+'</p>'+
      '</a></li>');

    }
    list.listview('refresh');
  },
  error : function(data)
  {
    console.log('no brego notifications');
  }
});

$(document).on('click', '#notifications_list li', function(event)
{
  sessionStorage.setItem('item_id', $(this).attr('val'));
  $.mobile.changePage('#itempage');
});



});


$(document).on('pagebeforeshow', '#items_bidded', function(event)
{


  $.ajax({
    url : lb_server+"/get_bids/"+localStorage.getItem('id'),
    contentType : "application/json",
    success : function(data){
      var winning_list = $('#winning_bids_list');
      var loosing_list = $('#loosing_bids_list');
      var length = data.content.length;

        //Clear the list beforehand
        winning_list.empty();
        loosing_list.empty();

        //$('#category_heading').html(data.content[0].category_name);

        //Go over all the items that were fetched and create the appropiate list items


        for(var i = 0; i < length; i++)
        { 
                    var type_boolean = data.content[i].is_auction;

          if(type_boolean == "both" || type_boolean =="bid"){

          var t = $('<li id="' + data.content[i].item_id + '" ng-repeat="item in store | filter:search" ></li>');
          
          
          var link = $('<a href="#"></a>');
          


          var img = $('<img height="100%" />');
          img.attr('src', data.content[i].item_image);
          

          var div = $('<div class="search_div_attribute" style="width:66%;"></div>');
          var heading = $('<p style="vertical-align: middle; color:black"></p>');
          heading.html(data.content[i].item_name);
          div.append(heading);



          var div2 = $('<div class="search_div_attribute" style="width: 33%;"></div>');

          var type = $('<p style="color: orange;"></p>');
          var time_left = $('<p style="color: #2ecc71;"></p>');
          
          




          if(type_boolean == "both"){

            type.html("Both");
            div.append(type);
            var buy = $('<p style="color: #1CB0D9;">US $</p>');
            var buy_span = $('<span>></span>');
            buy_span.html(data.content[i].buyout_price);
            buy.append(buy_span);
            div2.append(buy);


            var bid = $('<p style="color: #1CB0D9;">US $</p>');
            var bid_span = $('<span></span>');
            var bid_count = $('<p style="color:gray;"></p>');
            var bid_count_span = $('<span> bids</span>');

           


            bid_count.html(data.content[i].bid_count);
            bid_count.append(bid_count_span);
            bid_span.html(data.content[i].price);


            bid.append(bid_span);

            div2.append(bid);
            div2.append(bid_count);

          }

          else if(type_boolean == "bid")
          { 

            type.html("Bid");
            div.append(type);

            var bid = $('<p style="color: #1CB0D9;">US $</p>');
            var bid_span = $('<span></span>');
            var bid_count = $('<p style="color:gray;"></p>');
            var bid_count_span = $('<span> bids</span>');
            console.log("bid item");

            console.log(data.content[i]);


            bid_count.html(data.content[i].bid_count);
            bid_count.append(bid_count_span);
            bid_span.html(data.content[i].price);


            bid.append(bid_span);

            div2.append(bid);


          }

      

          var your_amount = $('<p class="bidded_check" style="color: #1CB0D9;">Bidded: US $</p>');
          var your_amount_span = $('<span></span>');
          your_amount_span.html(data.content[i].bid_amount);
          your_amount.append(your_amount_span);




          var date_fractions  =data.content[i].exp_date.replace(/[TZ\:]/g, '-').split('-');

          var exp_date = new Date(date_fractions[0], date_fractions[1], date_fractions[2], date_fractions[3], date_fractions[4], date_fractions[5]);
          var current_date = new Date();

            console.log(exp_date);
          console.log(current_date);
          var timeDiff = Math.abs(exp_date.getTime() - current_date.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          console.log(current_date);
          time_left.html(diffDays + " days left");

          div.append(time_left);
          div.append(your_amount);
          link.append(img); 

          link.append(div);
          link.append(div2);

          t.append(link);



          console.log(data);
          if(data.content[i].bid_max >= data.content[i].price){

          winning_list.append(t);
          $('#bid_'+data.content[i].item_id).html(data.content[i].bid_max);
        }
        else{

          loosing_list.append(t);

          $('#loosing_bids_list').find('.bidded_check').attr('style', "color: red;");

        }


          }
        }

        //Refresh the ul so that all elements are views properly.
        winning_list.listview('refresh');
        loosing_list.listview('refresh');


      },
      error : function(data){
        console.log("Search results not available");
      }
});

});


$(document).on('click', '#log_out_button', function(event)
{
  localStorage.clear();
  $.mobile.changePage('#home');
});

$(document).on('pagebeforeshow', '#my_invoices', function(event){
  var user_id = localStorage.getItem('id');
  $.ajax({
    url : lb_server+"/userinvoice/"+user_id,
    contentType : "application/json",
    success : function(data){
      var list = $("#my_invoice_list");
      list.empty();
      for(var i = 0; i<data.length; i++){
        list.append('<li id="'+data[i].invoice_id + '"><a href="#"><p>$ '
          +data[i].final_price+'</p><h4>'
          +data[i].item_name+'</h4><p>Seller: '
          +data[i].client_firstname + ' ' + data[i].client_lastname+'</p></a></li>');   
      }
      list.listview('refresh');
    },
    error : function(data){
      console.log("Failed to load user invoice list");
    }
  });

});


$(document).on('click', "#my_invoice_list li", function(event){
  var parameter = $(this).attr('id');
  sessionStorage.setItem('inv_id', parameter);
  $.mobile.changePage('#single_inv_page');

});

$(document).on('pagebeforeshow', '#single_inv_page', function(event){
   var inv_id = sessionStorage.getItem('inv_id');
   $.ajax({
       url : lb_server+"/singleinvoice/"+inv_id,
       contentType : "application/json",
       success : function(data){
         var list = $('#invoice_content');
         list.empty();
         list.append('<li><div data-role="content"><h3 style="margin-left : 33%">Order Processed</h3><div class="ui-grid-a"><div class="ui-block-a"><h3>Total:</h3></div><div class="ui-block-b"><p style="float : right;" id="invoice_total_price">$' + data[0].final_price + '</p></div></div><div class="ui-grid-a"><div class="ui-block-a"><h3>Paid with:</h3></div><div class="ui-block-b"><p style="float : right;" id="invoice_card_info">Credit Card Number:'+ data[0].cc_number +'</p></div></div><div class="ui-grid-a"><div class="ui-block-a"><h3>Date:</h3></div><div class="ui-block-b"><p style="float : right;" id="invoice_date">' +  data[0].date + '</p></div></div><br><ul data-role="listview" data-inset="true"><li data-role="list-divider" >Shipping Information</li><li><p id="invoice_address_1">'+data[0].address_1+'</p><p id="invoice_address_2">'+data[0].address_2+'</p><p id="invoice_address_info">'+data[0].city+', '+data[0].state+'</p><p id="invoice_zip_code">'+data[0].zip_code+'</p></li></ul><ul data-role="listview" id="invoice_items" data-inset="true"><li data-role="list-divider" data-inset="true">Items</li><li><p style="float : right; padding-right : 15px; padding-top : 13%;"></p><h4 style="margin-top : 9%;">'+data[0].item_name+'</h4><p>Seller: '+data[0].seller_name+'</p></li></ul></div></li>');
         list.listview('refresh');
       },
       error : function(data){
         console.log("Failed to load invoice.");
       }
   });
 });
