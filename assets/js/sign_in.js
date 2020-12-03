$(document).ready(function() {
	// body...

	var drop = $(".drop");
	var city = $(".city");
	var chosen_city = $(".drop > li");
	var index = -1;

	city.click(function(){

		drop.toggleClass('active');
		if(drop.hasClass('active')){

			city.children('input').attr("placeholder", "Введите название");
		}
		return false;

	})


	chosen_city.click(function(){

		var text = $(this).text();
		$(this).index(index);
		city.children('input').val(text);

	})

	//------------------------------------------------

	var submit = $(".submit");
	var pass = $(".pass");
	var mail = $(".mail");
	var new_pass = $(".new_pass");
	var city_state = $(".city_state");
	var last_name = $(".last_name");
	var name = $(".name");
	var flex = $(".flex_row");
	var check = $(".checkbox");
	var cont = $(".container");

	function ShowError(obj, border)
	{
		obj.next().css({
			display:"block",
		});
		if(border) {
			obj.css({
				border:"1px solid red",
			});
		}
	}

	submit.click(function(){

		var value_mail = mail.val();
		var value2 = pass.val();
		var value_new = new_pass.val();
		var val_city = city_state.val();
		var val_name = name.val();
		var val_last = last_name.val();

		if(value_mail == 0){
			ShowError(mail, true);
		}

		if (value2 == 0) {
			ShowError(pass, true);	
		}else{
			pass.css({
				border:"1px solid #00a877",
			});
			pass.next().css({
				display:"none",
			});
		}

		if (value_new == 0) {
			new_pass.next().css({
				display:"block",
			});
		}

		if(val_city == 0){
			city_state.next().css({
				display:"block",
			});
			city_state.css({
				border:"1px solid red",
			});
		}

		if(val_name == 0 || val_last == 0){
			last_name.next().css({
				display:"block",
			});
			name.css({
				border:"1px solid red",
			});
			last_name.css({
				border:"1px solid red",
			});
		}
	

		if(check.attr("checked") != 'checked'){
			cont.find(".help").css({
				display:"block",
			});
			cont.find(".checkmark").css({
				border:"1px solid red",
			})

		}

	})

	$(".conf_new_pass").keyup(function() {
	
		var value_input1 = new_pass.val(); // Получаем содержимое 1-го поля
		var value_input2 = $(this).val(); // Получаем содержимое 2-го поля
		
		if(value_input1 != value_input2) {
		
			$(".conf_new_pass").next().css({
				display:"block"
			});
			$(".pass_conf").css({
				border:"1px solid red",
			})
						
		}
		else{
			$(".conf_new_pass").next().css({
				display:"none"
			});
			$(".pass_conf").css({
				border:"1px solid #cfd0e6",
			})
		}
		
	});



})