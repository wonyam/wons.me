<?php
/*
	$servername = "localhost";
	$username = "mozaic";
	$password = "Gcyf755#";    // real: Gcyf755#
	$dbname = "mozaic";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	*/

	$host_name = "localhost";
	$database = "wons"; // Change your database name
	$username = "wons"; // Your database user id 
	$password = "Dnjsl7963"; // Your password
	
	//////// Do not Edit below /////////
	try {
	$dbo = new PDO('mysql:host='.$host_name.';dbname='.$database, $username, $password);
	//print "PDO connection is success!!";
	} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
	}
?> 