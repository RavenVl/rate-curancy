<?php
//$rez = $_POST['data'] . '   '.$_POST['cur'];
//echo $rez;
$data = $_POST['data'];
if (!isset($data)){
   $rezArray = array();
    $xml = file_get_contents('http://www.cbr.ru/scripts/XML_daily.asp' . "?date_req=$data");
    $sxml = simplexml_load_string($xml);
    foreach ($sxml as $item) {
     $rezArray[] = $item->CharCode;
    }
    echo json_encode($rezArray);
}
else{
    $xml = file_get_contents('http://www.cbr.ru/scripts/XML_daily.asp' . "?date_req=$data");
    $sxml = simplexml_load_string($xml);
    foreach ($sxml as $item) {
        if ($item->CharCode== $_POST['cur']){
            echo $item->Value;
            exit();

        }
    }
}
