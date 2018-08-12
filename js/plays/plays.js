
getPlaysList();

/*获取剧目列表*/
function getPlaysList() {
	$.ajax({
		url: BASEURL + 'list',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			// console.log(data);
			if (data.code != 200) {
				layerAlert(data.msg);
			}else {
				renderPlaysList(data.data);
			}
		},
		error: function (err) {
			layerAlert('系统繁忙，请稍后再试');
		}
	})
}
/*渲染列表*/
function renderPlaysList(list) {
	var oList = '';
	if (list.length == 0) {
		layerAlert('暂时没有剧目，敬请期待');
		return false;
	}
	for (var i = 0; i < list.length; i++) {
		oList += '<li><a class="plays-item clearfix" href="playsDetails.html?id='+ list[i]['id'] +'">'
			+'<img src="' + list[i]['dramaCoverImage'] + '" class="stage-photo fl-l">'
			+'<div class="plays-inf fl-r">'
			+'<h3 class="plays-title">' + list[i]['dramaName'] + '</h3>';

			if (list[i]['theShelves'] == 1 && amongShow(list[i]['showStartDateTime'], list[i]['showEndDateTime'])) {
				oList +='<p class="ticket-status-wrap"><span class="ticket-status">售票中</span><span class="price">￥' + list[i]['minPrice']+'-'+ list[i]['maxPrice'] + '</span></p>'
			}

		oList +='<p class="show-date-wrap"><span>演出时间：</span><span>'+ formatterDate(list[i]['showStartDateTime']) +'-'+ formatterDate(list[i]['showEndDateTime']) + '</span></p>'
			+'<p class="show-place-wrap"><span>演出地点：</span><span>'+ list[i]['theatreName'].replace(/<br\/>([^$])/g,'、') +'</span></p>'
			+'<p class="synopsis">'+ list[i]['dramaKeyWord'] +'</p>'
			+'</div>'
			+'</a></li>'
	}

	$('#playsLists').html(oList);
}
/*当前时间是否在开始结束时间之间*/
function amongShow(showStartDateTime, showEndDateTime) {
	var newTime = new Date().getTime();
	return (showStartDateTime <= newTime ) && (showEndDateTime >= newTime);
}