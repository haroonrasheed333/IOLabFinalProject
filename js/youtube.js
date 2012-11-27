var query;

$(document).ready(function() {
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

	$('#showme').on('click',function(e){
		query = $('#searchField').val();
		query = query.replace(" ", "%20")
        query = query.toLowerCase();            
    	getVid();
	});
});

function getVid(input) {
    var youtubeURL =  'http://gdata.youtube.com/feeds/api/videos?q=' + query + '&alt=json-in-script&callback=?&max-results=10';

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
	document.getElementById('videos2').innerHTML = html.join('');
    });
}