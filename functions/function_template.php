<?php
    require_once "../common/conf.db.php";

    class Template {
        public $template;
        
        function getTemplates() {
            $query="SELECT template_id, template_name, template_kind, template_status FROM templates  ORDER BY template_id ASC";
            
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

        function getTemplate($template_id) {
            if($template_id > 0){    
                $query="SELECT template_id, template_name, template_url, template_kind, template_status FROM templates where template_id=?";
                
                try {
                    $db = getDB();
                    $stmt = $db->prepare($query);
                    $stmt->execute(array($template_id));
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $db = null;
                    return $result;

                } catch(PDOException $e) {
                    throw $e;
                }
            }
        }

        function insertTemplate($detailData) {

            $column_names = array('template_name', 'template_url', 'template_kind', 'template_status');
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
                array_push($arr_values, $$desired_key); 
            }

            $query = "INSERT INTO templates (".trim($columns,',').") VALUES(".trim($values,',').")";

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

        function updateTemplate($detailData) {

            $id = (int)$detailData['template_id'];

            $column_names = array('template_name', 'template_url', 'template_kind', 'template_status');
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
                array_push($arr_values, $$desired_key);
            }
            //array_push($arr_values, $id);
            $query = "UPDATE templates SET ".trim($columns,',')." WHERE template_id=:id";

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

        function deleteTemplate($id) {

            $query="DELETE FROM templates WHERE template_id = :id ";
            
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
    }
    //$api = new API;
    //$api->processApi();

?>