(function () {

	if (typeof NodeList.prototype.forEach !== 'function') {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	$('.tabs__item').click(function() {
		var tab = $(this).data('tab');

		$('.tabs__item').removeClass('tabs__item--active');

		$(this).addClass('tabs__item--active');

		$('.tabs-content').removeClass('tabs-content--active');

		$('.tabs-content--tab-' + tab).addClass('tabs-content--active');
	});

	$('.modal__close, .modal__cancel').click(function() {
		$('.modal').removeClass('modal--active');
	});

	$('.open-modal-object-add').click(function() {
		$('.modal-object-add').addClass('modal--active');
	});

	$('.burger').click(function() {
		$('.aside').toggleClass('aside--active');
	});

	$('.counter__minus').click(function() {
		var val = $(this).parent().find('.counter__input').val();

		if(val > 0) {
			val--;
		}
		else if(val <= 0) {
			val = 0;
		}

		$(this).parent().find('.counter__input').val(val);
	});

	$('.counter__plus').click(function() {
		var val = $(this).parent().find('.counter__input').val();

		$(this).parent().find('.counter__input').val(++val);
	});

	$('.counter__input, .label--interval input').on('keydown', function(e) {
		if(!$.isNumeric(e.key) &&
			e.key != 'Delete' &&
			e.key != 'Backspace' &&
			e.key != 'ArrowLeft' &&
			e.key != 'ArrowRight'
		) {
			e.preventDefault();
			return;
		}
	});

	$('.label--interval input').eq(0).on('change', function(e) {

		var valthis = Number($(this).val());
		var val = Number($('.label--interval input').eq(1).val());

		if(valthis > val) {
			$('.label--interval input').eq(1).val(valthis);
		}

	});

	$('.label--interval input').eq(1).on('change', function(e) {

		var valthis = Number($(this).val());
		var val = Number($('.label--interval input').eq(0).val());

		if(valthis < val) {
			$('.label--interval input').eq(0).val(valthis);
		}

	});

})();