<?php 
/**
* sends mail to admin from popup window (ask question button on header)
*/
class ControllerModuleAskQuestion extends Controller{
	public function index(){
		$errors = array();

		//validation
		if(empty($this->request->post['name']) || empty($this->request->post['email']) || empty($this->request->post['questionText']))$errors[] = 'Заполните все поля';
		if(!preg_match("/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i", $this->request->post['email']))$errors[] = 'Введите валидный email';

		/*uncomment and add your data if you want to add google recaptcha*/
/*		$cpatcha 	= $this->request->post['gRecaptchaResponse'];
    	$secret_key = '6LcgYZQUAAAAAMIMgRdBCHMvtNIi2Cl9OfK1GLSD';
    	$response = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret_key . '&response=' . $cpatcha . '&remoteip=' . $_SERVER['REMOTE_ADDR']);
    	$response = json_decode($response, true);
    	if(empty($response['success']))$errors[] = 'Верификация reCaptcha не пройдена';*/

		if(count($errors) == 0){
			$data['client_name'] 		= $this->request->post['name'];
			$data['client_email'] 		= $this->request->post['email'];
			$data['question_text'] 		= $this->request->post['questionText'];
			$data['site_name']			= $this->config->get('config_name');
			$result 					= array();

			$mailer 					= new Mail;
			$template 					= new Template();
			$subject    				= 'Вопрос из сайта ' . $this->config->get('config_name');

			$template->data 			= $data;

			if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/mail/ask_question.tpl')) {
				$html = $template->fetch($this->config->get('config_template') . '/template/mail/ask_question.tpl');
			} else {
				trigger_error('Missing template file for askquestion mail');
			}

			$mailer->protocol 			= $this->config->get('config_mail_protocol');
			$mailer->parameter 			= $this->config->get('config_mail_parameter');
			$mailer->hostname 			= $this->config->get('config_smtp_host');
			$mailer->username 			= $this->config->get('config_smtp_username');
			$mailer->password 			= $this->config->get('config_smtp_password');
			$mailer->port 				= $this->config->get('config_smtp_port');
			$mailer->timeout 			= $this->config->get('config_smtp_timeout');

			$mailer->setTo($this->config->get('config_email'));
			$mailer->setFrom($this->config->get('config_email'));
			$mailer->setSender($this->config->get('config_name'));
			$mailer->setSubject(html_entity_decode($subject, ENT_QUOTES, 'UTF-8'));
			$mailer->setHtml($html);
			$mailer->setText(html_entity_decode($html, ENT_QUOTES, 'UTF-8'));
			$mailer->send();
			
			// Send to additional alert emails
			$emails = explode(',', $this->config->get('config_alert_emails'));
			
			foreach ($emails as $email) {
				if ($email && preg_match('/^[^\@]+@.*\.[a-z]{2,6}$/i', $email)) {
					$mail->setTo($email);
					$mail->send();
				}
			}
			$result['success'] = 'Ваше письмо отправлено, мы вам скоро ответим';
		}else{
			$result['error'] = $errors;
		}

		$this->response->setOutput(json_encode($result));
	}

}
?>
