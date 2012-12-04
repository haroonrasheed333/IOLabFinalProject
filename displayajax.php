<?php
include('config.php');
if($_POST)
{
	$queryTerm=$_POST['queryTerm'];
	$queryTerm=mysql_real_escape_string($queryTerm);
	$sqla=mysql_query("INSERT IGNORE INTO posts (post_title) VALUE ('$queryTerm')") or die(mysql_error());
	$sql=mysql_query("select * from posts where post_title='$queryTerm'") or die(mysql_error());
	?>
	<?php
	while($row=mysql_fetch_array($sql))
	{
	$post_id=$row['post_id']; ?>
	
	<p id="post_id_no" style="display: none;">
	<input type="text" id="post_id_value" value="<?php echo $post_id ?>">
	</p>
	
	<?php
	$sql1=mysql_query("select * from comments where post_id_fk='$post_id'") or die(mysql_error());
	while($row=mysql_fetch_array($sql1))
	{
		$name=$row['comm_name'];
		$email=$row['comm_email'];
		$comment_dis=$row['comm_dis'];
		$lowercase = strtolower($email);
		$image = md5( $lowercase );
		?>
		<li>
<img src="img/Comment.jpg" style="float:left; width:20px; height:20px; margin-right:10px"/><span style="font-size:medium; font-weight:bold;">

		<?php echo $name;?></span> <br /> <br />
		<?php echo "<div style='margin:10px; word-wrap:break-word'>  $comment_dis </div>"; ?>
		</li><?php
	}
}
	mysql_close($bd);
}
?>