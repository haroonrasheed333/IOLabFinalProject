  



$(function() {
    $('#showResults').click(function() {
        codeAddress();
        showResults();
    });
});



    var geocoder;
    var map;

    function codeAddress() {
      console.log("Entered function Code address")
      geocoder = new google.maps.Geocoder();
      var address = document.getElementById("myinput").value;
      console.log(address);
      geocoder.geocode( { 'address': address}, function(results, status) {
        console.log(status);
        console.log(results[0].geometry.location);
        if (status == google.maps.GeocoderStatus.OK) {
             var mapOptions = {
              zoom: 14,
              center: results[0].geometry.location,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(document.getElementById('map'), mapOptions);


          //map.setCenter(results[0].geometry.location);

          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

    function showResults() {
      var ele = document.getElementById('contents');
        ele.style.display = "block";
    }
