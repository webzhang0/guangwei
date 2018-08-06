$(document).ready(function () {
	$('.header').on('click', '.nav-item', function () {
		var index = $(this).index();
		$(this).addClass('active').siblings('.nav-item').removeClass('active');
		$('.nav-content-wrap .nav-content').eq(index).addClass('active').siblings('.nav-content').removeClass('active');
	});
});