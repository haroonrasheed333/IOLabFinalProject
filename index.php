<!DOCTYPE html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/freebase/suggest/4_0/suggest.min.css" />
    <script type="text/javascript" src="https://www.gstatic.com/freebase/suggest/4_0/suggest.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&language=en"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <link href='http://fonts.googleapis.com/css?family=Stalemate' rel='stylesheet' type='text/css'>

     <script type="text/javascript" src="js/jquery.fancybox.js?v=2.1.3"></script>
    <link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css?v=2.1.2" media="screen" />
    <script type="text/javascript" src="js/jquery.fancybox-media.js?v=1.0.5"></script>


    <title>Socially</title>
    <!-- Bootstrap -->

    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/index.css" rel="stylesheet" media="screen">
	<script type="text/javascript">
	$(function() {
		$(".submit").click(function() {
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
					$("#flash").fadeIn(400).html('<img src="img/fancybox_loading.gif" align="absmiddle">&nbsp;<span class="loading">Updating Comment...</span>');
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
		});
	});
	</script>
  </head>  
  <body>
	<div id="wrapper">
    <div class="container">
              <div id="title"><p>University Briefs...</p></div>
              <div id="bkimg"><img style="height:400px width:400px;" src="img/univ.png"/></div>
            <div id="searchbtn" style="float:left">
              <input type="text" class="input-xlarge search-query" id="myinput" placeholder="Search for University">
                  <script type="text/javascript">
                        $("#myinput")
                        .suggest({
                          "key": "AIzaSyDYGo8Upb6LpIa-EHvAi2w44lhLkAK538w",
                          filter: '(all type:/education/university)'
                        })
                        .bind("fb-select", function(e, data) {
                          //alert(data.name);
                        });
                  </script>
              <input type="button" class="btn" value="Search" id="showResults">
              <!-- <button type="submit" class="btn" onclick="codeAddress()">Search</button> -->
            </div>
        </div>
    <div id="mainContent" style="display: none">
	<div id="contents">

          <!--<div id="wikihead"></div> -->
          
          <div id="wikidiv">
              <div id="wikidiv1">           
              </div>
              <div id="wikidiv2"> </div>
          </div>
      

         <!-- <div id="mediahead"><h2><span>S</span>ocial<em> Media </em></h2></div> -->
          <div id="mediadiv">
              <div id="mediadivtop">
                
                <div id="mediadivtop1" >
                <h3>FLICKR</h3>
                  
                 <ul id="flickr"></ul>
                </div>
                
                <div id="mediadivtop2">
                 <img id="imgtwit" style="height:20px width:20px" src="img/twitter.jpg"/> 
                <h3>TWITTER</h3>
                <div id="tweets">
                <ul id="twitter"></ul>
                </div>
                </div>
                 <div id="mediadivtop3">

                  <h3>YOUTUBE</h3></div>
                  <div id="youtube">
                  </div>
                
              </div>

          </div>



           <!--   <div id="newshead"></div> -->
          <div id="newsdiv">
              <div id="newsdivtop">
                <div id="newsdivtop1">
                  <h3>GOOGLE NEWS</h3>
                  <div id="gnews">
                     <ul id="googlenews"></ul>
                   </div>
                </div>
                <div id="newsdivtop2">
                  <h3>BING</h3>
                      <div id="bnews">
                     <ul id="bingnews"></ul>
                   </div>
                </div>


              </div>
        
            <div id="newsdivbot">
              <div id="newsdivbot1"> 
                <h3>NY TIMES</h3>
                <div id="nynews">
                     <ul id="nytimes"></ul>
                   </div>

              </div>
              <div id="newsdivbot2"> 
                <h3> GUARDIAN</h3>
                  <div id="guardnews">
                     <ul id="guardian"></ul>
                   </div>>

              </div>
            </div>

          </div>
    

	</div>

	<div id="comments">
    <h3 > COMMENTS</h3>
			<ol id="update" class="timeline"></ol>
			<div id="flash" align="left"  ></div>
			<div id="comm">
			<form action="#" method="post">
			<span class=sub>Name</span><span class="star">*</span><input type="text" name="title" id="name"/><br />
			<span class=sub>Email</span><span class="star">*</span><input type="text" name="email" id="email"/><br />
			<textarea name="comment" id="comment"></textarea><br />
     <input type="submit" class="btn" value="Add Comment" />


			</form>
			</div>
	</div>
	
	</div>
	</div>
  </body>
</html>