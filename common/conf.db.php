<?php
function getDB() {
    $dbhost="localhost";
    $dbuser="wons";
    $dbpass="Dnjsl7963";
    $dbname="wons";
    /*
    $dbpass="root";
    $dbname="angularcrud";
    */
    $dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}
?>