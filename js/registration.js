
//Register a user


$(document).on('pagebeforeshow', '#registerForm', initialize_register_form);




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

 document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
      console.log("SUP");
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }


function capture_profile_photo()
{
  console.log("CAPTURING PHOTO");

      var options = {
        quality: 45,
        targetWidth: 1000,
        targetHeight: 1000,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        sourceType: Camera.PictureSourceType.CAMERA
      };
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(preview_profile_photo, on_profile_fail, options);


}

function browse_profile_photo()
{

     var options = {
      quality: 45,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    navigator.camera.getPicture(preview_profile_photo, on_profile_fail, options);


}



function preview_profile_photo(imageURI)
{
  console.log("Preview Image");

      $('#new_profile_image').attr('src', imageURI);
      $('#new_profile_image')[0].style.display = 'block';
      sessionStorage.setItem('profile_image', imageURI);


}
function on_profile_fail()
{
      console.log("FAILED TO START CAMERA");

}



function upload_registration_form()
{ 
  console.log("UPLOADING FORM");

  var imageURI = sessionStorage.getItem('profile_image');

  var options = new FileUploadOptions();
  options.fileKey ="file";
          options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
          options.mimeType="image/jpeg";

  var server_name = lb_server + "/register_user";

  var form_user = $('#new_user').serializeArray();
  var params = {};

  for(var i = 0; i < form_user.length; i++)
  {

      params[form_user[i].name] = form_user[i].value;
  }

  console.log(params);


  options.params = params;
  var ft = new FileTransfer();
  $.mobile.showPageLoadingMsg();
  console.log("upload ight crash");
  console.log(options);
  console.log("UPLOADING FUNCTION");

  ft.upload(imageURI, encodeURI(server_name), registration_success, registration_fail, options);

}
function registration_success(r)
{
  console.log(r.response);

      var regex = /[^0-9]+/g;

      var user_id= r.response.replace(regex, "");
      localStorage.setItem('id', user_id);
      console.log(user_id);

      $('#user_profile_trigger').trigger("click");
      $.mobile.hidePageLoadingMsg();


}
function registration_fail(r)
{
      $.mobile.hidePageLoadingMsg(); 

  console.log(r);

    $.mobile.changePage('#home');


}
function initialize_register_form()
{

        $('#new_profile_image').attr('src', '');



  $('#new_user')[0].reset();

  $('#preview_image').attr('src', '');

  console.log("INITIALIAZING REGISTER PAGE");

  $('#new_profile_pic').unbind('click').bind('click', capture_profile_photo);
  $('#new_browse_profile_pic').unbind('click').bind('click', browse_profile_photo);


  $('#register_user').unbind('click').bind('click', upload_registration_form);
}