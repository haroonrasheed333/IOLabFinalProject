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
          map = new google.maps.Map(document.getElementById('wikidiv2'), mapOptions);
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
      $('#wikidiv1').empty();
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
                    
              $('#twitter').append('<li class="term"><img id="imgtwit" style="height:20px width:20px" src="img/twitter.jpg"/> '+ tweet +'</li>')
              j += 1;
            }  
                 
          };
        });
      };



    function getVid(input) {
        var youtubeURL =  'http://gdata.youtube.com/feeds/api/videos?q=' + queryTerm + '&alt=json-in-script&callback=?&max-results=12';

        $.getJSON(youtubeURL, function(json){
        var feed = json.feed;
      var entries = feed.entry || [];
      var html = ['<ul id="videos">'];
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
        var playerUrl = entries[i].media$group.media$content[0].url;
        html.push('<li>', '<a class="fancybox-media" href="', playerUrl, '"><img id="imgyoutube" src="', thumbnailUrl, '" width="130" height="97"/></a>', '</li>');
      }
      html.push('</ul><br style="clear: left;"/>');
      document.getElementById('youtube').innerHTML = html.join('');
        });
    }

      $('.fancybox-media')
      .attr('rel', 'media-gallery')
      .fancybox({
        openEffect : 'none',
        closeEffect : 'none',
        prevEffect : 'none',
        nextEffect : 'none',
        arrows : false,
        helpers : {
          media : {},
          buttons : {}
        }
      });

     
      function getGooglenews(){

        $('#googlenews').empty();
        var googleQuery = queryTerm;
        googleQuery = googleQuery.replace(/\s+/g,"%20");
        var googleURL = 'http://ajax.googleapis.com/ajax/services/search/news?v=1.0&q='+googleQuery +'&callback=?';
        
        $.getJSON(googleURL, function(json){
          googleResults = json.responseData.results;
          console.log(googleResults.length)
          if(googleResults.length == 0)
          {
              console.log("No News from GoogleNews");
          }
          else 
          {  
              for(var i = 0; i < googleResults.length; i++) 
              {
                 var newsContent = googleResults[i].content
                 newsContent = newsContent.replace(/<b>/g,"");
                 newsContent = newsContent.replace(/<\/b>/g,"");     
     
                $('#googlenews').append('<hr><li class="term"><a href="'+googleResults[i].signedRedirectUrl+'" title="'+newsContent+'">"'+ googleResults[i].titleNoFormatting+'</li></hr>');

              }  
                   
            };
          });
      }

      function getFlickr(){
        $('#flickr').empty();

        var theHtml="";

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
              {tags: queryTerm, tagmode: "any", format: "json"},
              function(data) {
                console.log("here");
                $.each(data.items, function(i,item) {
                  console.log("here");
                  theHtml += '<li><a href="' + item.media.m.replace("_m", "") + '" target="_blank">';
                  theHtml += '<img id="imgFlick" height="150px" width="150px" title="' + item.title +
                    '" src="' + item.media.m.replace("_m", "") + '" alt="' + item.title + '" />';
                  theHtml += '</a></li>';
                });
                 console.log(theHtml);
                $("#flickr").append(theHtml);
                // added by sonali -->
               // $('#flickr li').draggable({revert: true});
              });
      }


    /*  function getComments()
      {

        var queryTerm = $('#myinput').val();
        var dataString = 'queryTerm='+ queryTerm;
      {
        $("#flash").show();
        $("#flash").fadeIn(400).html('<img src="ajax.gif" align="absmiddle">&nbsp;<span class="loading">Loading Comment...</span>');
        $.ajax({
          type: "POST",
          url: "displayajax.php",
          data: dataString,
          cache: false,
          success: function(html){
            $("ol#update").empty().append(html);
            $("ol#update li:last").fadeIn("slow");
            document.getElementById('email').value='';
            document.getElementById('name').value='';
            document.getElementById('comment').value='';
            $("#name").focus();
            $("#flash").hide();
          }
        });
      }
    var ele = document.getElementById('comments');
    ele.style.display = "block";
    return false;

      }*/


   /* function addComments(){
      var name = $("#name").val();
    var email = $("#email").val();
    var comment = $("#comment").val();
    var post_id = $("#post_id_value").val();
    var dataString = 'name='+ name + '&email=' + email + '&comment=' + comment + '&post_id=' + post_id;
    if(name=='' || email=='' || comment=='')
       {
        alert('Please Give Valid Details');
       }
    else
      {
        $("#flash").show();
        $("#flash").fadeIn(400).html('<img src="ajax.gif" align="absmiddle">&nbsp;<span class="loading">Updating Comment...</span>');
        $.ajax({
          type: "POST",
          url: "commentajax.php",
          data: dataString,
          cache: false,
          success: function(html){
            $("ol#update").append(html);
            $("ol#update li:last").fadeIn("slow");
            document.getElementById('email').value='';
            document.getElementById('name').value='';
            document.getElementById('comment').value='';
            $("#name").focus();
            $("#flash").hide();
          }
        });
      }
    return false;

    } */

     $('#showResults').click(function() {
      queryTerm = $('#myinput').val();

        /*getComments();*/
        codeAddress();
        getDescription();
        getTwitter();
        getGooglenews();
        getFlickr();  
        getVid();
        showResults();


    });


/*  $('#addComment').click(function() {
      queryTerm = $('#myinput').val();
      addComments();

    }); */
});


  