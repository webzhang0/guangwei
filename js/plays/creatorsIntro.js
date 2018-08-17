
getCreatorsIntro();

/*获取主创信息*/
function getCreatorsIntro() {
	$.ajax({
		url: BASEURL + 'introduce/' + getParams('id'),
		type: 'GET',
		success: function (data) {
			if (data.code != 200) {
                layerAlert(data.msg);
            }else {
                render(data.data);
            }
		},
		error: function (error) {
			layerAlert('系统繁忙，请稍后再试');
		}
	})
}
/*渲染*/
function render(data) {
	// 主创
	var creators = "<div>";
	for (var i = 0; i < data['performers'].length; i++) {
		creators += '<div class="clearfix personal">'
			+'<img class="profile-wrap fl-l" src="' + data['performers'][i]['performerPhoto'] + '">'
			+'<div class="name-position fl-l">'
			+'<span class="creator-name">'+ data['performers'][i]['performer'] +'</span><br/>'
			+'<span class="creator-position">'+ data['performers'][i]['performerLabel'] +'</span></div></div>'
			+'<p class="intro">'+ data['performers'][i]['performerIntroduce'] +'</p>'
	}
	creators += "<div>";
	$('#creatorsWrap').html(creators);

	// 更多介绍
	$('#moreIntro').html(data['introduce']['briefIntroduction']);

	// 主创团队
	var teamArr = data['introduce']['team'].replace(/(<br\/>)|(<br>)/g, '&').replace(/(：)|(: )|(： )/g, ':').split('&');
	var teamList = '';
	for(var j = 0; j < teamArr.length; j++) {
		teamList += '<li class="clearfix">'
			+'<p class="position fl-l">'+ $.trim(teamArr[j]).split(':')[0] +'</p>'
			+'<p class="member fl-l">'+ $.trim(teamArr[j]).split(':')[1] +'</p></li>'
	}
	$('#teamWrap').html(teamList);

	// 其他内容
	$('#otherCon').html(data['introduce']['otherContent']);
}
