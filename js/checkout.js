$(document).on('pagebeforeshow', '#checkout', function(event)
{
  //A distinction has to be made, there are two possibilities, either add items to the cart and checkout, or hit the buy now button.
  if(sessionStorage.getItem('bucket_id'))
  {
    //Checkout was pressed from the bucket
    $.ajax({
      url : "http://localhost:5000/checkout/bucket/" + localStorage.getItem('id'),
      contentType : "application/json",
      success : function(data)
      {
        $('#checkout_number_total').html(data.items.length);
        $('#checkout_order_total').html('$'+data.order_amount);
        $('#checkout_payment_1').html(data.primary_credit_card.type + ' ending in:');
        $('#checkout_payment_2').html('**** **** **** '+data.primary_credit_card.number);
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
          list.append('<li><a href="#"><img src="'
          +data.items[i].image+'"/><p style="float : right; padding-right : 15px; padding-top : 25px;">$ '
          +data.items[i].price+'</p><h4>'
          +data.items[i].name+'</h4><p>'
          +data.items[i].description+'</p></a></li>');
        }

        list.listview('refresh');


      },
      error : function(data)
      {
        console.log(data);
      }
    })
  }

});