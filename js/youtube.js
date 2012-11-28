var query;
var query1;
var result;
var title;
var abstract;
var urll;

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
        query1 = query.replace("%20", " ")
    	getVid();
    	getNYTimes();
    	var service = 'News';
		if (query1)
			bingNewsSearch(query1, service);
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

function getNYTimes(input) {
    var articleURL = 'http://api.nytimes.com/svc/search/v1/article?format=json&query=' + query1 + '&api-key=579c0d468cffcc963fc547b5e45cb65c:14:66734303';
	var phpproxy = 'http://people.ischool.berkeley.edu/~haroon/IOLab/samp.php?callback=?'
	$.getJSON(phpproxy, {"url": articleURL}, function(data){
		console.log(data.results);
		var h = document.createElement('h1');
			$(h).append("NYTIMES");
			$('#nytimes').append(h);
		var html = ['<ul class="news">'];
		for (var i = 0; i < 5; i++)  {
    		var url = data.results[i].url;    		
    		var phpproxy2 = 'http://people.ischool.berkeley.edu/~haroon/IOLab/samp2.php?callback=?'
    		var newsURL = 'http://api.nytimes.com/svc/news/v3/content.json?&url='+url+'&api-key=6b8d475bf3699ab7851fc40722dc1235:7:66734303';
    		$.getJSON(phpproxy2, {"url": newsURL}, function(data2){
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

function bingNewsSearch(query, service)
{
	$.getJSON('http://people.ischool.berkeley.edu/~haroon/IOLab/bing_proxy.php?callback=?', {q: query, sop: service}, function(data)
	{
		if (data.d !== undefined)
		{
			var items = data.d.results;

			var h = document.createElement('h1');
			$(h).append("BING");
			$('#bing').append(h);
			for (var i = 0 ; i < items.length; i++)
			{
				var item = items[i];
				var p = document.createElement('p');
				var a = document.createElement('a');
				a.href = item.Url;
				$(a).append(item.Title);
				$(p).append(item.Description);
				$('#bing').append(a, p);
			}
		}
	});
}
