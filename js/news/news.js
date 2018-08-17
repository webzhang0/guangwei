$(document).ready(function () {
	// $('.header').on('click', '.nav-item', function () {
	// 	var index = $(this).index();
	// 	$(this).addClass('active').siblings('.nav-item').removeClass('active');
	// 	$('.nav-content-wrap .nav-content').eq(index).addClass('active').siblings('.nav-content').removeClass('active');
	// });

});
var pageNum = 1, pageSize = 10, count;

/*行业新闻*/
getNewsList(12);

/*查询列表*/
function getNewsList(id) {
	$.ajax({
        url: BASEURL + 'article/list?id=' + id,
        type: 'GET',
        dataType: 'json',
        // data: {param1: 'value1'},
        success: function (data) {
            if (data.code != 200) {
                layerAlert(data.msg);
            }else {
            	renderList(data.data['articles']);
            }
        },
        error: function (err) {
            layerAlert('系统繁忙，请稍后再试');
        }
    })
}
/*渲染列表*/
function renderList(list) {
	var oList = "";
	// for (var i = 0; i < Things.length; i++) {
	// 	Things[i]
	// }
	// <li class="lists-item">
	// 					<a href="newsDetails.html" class="clearfix">
	// 						<div class="lists-pic-wrap fl-r">
	// 							<img src="../../images/news/news-pic.gif">
	// 						</div>
	// 						<div class="lists-item-content">
	// 							<h3 class="lists-item-title">《雅各比和雷弹头》：荒诞背后蕴含生命哲思</h3>
	// 							<p class="list-inf">
	// 								<span class="news-src">人民网</span>
	// 								<span class="news-date">2018年3月5日</span>
	// 							</p>
	// 						</div>
	// 					</a>
	// 				</li>
}
