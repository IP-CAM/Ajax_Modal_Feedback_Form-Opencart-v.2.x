$(document).ready(function(){
	
	/**
	* adds popup form notifications
	* popup (string) Popup element (wrapper) selector
	* className (string) - notification class( success, warning, attention, information)
	* text (string) notification text
	*/
	function popUpNotify(popup, className, text){
		clearPopupNotifications(popup);
		$(popup).find('form').before('<div class="' + className + '" style="margin-top:20px;">' + text + '</div>');
	}
	
	/**
	* Clears all kind of popup notifications
	*/
	function clearPopupNotifications(popupSelector){
		$(popupSelector + ' .success, ' + popupSelector + ' .warning, ' + popupSelector + ' .attention, ' + popupSelector + ' .information, ' + popupSelector + ' .error, ' + popupSelector + ' .input-warning').remove();
		$(popupSelector + ' input:not([type=submit]), ' + popupSelector + ' textarea').removeClass('red-border');
	}

	/**
	* validating email input field. checks string to be a valid email and adds notification above input field if there is an error
	* input (string) - input field selector 
	* errorText (string) error notification text
	*/
	function validateEmail(input, errorText = 'Ошибка email'){
		$('.input-warning[text="' + errorText + '"]').remove();

		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if( re.test($(input).val()) ){
			$(input).removeClass('red-border').prev('div.input-warning').remove();
			return null;
		}else{
			$(input).prev('div.input-warning', 'br').remove();
			$(input).addClass('red-border').before('<div class="input-warning" style="color:red;">'  + errorText + '</div>');
			return true;
		}
	}

	/**
	* validating infut field to be not empty. checks if input field is filled adds notification above input field if there is an error 
	* input (string) - input field selector
	* errorText (string) error notification text
	*/
	function validateNotEmpty(input, errorText = 'Ошибка'){
		$('.input-warning[text="' + errorText + '"]').remove();

		if(!$(input).val()){
			$(input).prev('div.input-warning').remove();
			$(input).addClass('red-border').before('<div class="input-warning" style="color:red;">'  + errorText + '</div>');
			return true;
		}else{
			$(input).removeClass('red-border').prev('div.input-warning').remove();
			return null;
		}
	}

	/**
	* validating name. checks if input field is filled with non numeric characters and is more than 2 characters.adds notification above input field if there is an error
	* input (string) - input field selector
	* errorText (string) error notification text
	*/
	function validateName(input, errorText = 'Ошибка ввода имени'){
		$('.input-warning[text="' + errorText + '"]').remove();

		if($(input).val().length < 2 || !isNaN($(input).val())){
			$(input).prev('div.input-warning').remove();
			$(input).addClass('red-border').before('<div class="input-warning" style="color:red;">'  + errorText + '</div>');
			return true;
		}else{
			$(input).removeClass('red-border').prev('div.input-warning').remove();
			return null;
		}
	}

	/**
	* sending mail from modal window in header (button ask question)
	* data (object) html form data
	* popupWindow (object) modal window
	*/
	function sendMailFromModal(data, popupWindow){
		clearPopupNotifications(popupWindow);
		var error = [];
	   
		error.push(validateName('input[name="ask_question[name]"]', 'Имя введено неправильно'));
		error.push(validateNotEmpty('input[name="ask_question[email]"]', 'Заполните поле'));
		error.push(validateNotEmpty('textarea[name="ask_question[question_text]"]', 'Запоните поле'));
		error.push(validateEmail('input[name="ask_question[email]"]', 'Введите валидный email'));

		if(error.indexOf(true) !== -1 )return false;
		$.ajax({
			url: '/index.php?route=module/ask_question',
			type: 'POST',
			data: data,
	    	dataType: 'json',
	    	cache: false,
	    	beforeSend: function() {
				clearPopupNotifications(popupWindow);
	        	$('.ajax-loading').show();
	    	},
			success: function(json) {
				clearPopupNotifications(popupWindow);
	        	$('.ajax-loading').hide();
				popUpNotify(popupWindow, 'attention', 'Данная функция находится на разработке и будет готово скоро');
				if(json.success){
					popUpNotify(popupWindow, 'success', json.success);
					$(popupWindow + ' input:not([type=submit]), ' + popupWindow + ' textarea').val('');
					grecaptcha.reset();
				};
				if(json.error)popUpNotify(popupWindow, 'warning', json.error[0]);	
			},
			error: function(error){
	        	$('.ajax-loading').hide();
			},
			complete: function(){
	        	$('.ajax-loading').hide();
			}
		});

	}
	
	//remove all popup window errors
	$('.pop-up-close').on('click', function(){
		clearPopupNotifications('#popup1');
	});


	// sending email
	$('#send-question').on('click', function(e){
		e.preventDefault();
		var formData = {
			name: 					$('input[name="ask_question[name]"]').val(),
			email: 					$('input[name="ask_question[email]"]').val(),
			questionText: 			$('textarea[name="ask_question[question_text]"]').val(),
			// gRecaptchaResponse: 	grecaptcha.getResponse() // uncomment this if you want to add google recaptca
 		};
		sendMailFromModal(formData, '#popup1');
	});




});