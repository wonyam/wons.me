<?php
    require_once "../common/conf.db.php";
    require_once "functions.php";

    class User {
        public $user;

        function doLogin($detailData) {
            $username = $detailData['username'];
            $password = $detailData['password'];
            if(!empty($username) and !empty($password)){
                //if(filter_var($username, FILTER_VALIDATE_EMAIL)){

                    if(strpos($username, '@') != false) {
                        $strkey = "user_email";
                    } else {
                        $strkey = "user_login";
                    }

                    $query = "SELECT ID, user_login, user_firstname, user_lastname, user_siteurl, user_status FROM users where $strkey = ? and user_pass=? and user_status!=9";

                    try {
                        $db = getDB();
                        $mcrypt = new MCrypt();

                        $stmt = $db->prepare($query);
                        $stmt->execute(array($username, $mcrypt->encrypt($password)));
                        $result = $stmt->fetch(PDO::FETCH_ASSOC);
                        $rowcount = $stmt->rowCount();
                        $db = null;

                        //return array('username'=>$username, 'password'=>$mcrypt->encrypt($password));
                        $result['count'] = $rowcount;
                        return $result;

                    } catch(FDOException $e) {
                        throw $e;
                    }
                    
                //}
            }
        }
        
        function getUsers() {
            $query="SELECT ID, user_login, user_firstname, user_lastname, user_email, user_siteurl, user_registered, user_status FROM users  ORDER BY ID ASC";
            
            try {
                $db = getDB();

                $stmt = $db->prepare($query);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_OBJ);
                $db = null;
                return $result;

            } catch(PDOException $e) {
                throw $e;
            }
        }

        function getUser($userid) {
            if($userid > 0){    
                $query="SELECT user_login, user_firstname, user_lastname, user_email, user_siteurl, user_registered, user_status FROM users where ID=?";
                
                try {
                    $db = getDB();
                    $stmt = $db->prepare($query);
                    $stmt->execute(array($userid));
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $db = null;
                    return $result;

                } catch(PDOException $e) {
                    throw $e;
                }
            }
        }

        function insertUser($detailData) {

            $mcrypt = new MCrypt();
            $date = date('Y-m-d H:i:s');
            $detailData['user_registered'] = $date;

            $column_names = array('user_login', 'user_pass', 'user_firstname', 'user_lastname', 'user_email', 'user_siteurl', 'user_status', 'user_registered');
            $keys = array_keys($detailData);
            $columns = '';
            $arr_values = array();
            $values = '';
            foreach($column_names as $desired_key){ // Check the detailData received. If blank insert blank into the array.
               if(!in_array($desired_key, $keys)) {
                    $$desired_key = '';
                }else{
                    $$desired_key = $detailData[$desired_key];
                }
                $columns = $columns.$desired_key.',';
                $values = $values." :$desired_key ,";
                array_push($arr_values, $mcrypt->conver_value($desired_key, $$desired_key, 'e'));   // encrypt password
            }

            $query = "INSERT INTO users (".trim($columns,',').") VALUES(".trim($values,',').")";

            try {
                $db = getDB();
                $stmt = $db->prepare($query);
                for($i=0;$i<count($arr_values);$i++) {
                    $stmt->bindParam($column_names[$i], $arr_values[$i]);
                }

                $stmt->execute();

                $rowCount = $stmt->rowCount();
                $db = null;
  
                if($rowCount > 0) {
                    return array('rowCount'=>$rowCount);
                } else {
                    throw new Exception("There was no data to insert.");
                }

            } catch(FDOException $e) {
                throw $e;
            }
        }

        function updateUser($detailData) {

            $mcrypt = new MCrypt();
            $id = (int)$detailData['userid'];
            $action = (int)$detailData['action'];

            if($action == 0) {
                $column_names = array('user_login', 'user_firstname', 'user_lastname', 'user_email', 'user_siteurl', 'user_status');
            } else {
                $column_names = array('user_pass');             
            }
            $keys = array_keys($detailData['detailData']);
            $columns = '';
            $values = '';
            $arr_values = array();
            foreach($column_names as $desired_key){ // Check the detailData received. If key does not exist, insert blank into the array.
               if(!in_array($desired_key, $keys)) {
                    $$desired_key = ''; 
                }else{
                    $$desired_key = $detailData['detailData'][$desired_key];
                }
                $columns = $columns.$desired_key."= :$desired_key ,";
                array_push($arr_values, $mcrypt->conver_value($desired_key, $$desired_key, 'e'));
            }
            //array_push($arr_values, $id);
            $query = "UPDATE users SET ".trim($columns,',')." WHERE ID=:id";

            try {
                $db = getDB();
                $stmt = $db->prepare($query);

                for($i=0;$i<count($arr_values);$i++) {
                    $stmt->bindParam($column_names[$i], $arr_values[$i]);
                }
                $stmt->bindParam('id', $id);
                $stmt->execute();
                
                $rowcount = $stmt->rowCount();
                $db = null;

                if($rowcount > 0) {
                    return array('rowcount'=>$rowcount);
                } else {
                    throw new Exception("There is no changed information.");
                }

            } catch(FDOException $e) {
                throw $e;
            }
        }

        function deleteUser($id) {

            $query="DELETE FROM users WHERE ID = :id ";
            
            try {
                $db = getDB();
                $stmt = $db->prepare($query);
                $stmt->bindParam('id', $id, PDO::PARAM_INT);
                $stmt->execute();
                //$stmt->execute(array($id));

                $rowcount = array('rowCount'=>$stmt->rowCount());
                //$result = $stmt->fetchAll(PDO::FETCH_OBJ);
                //$rowcount = $stmt->rowCount();

                $db = null;

                return $rowcount;
            } catch(FDOException $e) {
                throw $e;
            }
        }

        function insertUserSite() {

            try {
                //uploadImage('file', '../uploads/');

                $uploads = new Uploads();

                $target_dir = "../uploads/";
                $obj_name = 'file';

                $target_file = $uploads->uploadImage($obj_name, $target_dir);


                $column_names = array('user_id', 'site_url', 'site_css', 'site_head_title', 'site_head_subtitle', 'site_twitter', 'site_facebook', 'site_linkedin');

               // $css = $_POST['site_css'];
                $columns = '';
                $values = '';
                $arr_values = array();

                foreach($column_names as $desired_key) {
                    if(!isset($_POST[$desired_key])) {
                        $$desired_key = "";
                    } else {
                        $$desired_key = $_POST[$desired_key];
                    }
                    $columns = $columns.$desired_key.',';
                    $values = $values. " :$desired_key ,";
                    array_push($arr_values, $$desired_key);
                }

                array_push($column_names, 'site_head_img');
                array_push($arr_values, $target_file);

                $columns = $columns.'site_head_img ,';
                $values = $values. " :site_head_img ,";
                
                $query = "INSERT INTO sites (".trim($columns,',').") VALUES(".trim($values,',').")";

               // throw new Exception($arr_values);

                //throw new Exception(implode(',', $column_names) ."  |  ". implode(',', $arr_values));
                
                try {
                    $db = getDB();
                    $stmt = $db->prepare($query);
                    for($i=0;$i<count($arr_values);$i++) {
                        $stmt->bindParam($column_names[$i], $arr_values[$i]);
                    } 

                    $stmt->execute();

                    $rowCount = $stmt->rowCount();
                    $db = null;

                } catch(FDOException $e) {
                    throw $e;
                }
                
                
                //$site_css = $detailGetData['detailData']; 
                //$site_title = $detailGetData['site_title'];

                //throw new Exception($detailGetData ."  |  ". $css);
            } catch(Exception $e) {
                throw $e;
            }

        }

        /*
        function check_login() {
            $this->user = $username;
            
            if($this->login_check_user($username, $password) > 0) {
                return true;
            } else {
                return false;
            }
        }
        
        function login_check_user($userid, $password) {
            global $dbo;
            
            if(strpos($userid, '@') != false) {
                $strKey = "USER_EMAIL";
            } else {
                $strKey = "USER_LOGIN";
            }
            
            $sql = "SELECT * FROM USERS WHERE ".$strKey."=? AND USER_PASS=? ";
            
            $result = $dbo->prepare($sql);
            $result->execute(array($userid, $password));
            
            //$number_of_rows = $result->fetchColumn();
            //return $number_ok_rows;
            if ($number_of_rows > 0) {
                echo "asd";
            } else {
                echo "222";
            }
        }

        function inquire_users() {
            try{
                global $dbo;
                $sql = "SELECT ID, user_login, user_pass, user_firstname, user_lastname, user_email, user_siteurl, user_registered, user_status FROM users ";
                $result = $dbo->prepare($sql);
                $result->execute();
                $data = $result->fetchAll(PDO::FETCH_ASSOC);

                return $data;
            } catch(PDOxception $e) {
                echo $e->getMessae();
                die();
            }
        }
        */
    }
    //$api = new API;
    //$api->processApi();

?>