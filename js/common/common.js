var BASEURL = 'http://www.guangweixiju.com/drama/mobile/';

$(document).ready(function () {
	$('#goBack').click(function () {
		window.history.back();
	});
});

/*layer弹窗-alert*/
function layerAlert(msg) {
	layer.open({	
		content: msg,
	  	btn: '我知道了',
	  	shadeClose: false
	});
}
/*格式化日期YYYY-MM-DD
*millisecond毫秒数
*/
function formatterDate(millisecond) {
	var oDate = new Date(millisecond);
	var oYear = oDate.getFullYear();
	var oMonth = oDate.getMonth()+1<10 ? ('0'+(oDate.getMonth()+1)) : (oDate.getMonth()+1);
	var oD  = oDate.getDate()<10 ? '0'+oDate.getDate() : oDate.getDate();

	return oYear + '年' + oMonth + '月' + oD + '日';
}
/*URL获取参数*/
function getParams(name) {
	var search = decodeURI(window.location.search).substr(1);
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var param = search.match(reg);
	if (param != null) {
		return param[2];
	}else {
		return null;
	}
}