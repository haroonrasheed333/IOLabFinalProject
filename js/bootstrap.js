$(document).ready(function() {
  
  $('#fetch').click(function() {

    var t = "UC Berkeley";
    console.log(t);
  
    var theHtml="";
  
   $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
              {tags: t, tagmode: "any", format: "json"},
              function(data) {
                console.log("here");
                $.each(data.items, function(i,item) {
                  console.log("here");
                  theHtml += '<li><a href="' + item.media.m.replace("_m", "") + '" target="_blank">';
                  theHtml += '<img height="75px" width="75px" title="' + item.title +
                    '" src="' + item.media.m.replace("_m", "") + '" alt="' + item.title + '" />';
                  theHtml += '</a></li>';
                });
                 console.log(theHtml);
                $("#mediadivtop1 ul").append(theHtml);
                // added by sonali -->
               // $('#flickr li').draggable({revert: true});
              });
  return false; 
  
  });
  

        
  });

