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
?>