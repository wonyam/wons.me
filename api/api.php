<?php
 	//require_once("../common/conf.db.php");
	require_once("../functions/function_users.php");
	require_once("../functions/function_template.php");
 	require_once("../common/conf.inc.php");
	
	class API extends CONF {
	
		public $data = "";
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',205); // If the method not exist with in this class "Page not found".
		}

		private function isLogin() {
			session_start();
			if($this->get_request_method() != "GET"){
				$this->response('',206);
			}

			if(isset($_SESSION['user_info']['user_login']) && !empty($_SESSION['user_info']['user_login'])) {
				$result = array('isLogin' => "true", 'user_info'=>$_SESSION['user_info']);
			} else {
				$result = array('isLogin' => "false", 'user_info'=>$_SESSION['user_info']);
			}
			//echo $result;
			$this->response($this->json($result), 200);

		}	

		private function logout() {
			session_start();
			session_destroy();
		}	

		private function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',206);
			}
			$detailData = json_decode(file_get_contents("php://input"),true);

			try {
				$user = new User();
				$result = $user->doLogin($detailData);

					//$this->response($this->json($result), 200);
				if($result['count']==0) {
					throw new Exception('Invalid Email address or Password');
				} else {
					//$result['re-count'] = $result['count'];
	
					session_start();
					$_SESSION['user_info'] = $result;

					$this->response($this->json($result), 200);
				}
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}

		private function users(){	
			if($this->get_request_method() != "GET"){
				$this->response('',206);
			}
			
			try {
				$user = new User();
				$result = $user->getUsers();
				$this->response($this->json($result), 200); // send user details

			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				//echo ($e);
				$this->response($this->json($error), 207);
			}
		}

		private function user(){	
			if($this->get_request_method() != "GET"){
				$this->response('',206);
			}
			$userid = (int)$this->_request['userid'];

			try {
				$userc = new User();
				$result = $userc->getUser($userid);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}
		
		private function insertUser(){
			if($this->get_request_method() != "POST"){
				$this->response('',206);
			}

			$detailData = json_decode(file_get_contents("php://input"),true);

			try {
				$user = new User();
				$result = $user->insertUser($detailData);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}

		private function updateUser(){
			if($this->get_request_method() != "POST"){
				$this->response('',206);
			}

			$detailData = json_decode(file_get_contents("php://input"),true);

			try {
    			//throw new Exception("Some error message");

				$user = new User();
				$result = $user->updateUser($detailData);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}
		
		private function deleteUser(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['userid'];
			
			try {
				if($id == 0){
					throw new Exception("There is no data to delete.");
				}
				$user = new User();
				$result = $user->deleteUser($id);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}

		private function templates(){	
			if($this->get_request_method() != "GET"){
				$this->response('',206);
			}
			
			try {
				$template = new Template();
				$result = $template->getTemplates();
				$this->response($this->json($result), 200); // send user details

			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				//echo ($e);
				$this->response($this->json($error), 207);
			}
		}
		
		private function template(){	
			if($this->get_request_method() != "GET"){
				$this->response('',206);
			}
			$template_id = (int)$this->_request['template_id'];

			try {
				$template = new Template();
				$result = $template->getTemplate($template_id);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}
		
		private function insertTemplate(){
			if($this->get_request_method() != "POST"){
				$this->response('',206);
			}

			$detailData = json_decode(file_get_contents("php://input"),true);

			try {
				$template = new Template();
				$result = $template->insertTemplate($detailData);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}

		private function updateTemplate(){
			if($this->get_request_method() != "POST"){
				$this->response('',206);
			}

			$detailData = json_decode(file_get_contents("php://input"),true);

			try {
    			//throw new Exception("Some error message");

				$template = new Template();
				$result = $template->updateTemplate($detailData);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}
		
		private function deleteTemplate(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$template_id = (int)$this->_request['template_id'];
			
			try {
				if($template_id == 0){
					throw new Exception("There is no data to delete.");
				}
				$template = new Template();
				$result = $template->deleteTemplate($template_id);
				$this->response($this->json($result), 200);
			} catch(Exception $e) {
				$error = array('status' => "Failed", "msg" => $e->getMessage());
				$this->response($this->json($error), 207);
			}
		}
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();

?>