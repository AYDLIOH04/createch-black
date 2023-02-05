<?php
$tg_bot_token = "6161204777:AAGQMlkmMAS8gECJAbXDNXBlIGOfJtZ2Uno";
$chat_id = "-888721777";

$text = "ПОЛУЧЕН ЗАПРОС" . "\n";
$text .= "=======================" . "\n" . "\n";


foreach ($_POST as $key => $val) {
    $text .= $key . ": " . $val . "\n" . "\n";
}
$text .= "=======================" . "\n";
$text .= "IP - " . $_SERVER['REMOTE_ADDR'] . "\n";
$text .= "Дата отправки - " . date('d.m.y H:i:s') . "(МСК)" . "\n";
$text .= "=======================";


$param = [
    "chat_id" => $chat_id,
    "text" => $text
];

$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

var_dump($text);

file_get_contents($url);

foreach ( $_FILES as $file ) {

    $url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendDocument";

    move_uploaded_file($file['tmp_name'], $file['name']);

    $document = new \CURLFile($file['name']);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $out = curl_exec($ch);

    curl_close($ch);

    unlink($file['name']);
}

die('1');