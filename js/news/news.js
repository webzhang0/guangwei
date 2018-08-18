
var pageNum = 1, pageSize = 10, count, isSending = false, endData = false;

$(document).ready(function () {
	$('.header').on('click', '.nav-item', function () {
		var index = $(this).index();
		var id = $(this).attr('data-id');
		$(this).addClass('active').siblings('.nav-item').removeClass('active');
		// 初始化
		$('#listWrap').html('');
		endData = false;
		pageNum = 1;

		getNewsList(id);
	});

	// 下拉刷新
	$('#content').scroll(function () {
		var $this =$(this),
        viewH =$(this).outerHeight(),//可见高度
        contentH =$(this).get(0).scrollHeight,//内容高度
        scrollTop =$(this).scrollTop();//滚动高度
        if(contentH - viewH - scrollTop <= 0) { //到达底部1px时,加载新内容
        // if(scrollTop/(contentH -viewH)>=0.95){ //到达底部100px时,加载新内容
        	// console.log($('.nav-item.active').attr('data-id'));
        	getNewsList($('.nav-item.active').attr('data-id'));
        }
	})

});
/*行业新闻*/
getNewsList(11);

/*查询列表*/
function getNewsList(id) {
	if (isSending || endData) {
		return;
	}
	isSending = true;
	$.ajax({
        url: BASEURL + 'article/list',
        type: 'POST',
        dataType: 'json',
        data: {
        	"id": id,
        	"pageNum": pageNum,
        	"pageSize": pageSize,
        },
        success: function (data) {
            if (data.code != 200) {
                layerAlert(data.msg);
            }else {
            	count = data.data['count'];
            	renderList(data.data['articles']);
            	pageNum++;
            }
        },
        error: function (err) {
            layerAlert('系统繁忙，请稍后再试');
        },
        complete: function () {
        	isSending = false;
        }
    })
}
/*渲染列表*/
function renderList(list) {
	var oList = "";
	for (var i = 0; i < list.length; i++) {
		oList += '<li class="lists-item">'
			+'<a href="newsDetails.html?id='+ list[i]['id'] +'&articleTypeName='+ list[i]['articleTypeName'] +'" class="clearfix">'
			+'<div class="lists-pic-wrap fl-r">'
			+'<img src="'+ list[i]['articleBanner'] +'"></div>'
			+'<div class="lists-item-content">'
			+'<h3 class="lists-item-title">'+ list[i]['articleTitle'] +'</h3>'
			+'<p class="list-inf"><span class="news-src">'+ (list[i]['author'] || "") +'</span><span class="news-date">'+ formatterDate(list[i]['createDateTime']) +'</span>'
			+'</p></div></a></li>'
	}

	$('#listWrap').append(oList);
	if (pageNum*pageSize >= count) {
		endData = true;
		$('#noMore').text('没有更多了');
	}else {
		$('#noMore').text(' ');
	}
							
}
