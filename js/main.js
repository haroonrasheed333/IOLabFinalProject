  $(function() {

  var queryTerm;
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
              zoom: 15,
              center: results[0].geometry.location,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
          map = new google.maps.Map(document.getElementById('map'), mapOptions);
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

    function getDescription() {
      var university =document.getElementById("myinput").value.replace(/ /g,"_").replace( /,/g, "" ).toLowerCase();
      console.log(university);

      var freebaseURL =  'https://www.googleapis.com/freebase/v1/text/en/'+ university;
      console.log(freebaseURL);
      $.getJSON(freebaseURL, function(json){
        var feed = json.result;
        console.log(feed);
        $("#wikidiv1").append('<p id="description">' + feed + '</p>');
      });
    }

    // Function to get twitter feed
    // Function to get twitter feed
   function getTwitter(){
      $('#twitter').empty();
      var twitterQuery = queryTerm;
      twitterQuery = twitterQuery.replace(/\s+/g,"%20");
      var tweetURL =  'http://search.twitter.com/search.json?q=' + twitterQuery + '&callback=?&include_entities=true&rpp=100';
      
      $.getJSON(tweetURL, function(json){
        var j=0;
        tweets = json.results;
        console.log(tweets.length)
        if(tweets.length == 0)
        {
            console.log("No tweets");
        }
        else 
        {  
            for(var i = 0; i < tweets.length && j<10; i++) 
            {           
                var tweet = tweets[i].text
                for (var a = 0, n = tweet.length; a < n; a++) {
                    if (tweet.charCodeAt( i ) > 255) { 
                      console.log(tweet);
                      continue;
                       }
                    }
                    
              $('#twitter').append('<li class="term">'+ tweet +'</li>')
              j += 1;
            }  
                 
          };
        });
      };

     $('#showResults').click(function() {
      queryTerm = $('#myinput').val();
        codeAddress();
        getDescription();
        showResults();
        getTwitter();
    });
});