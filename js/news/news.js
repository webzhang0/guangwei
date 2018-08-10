$(document).ready(function () {
	$('.header').on('click', '.nav-item', function () {
		var index = $(this).index();
		$(this).addClass('active').siblings('.nav-item').removeClass('active');
		$('.nav-content-wrap .nav-content').eq(index).addClass('active').siblings('.nav-content').removeClass('active');
	});

	// 返回的json格式数据
	// {
	//    "code": 200,
	//    "msg": "成功",
	//    "data": {
	//       "idType": 0,
	//       "sex": "男",
	//       "idTypeEnum": "身份证",
	//       "idNum": ""
	//    }
	// }
});