<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true);

    $mail->setFrom('pavel_biryuchev@mail.ru', 'Имя');
    $mail->addAddress('pavel_biryuchev@inbox.ru');
    $mail->Subject = "CreaTech запрос";

    $body = '<h1>CreaTech запрос</h1>';
    $body.= '<p><strong>Организация:</strong> '.$_POST['comp'].'</p>';
    $body.= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    $body.= '<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    $body.= '<p><strong>Тел.:</strong> '.$_POST['number'].'</p>';
    $body.= '<p><strong>Необходимые технические характеристики:</strong> '.$_POST['techharact'].'</p>';
    $body.= '<p><strong>Наименование запрашиваемого оборудования:</strong> '.$_POST['id'].'</p>';
    if(trim(!empty($_POST['articl']))){
        $body.= '<p><strong>Необходимые технические характеристики:</strong> '.$_POST['articl'].'</p>';
    }
    $body.= '<p><strong>Количество, шт.:</strong> '.$_POST['count'].'</p>';
    if(trim(!empty($_POST['coments']))){
        $body.= '<p><strong>Коментарии:</strong> '.$_POST['coments']. '</p>';
    }

    $mail->Body = $body;
    $mail->send();
    $message = "Запрос отправлен!";

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>
