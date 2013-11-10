
  $( document ).ready( function() { 


           $("input[name='item_type']" ).bind( "click", item_type_func );

     $("input[name='buyout_checkbox']" ).bind( "click", buyout_option );




  });


  function item_type_func()
  {
    if( $( this ).val() == "buy")
    {
      $('#sell_option_div').show();
      $('#bid_option_div').hide();


    }


    else if( $( this ).val() == "bid")
    {
          $('#sell_option_div').hide();
      $('#bid_option_div').show();

     
    }




  } 

  function buyout_option()
  { 


    var buyout_field = $('#buyout_checkbox');
    if(buyout_field[0].checked == true)
    {
      $('#buyout_price').show();

    }

    else
    {
      $('#buyout_price').hide();

    }


      
  }