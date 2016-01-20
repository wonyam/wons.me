<?php 

class MCrypt
{
    private $iv = 'fedcba9876543210'; #Same as in JAVA
    private $key = '0123456789abcdef'; #Same as in JAVA

    function __construct()
    {
    }

    function encrypt($str) {

    //$key = $this->hex2bin($key);    
    $iv = $this->iv;

    $td = mcrypt_module_open('rijndael-128', '', 'cbc', $iv);

    mcrypt_generic_init($td, $this->key, $iv);
    $encrypted = mcrypt_generic($td, $str);

    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

    return bin2hex($encrypted);
    }

    function decrypt($code) {
    //$key = $this->hex2bin($key);
    $code = $this->hex2bin($code);
    $iv = $this->iv;

    $td = mcrypt_module_open('rijndael-128', '', 'cbc', $iv);

    mcrypt_generic_init($td, $this->key, $iv);
    $decrypted = mdecrypt_generic($td, $code);

    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

    return utf8_encode(trim($decrypted));
    }

    protected function hex2bin($hexdata) {
    $bindata = '';

    for ($i = 0; $i < strlen($hexdata); $i += 2) {
          $bindata .= chr(hexdec(substr($hexdata, $i, 2)));
    }

    return $bindata;
    }

    public function conver_value($keyword, $value, $kind) {

        $standard_key = array('pass', 'Pass', 'PASS');
        $tf = false;

        //$mcrypt = new MCrypt();
        
        for($i=0; $i <count($standard_key); $i++) {
            if(strpos($keyword, $standard_key[$i])) {
                $tf = true;
                contine;
            } 
        }

        //echo("key=$keyword|value=$value<br />");
        if($tf == true) {
            if($kind == "e") {
                $value =$this->encrypt($value);
            } else {
                $value = $this->decrypt($value);
            }
        }

        return $value;
    }
}
 
class Uploads {   

//    public $Uploads;

    function uploadImage($obj_name, $target_dir) {

        try {

            $target_file = $target_dir . basename($_FILES[$obj_name]["name"]);

            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

            // Check file size
            if($_FILES["file"]["size"] > 1000000) {
                throw new Exception("Sorry, your file is too large.");
            }

            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType !="gif") {
                throw new Exception("Sorry, only JPG, JPEG, PNG & GIF files are allowed. The file type is ". $imageFileType .".");
            }

            // check if file already exists
            if(file_exists($target_file)) {

               // throw new Exception("Sorry, file already exists.");
                
                $temp = explode(".", $_FILES[$obj_name]["name"]);
                $newfilename = round(microtime(true)) . '.' . end($temp);
                //$target_file = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR .$newfilename;
                $target_file =  $target_dir .$newfilename;
                
            }

            move_uploaded_file($_FILES[$obj_name]["tmp_name"], $target_file);

            return $target_file;

        } catch(FDOException $e) {
            throw $e;
        }
    }
}
?>