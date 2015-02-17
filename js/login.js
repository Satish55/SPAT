$(document).ready(function(){
	var stFormInputs = $('input[type="text"],input[type="email"],input[type="password"]');
	stFormInputs.focus(function() {
       $(this).parent().children('.formLabel').addClass('formTop');
       $('#st-formwrap').addClass('darken-bg');
	});
	stFormInputs.focusout(function() {
		if ($.trim($(this).val()).length == 0){
		$(this).parent().children('.formLabel').removeClass('formTop');
		}
		$('div#st-formwrap').removeClass('darken-bg');
	});
	$('.formLabel').click(function(){
		 $(this).parent().children('.form-control').focus();
	});
});