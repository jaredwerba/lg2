<?php
    $name = $_POST['contact-name'];
	  $email = $_POST['contact-email'];
	  $message = $_POST['contact-message'];
	  $from = $_POST['contact-email'];
    $to = 'you@domain.com'; // insert your Mail here
    $subject = 'Hello';
    $human = $_POST['human'];
    $resp = null;
    $body = "From: $name\n E-Mail: $email\n Message:\n $message";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $headers = "From: $email" . "\r\n" .
	  "Reply-To: $email" . "\r\n" .
	  "X-Mailer: PHP/" . phpversion();

   if ($human == '4') { // edit the number 4 if you want anoter anti spam question          
        if (mail ($to, $subject, $body, $from)) { 
            $resp = array(
                "status" => "OK",
                "msg" => "Thanks! We will reply shortly. Is it something really urgent? Just give us a call at 0800 800 800"
            );
        } else {
            $resp = array(
                "status" => "ERROR",
                "msg" => "Something went wrong, go back and try again"
            );
        }
    } else if ($human != '4') {
        $resp = array(
            "status" => "ERROR",
            "msg" => "Wrong antispam answer!"
        );
    }

    header('Content-Type: application/json');
    print json_encode($resp);
?>
