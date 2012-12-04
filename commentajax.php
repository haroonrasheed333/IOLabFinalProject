<?php
include('config.php');
if($_POST)
{
$name=$_POST['name'];
$name=mysql_real_escape_string($name);
$email=$_POST['email'];
$email=mysql_real_escape_string($email);
$comment=$_POST['comment'];
$comment=mysql_real_escape_string($comment);
$post_id=$_POST['post_id'];
$post_id=(int)mysql_real_escape_string($post_id);
$qry = mysql_query("INSERT INTO comments (comm_name,comm_email,comm_dis,post_id_fk) VALUES ('$name','$email','$comment',$post_id)") or die(mysql_error());
mysql_close($bd);
}
?>
<li>
<img src="img/Comment.jpg" style="float:left; width:20px; height:20px; margin-right:10px"/><span style="font-weight:bold;font-size:medium;">
<!--img src="img/Comment.jpg" style="float:left; width:20px; height:20px; margin-right:10px"/><span style="font-size:small; font-family:arial; color:white;font-style:italic;
; font-weight:bold"-->
<?php echo $name;?></span> <br /><br />
<?php echo $comment; ?>
</li>
