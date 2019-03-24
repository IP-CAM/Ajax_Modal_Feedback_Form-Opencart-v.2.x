  <div id="footer">
  	Here goes your footer content (Тут контент футера)
  </div>
  <div class="b-popup" id="popup1" >
    <div class="b-popup-content">
  		<a href="javascript:PopUpHide()" class="pop-up-close">
        <span> X </span>
      </a>
      <div class="feedback">
        	<div class="ajax-loading" style="display:none;">
        		<img src="/catalog/view/theme/yourtheme/image/loading32x32.gif" alt="Loading...">
        	</div>
    			<form method="POST">
    				<div class="form-group">
    					<label>Имя*:</label>
    					<input type="text" class="form-control" name="ask_question[name]" value="" >
    				</div>
    				<div class="form-group">
    					<label>E-mail*:</label>
    					<input type="text" class="form-control" name="ask_question[email]" value="" >
    				</div>
    				<div class="form-group ">
    					<label for="feedback_47_2">Вопрос*:</label>
    					<textarea class="form-control" name="ask_question[question_text]"></textarea>						
    				</div>
            <!-- Uncomment section below and add you own data if you want to add google recaptca-->
<!--             <script src="https://www.google.com/recaptcha/api.js" async defer></script>
<div class="g-recaptcha" data-sitekey="6LcgYZQUAAAAABCmFoHL5rz83GphVbLxKi6krR7r" style="margin-bottom: 20px;  "></div> -->
    				<div class="form-group">	  
              <input id="send-question" type="submit" class="btn" value="Отправить">
    				</div>
    				* - обязательны для заполнения
    				<br><small>Нажимая кнопку отправить вы даете согласие на обработку ваших персональных данных (закон №152-ФЗ)</small>
    			</form>
    		</div>
  	</div>
  </div>
  </body>
</html>