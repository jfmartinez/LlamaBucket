
//============================================================================//
// Create_item.js is responsible for managing client side item creation logic //
//============================================================================//

var final_category_options;

//Initializes the form page for the item creation
$(document).on('pagebeforeshow', '#create_item', initialize_create_item_page);




//Recursively fills out the categories as the user browsers the available categories!
function recursive_category_population()
{

  var main_selector = $(this);
  $.mobile.showPageLoadingMsg(); 

  $.ajax({



    type: "GET",
    url: lb_server + "/category_options/"+ $(this).val(),
    success: function(data)
    {    


      var sibling = main_selector.parent().parent().next();
      sibling.empty();
      sibling.trigger("create");

      $('#create_choose_category_final').remove();

      var child_div = $(document.createElement('div'));
      child_div.attr('class', '.recursive_categories');

      var select = $(document.createElement('select'));
      select.attr('data-mini', 'true');
      var option = $(document.createElement('option'));
      option.html("Choose...");
      select.append(option);


      if(data.length > 0)
      {



        for(var i = 0; i < data.length; i ++)
        {

          option = $(document.createElement('option'));
          option.html(data[i].category_name);
          option.attr('value', data[i].cat_id);
          select.append(option);
        }
        select.on('change', recursive_category_population);

        sibling.append(select).trigger("create");

        sibling.append(child_div).trigger("create");






      }

      if(data.length == 0)
      {
        var sibling = main_selector.parent().parent().parent().prev();
        var display = $(document.createElement('label')).html("Choose:<hr>")
        display.attr('id', 'create_choose_category_final');
        sibling.append(display);

        final_category_options = main_selector;
        console.log(final_category_options.val());



      }
      $.mobile.hidePageLoadingMsg(); 

    }


  })


}

//Function that enables some GUI functoinality such as displaying the bid section or buy sectino of the listing creation process
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

//If the user selects to buyout the bid
function buyout_option()
{ 


  var buyout_field = $('#buyout_checkbox');
  if(buyout_field[0].checked == true)
  {
    $('#create_buyout_price').show();

  }

  else
  { 
    $('#create_buyout_price').hide();

  }
}

/////Phonegap libary for taking pictures and putting the device ready

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
      console.log("SUP");
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }



    //Takes the photo and previews it
    function previewPhoto(imageURI) {
      console.log("Preview Image");

      $('#preview_image').attr('src', imageURI);
      $('#preview_image')[0].style.display = 'block';
      sessionStorage.setItem('item_image', imageURI);


    }

    function upload_item()
    {
      console.log("Uploading Item");


      var imageURI = sessionStorage.getItem('item_image');

      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType="image/jpeg";

      var server_name = lb_server + "/upload_item";
      console.log("Setting up Params");
      var params = {};
      console.log(localStorage.getItem('id'));


      params.user_id = localStorage.getItem('id');
      params.item_name = $('input[name=create_item_name]').val();
      params.item_description= $('textarea[name=create_item_description]').val();
      params.item_category = final_category_options.val();
      params.shipping_time = $('#shipsWithinDays').find('option:selected').text();
      params.shipping_price = $('#create_shipping_price').val();
      params.shipping_service = $('#shipService1').find('option:selected').text();
      params.item_time = $('#create_bid_time').val();
      params.item_year = $('input[name=create_item_year]').val();
      params.item_brand = $('input[name=create_brand]').val();




      console.log("Filtering Item Type");

      var item_type, start_bid, buyout_price, item_price;
      var type = $("#item_type_options :radio:checked").val();

      if(type == "bid"){
        params.start_bid = $('#create_auction_price').val();
        params.buyout_price = '0';
        params.item_price = $('#create_auction_price').val();


        params.item_type = "bid";
        if( $("input[name=buyout_checkbox]" )[0].checked == true){
          params.buyout_price = $('#create_buyout_price').val();

          params.item_type = "both";

        }

      }

      else if(type == "buy"){
        params.item_price = $('input[name=create_selling_price]').val();
        params.buyout_price = '0';

        params.item_type = "buy";  params.buyout_price = '0';




      }
      else{
        console.log("NONE");
      }


      //Add Shipping info



      options.params = params;
      console.log(options);
      var ft = new FileTransfer();
      console.log(ft);
      $.mobile.showPageLoadingMsg(); 

      ft.upload(imageURI, encodeURI(server_name), success_upload, fail_upload, options);
    }

    function success_upload(r) {

      var item_name = $('input[name=create_item_name]').val();
      $.mobile.hidePageLoadingMsg(); 

      var regex = /[^0-9]+/g;

      var item_id= r.response.replace(regex, "");


      $('#item_create_form')[0].reset();

      $('#preview_image').attr('src', '');

      sessionStorage.setItem('item_id', item_id);


      $.mobile.changePage('#success_item_creation_dialog');
      $('#success_item_creation').html(item_name);

      $('#view_recent_item').unbind('click').bind('click', function(){

        $.mobile.changePage('#manage_item_page');





      });





    }

    function fail_upload(error) {
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }




    function capturePhoto()
    {
      var options = {
        quality: 45,
        targetWidth: 1000,
        targetHeight: 1000,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        sourceType: Camera.PictureSourceType.CAMERA
      };
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(previewPhoto, onFail, options);


    }

    //Enables the user to browse from his photo library
    function browsePhoto()
    {


     var options = {
      quality: 45,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    navigator.camera.getPicture(previewPhoto, onFail, options);

  }
  

  function onFail()
  {

    console.log("FAILED TO START CAMERA");
  }

  //Item creation page form initialization
  function initialize_create_item_page()
  {


    $('#item_create_form')[0].reset();

    $('#preview_image').attr('src', '');



    $('#preview_pic').unbind('click').bind('click', capturePhoto);
    $('#browse_pic').unbind('click').bind('click', browsePhoto);

    $("input[name='item_type']" ).unbind('click').bind( "click", item_type_func );

    $("input[name='buyout_checkbox']" ).unbind('click').bind( "click", buyout_option );
    $('#create_item_save').unbind('click').bind('click',upload_item);
    $.mobile.showPageLoadingMsg(); 

    $.ajax({


      type: "GET",
      url : lb_server + "/get_category_options",
      success: function(data)
      { 

        var category_options = $('#create_category');
        var option = $(document.createElement('option'));
        option.html("Choose...");
        category_options.append(option);
        for(var i = 0; i < data.length; i ++){




          option = $(document.createElement('option'));
          option.html(data[i].category_name);
          option.attr('value', data[i].cat_id);
          category_options.append(option);

        }
        category_options.trigger("create");
        $('#create_category').on('change', recursive_category_population);

        $.mobile.hidePageLoadingMsg(); 

      },
      error: function(data)
      {


      }
    })



  }

