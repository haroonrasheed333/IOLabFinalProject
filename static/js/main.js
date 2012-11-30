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
                    
              $('#twitter').append('<li class="term">'+ tweet +'</li>')
              j += 1;
            }  
                 
          };
        });
      };

      // Function to get Google News
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
     
                $('#googlenews').append('<li class="term"><a href="'+googleResults[i].signedRedirectUrl+'" title="'+newsContent+'">"'+ googleResults[i].titleNoFormatting+'</li>');

              }  
                   
            };
          });
      }
    // Function to get Bing News
    function getBing()
    {
      service = 'News';
      $('#bing').empty();
      var query = queryTerm;
      $.getJSON('http://people.ischool.berkeley.edu/~haroon/IOLab/bing_proxy.php?callback=?', {q: query, sop: service}, function(data)
      {
        if (data.d !== undefined)
        {
          var items = data.d.results;
          for (var i = 0 ; i < items.length; i++)
          {
            var item = items[i];
            $('#bing').append('<li class="term"><a href="'+item.Url+'" title="'+item.Description+'">"'+ item.Title+'</li>');
          
          }
        }
      });
    }
    // Function to get NY Times News
      function getNYTimes1(){

        $('#nytimes').empty();
        var Query = queryTerm;
        Query = Query.replace(/\s+/g,"+");
        var URL = 'http://api.nytimes.com/svc/search/v1/article?format=json&query=' + Query + '&api-key=579c0d468cffcc963fc547b5e45cb65c:14:66734303&callback=?';
        $.getJSON(URL, function(json){
          Results = json.results;
          console.log(googleResults.length)
          if(Results.length == 0)
          {
              console.log("No News from NY Times");
          }
          else 
          {  
              for(var i = 0; i < Results.length; i++) 
              {
                 var newsContent = Results[i].content
                 newsContent = newsContent.replace(/<b>/g,"");
                  newsContent = newsContent.replace(/<\/b>/g,"");     
     
                $('#NYTimes').append('<li class="term"><a href="'+Results[i].signedRedirectUrl+'" title="'+newsContent+'">"'+ Results[i].titleNoFormatting+'</li>');

              }  
                   
            };
          });
      }


       function getNYTimes(){
        $('#nytimes').empty();
        var query1 = queryTerm;
      // query1 = document.getElementById("myinput").value.replace(/ /g,"+").toLowerCase();
        var articleURL = 'http://api.nytimes.com/svc/search/v1/article?format=json&query=' + query1 + '&api-key=579c0d468cffcc963fc547b5e45cb65c:14:66734303&callback=?';
      // var phpproxy = 'http://people.ischool.berkeley.edu/~haroon/IOLab/samp.php?callback=?'
      // $.getJSON(phpproxy, {"url": articleURL}, function(data){
      $.getJSON(articleURL, function(data){
        console.log(data.results);
        var h = document.createElement('h1');
          $(h).append("NYTIMES");
          $('#nytimes').append(h);
        var html = ['<ul class="news">'];
        for (var i = 0; i < 5; i++)  {
            var url = data.results[i].url;        
            var newsURL = 'http://api.nytimes.com/svc/news/v3/content.json?&url='+url+'&api-key=6b8d475bf3699ab7851fc40722dc1235:7:66734303&callback=?';
            $.getJSON(newsURL, function(data2){
              console.log(data2);
              result = data2.results[0];
              title = result.title;
              abstract = result.abstract;
              urll = result.url;
              console.log(title);
              //html.push('<li>Title: ', title , ' Abstract: ', abstract, ' url=', urll , '</li>');
              $('<li></li>').html('Title: ' + title + ' Abstract: ' + abstract + ' url=' + urll)
                .appendTo('.news');
            });
          }
          html.push('</ul><br/>');
          document.getElementById('news2').innerHTML = html.join('');

      });
    }

 


      function getFlickr(){

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
                $("#mediadivtop1 ul").append(theHtml);
                // added by sonali -->
               // $('#flickr li').draggable({revert: true});
              });
      }

    function getVid(input) {
        var youtubeURL =  'http://gdata.youtube.com/feeds/api/videos?q=' + queryTerm + '&alt=json-in-script&callback=?&max-results=10';

        $.getJSON(youtubeURL, function(json){
        var feed = json.feed;
      var entries = feed.entry || [];
      var html = ['<ul class="videos">'];
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
        var playerUrl = entries[i].media$group.media$content[0].url;
        html.push('<li>', '<a class="fancybox-media" href="', playerUrl, '"><img src="', thumbnailUrl, '" width="130" height="97"/></a>', '</li>');
      }
      html.push('</ul><br style="clear: left;"/>');
      document.getElementById('newsdivbot1').innerHTML = html.join('');
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



     $('#showResults').click(function() {
      queryTerm = $('#myinput').val();
        codeAddress();
        getDescription();
        getTwitter();
        getGooglenews();
        getFlickr();
        getVid();
        getNYTimes();
        getBing();
        showResults();
    });
});