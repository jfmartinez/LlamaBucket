$(document).on('click', '#bucket_checkout', function(event){ $.mobile.changePage('#checkout');});
$(document).on('click', '#buy_item', function(event){$.mobile.changePage('#checkout');});
$(document).on('click', '#place_order_button', function(event){$.mobile.changePage('#place_order_dialog_confirmation');});

$(document).on('click', '#bucket_checkout', function(event)
{

  //Checkout was pressed from the bucket
  $.ajax({
    url : lb_server +"/checkout/bucket/" + localStorage.getItem('id'),
    contentType : "application/json",
    success : function(data)
    {
      $('#checkout_number_total').html(data.items.length);
      $('#checkout_order_total').html('$'+data.order_amount);
      $('#checkout_payment_1').html(data.primary_credit_card.type + ' ending in:');
      $('#checkout_payment_2').html(data.primary_credit_card.number);
      $('#checkout_address_1').html(data.primary_address.address_1);
      $('#checkout_address_2').html(data.primary_address.address_2);
      $('#checkout_address_info').html(data.primary_address.city +', '+data.primary_address.state);
      $('#checkout_zip_code').html(data.primary_address.zip_code);

      var list = $('#checkout_items');

      //clear the list
      list.empty();

      //Add the divider
      list.append('<li data-role="list-divider">Items</li>')

      for(var i = 0; i < data.items.length; i++)
      {
        list.append('<li val= "'+data.items[i].id+'"><a href="#"><img src="'
        +data.items[i].image+'"/><p style="float : right; padding-right : 15px; padding-top : 25px;">$ '
        +data.items[i].price+'</p><h4>'
        +data.items[i].name+'</h4><p>'
        +data.items[i].description+'</p></a></li>');
      }

      list.listview('refresh');

      sessionStorage.setItem('checkout_method', 'bucket');

      $.mobile.changePage('#checkout');

    },
    error : function(data)
    {
      console.log(data);
    }
  });
});

$(document).on('click', '#buy_item', function(event)
{

  //Checkout was pressed from the bucket
  $.ajax({

    url : lb_server +"/checkout/item/" + parseInt($('#buy_item').attr('val')) + '-' +localStorage.getItem('id'),

    contentType : "application/json",

    success : function(data)
    {
      $('#checkout_number_total').html('1');
      $('#checkout_order_total').html('$'+data.item.price);
      $('#checkout_payment_1').html(data.primary_credit_card.type + ' ending in:');
      $('#checkout_payment_2').html(data.primary_credit_card.number);
      $('#checkout_address_1').html(data.primary_address.address_1);
      $('#checkout_address_2').html(data.primary_address.address_2);
      $('#checkout_address_info').html(data.primary_address.city +', '+data.primary_address.state);
      $('#checkout_zip_code').html(data.primary_address.zip_code);

      var list = $('#checkout_items');

      //clear the list
      list.empty();

      //Add the divider
      list.append('<li data-role="list-divider">Items</li>')

      list.append('<li val="'+data.item.id+'"><a href="#"><img src="'
        +data.item.image+'"/><p style="float : right; padding-right : 15px; padding-top : 25px;">$ '
        +data.item.price+'</p><h4>'
        +data.item.name+'</h4><p>'
        +data.item.description+'</p></a></li>')

      list.listview('refresh');

      sessionStorage.setItem('checkout_method', 'buy_now');

      $.mobile.changePage('#checkout');

    },
    error : function(data)
    {
      console.log(data);
    }
  });
});

