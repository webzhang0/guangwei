if(getParams('articleTypeName') !== '热门评论'){
	getArticleDetails();
}else{
    getCommentDetails();
}


// 获取文章详情
function getArticleDetails() {
	document.title = getParams('articleTypeName');
	$.ajax({
		url: BASEURL + 'article/detail/' + getParams('id'),
		type: 'GET',
		success: function (data) {
			if (data.code != 200) {
                layerAlert(data.msg);
            }else {
            	renderArticleDetails(data.data);
            }
		},
		error: function (error) {
			layerAlert('系统繁忙，请稍后再试');
		}
	})
}
// 获取热门评论详情
function getCommentDetails() {
	document.title = getParams('articleTypeName');
	$.ajax({
		url: BASEURL + 'comment/detail/' + getParams('id'),
		type: 'GET',
		success: function (data) {
			if (data.code != 200) {
                layerAlert(data.msg);
            }else {
            	renderCommentDetails(data.data);
            }
		},
		error: function (error) {
			layerAlert('系统繁忙，请稍后再试');
		}
	})
}

function renderArticleDetails(data) {
	var oHtml = "";
	oHtml += '<h3 class="news-title">' + data['articleTitle'] +'</h3>'
		+'<p class="news-tag">'
		+'<span class="news-type">'+ getParams('articleTypeName') +'</span>'
	    +'<span class="news-date">'+ formatterDate(data['createDateTime']) +'</span></p>'
		+'<div class="paragraph">' + data['articleDetails'] + '</div>'

	$('#content').html(oHtml);
}
function renderCommentDetails(data) {
	var oHtml = "";
	oHtml += '<h3 class="news-title">' + data['dramaName'] +'</h3>'
		+'<p class="news-tag">'
		+'<span class="news-type">'+ data['user'] +'</span>'
	    +'<span class="news-date">'+ formatterDate(data['createDateTime']) +'</span></p>'
		+'<div class="paragraph">' + data['detail'] + '</div>'

	$('#content').html(oHtml);
}