$(document).on('pagebeforeshow', '#invoice_page', function(event)
{
  if(sessionStorage.getItem('checkout_method') == 'bucket')
  {
    $.ajax({
      url : lb_server +"/order/bucket/" + localStorage.getItem('id'),
      contentType : "application/json",
      success : function(data)
      {
        $('#invoice_total_price').html('$ '+data.order_amount);
        $('#invoice_card_info').html(data.primary_credit_card.type +' ending in: '+  data.primary_credit_card.number);
        $('#invoice_date').html(data.time);
        $('#invoice_address_1').html(data.primary_address.address_1);
        $('#invoice_address_2').html(data.primary_address.address_2);
        $('#invoice_address_info').html(data.primary_address.city +', '+data.primary_address.state);
        $('#invoice_zip_code').html(data.primary_address.zip_code);

        var list = $('#invoice_items');

        list.empty();

        list.append('<li data-role="list-divider" data-inset="true">Items</li>')

        for(var i = 0; i < data.items.length; i++)
        {
          list.append('<li><img src="'
          +data.items[i].image+'"/><p style="float : right; padding-right : 15px; padding-top : 13%;">$ '
          +data.items[i].price+'</p><h4>'
          +data.items[i].name+'</h4><p>seller: '
          +data.items[i].seller+'</p></li>');
        }

        list.listview('refresh');
      },

      error : function(data)
      {
        console.log("fetch unsuccessful");
      }
    });
  }
  else if(sessionStorage.getItem('checkout_method') == 'buy_now')
  {
    $.ajax({
      url : lb_server +"/order/item/" + $('#checkout_items').children().next().attr('val') + '-' + localStorage.getItem('id'),
      contentType : "application/json",
      success : function(data)
      {
        $('#invoice_total_price').html('$ '+data.item.price);
        $('#invoice_card_info').html(data.primary_credit_card.type +' ending in: '+  data.primary_credit_card.number);
        $('#invoice_date').html(data.time);
        $('#invoice_address_1').html(data.primary_address.address_1);
        $('#invoice_address_2').html(data.primary_address.address_2);
        $('#invoice_address_info').html(data.primary_address.city +', '+data.primary_address.state);
        $('#invoice_zip_code').html(data.primary_address.zip_code);

        $('#invoice_items').empty();

        $('#invoice_items').append('<li data-role="list-divider" data-inset="true">Items</li>')

        $('#invoice_items').append('<li><img src="'
          +data.item.image+'"/><p style="float : right; padding-right : 15px; padding-top : 13%;">$ '
          +data.item.price+'</p><h4 style="margin-top : 9%;">'
          +data.item.name+'</h4><p>seller: '
          +data.item.seller+'</p></li>');

        $('#invoice_items').listview('refresh');

      },

      error : function(data)
      {
        console.log(data);
      }
    });
  }
});

$(document).on('click', '#place_order', function (event) {

  if (sessionStorage.getItem('checkout_method') === 'bucket') {
    $.ajax({
      type : "POST",
      url : lb_server + "/purchase_bucket/" + localStorage.getItem('id'),
      success : function (data) {
        $('#user_rating').popup('open');
      },

      error : function (data) {

      }
    });
  }

  if (sessionStorage.getItem('checkout_method') === 'buy_now') {
    $.ajax({
      type : "POST",
      url : lb_server + "/purchase_item/" + sessionStorage.getItem('item_id'),
      data : { id : localStorage.getItem('id')},
      success : function (data) {
        $('#trigger_rate_user').trigger('click');

      },

      error : function (data) {
        console.log('Buy single item did not work')
      }
    });
  }
});

$(document).on('click', '#ranks', function(event) {

  console.log($('#user_rating').val());

  if (sessionStorage.getItem('checkout_method') === 'bucket') {
    $.ajax({
      type : "POST",
      url : lb_server + "/rank_bucket_purchase/" + localStorage.getItem('id'),
      data : { rating : $('#user_rating').val() },
      success : function (data) {
        console.log(data)
      },
      error : function (data) {
        console.log(data);
      }
    });
  };

  if (sessionStorage.getItem('checkout_method') === 'buy_now') {

    $.ajax({
      type : "POST",
      url : lb_server + "/rank_single_purchase/" + sessionStorage.getItem('id'),
      data : { rating : $('#user_rating').val() },
      success : function (data) {
        console.log(data)
      },
      error : function (data) {
        console.log(data);
      }
    });
  }

});


$(document).on('click', '#add_item_cart', function(event){
  var listing_id;
  var client_id = localStorage.getItem('id');
  $.ajax({
    type : "GET",
    url : lb_server + "/get_listing_from_item/" + sessionStorage.getItem('item_id'),
    success : function(data){
      listing_id = data[0].listing_id;
      console.log("hello");
      $.ajax({
        type : "POST",
        url : lb_server + "/insert_to_bucket/" + client_id + "_" + listing_id,
        success : function(data){
          console.log("Added listing number "+listing_id + " to client "+ client_id+"'s bucket.");
          $.mobile.changePage("#user_bucket");

        },
        error : function(data){
          console.log("Could not add listing to bucket.");
        }
      });

    },
    error : function(data){
      console.log("Could not get the listing id from the item entry.");
    }
  });





});
