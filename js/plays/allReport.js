getAllReport("1");

/*查询媒体报道*/
function getAllReport(pageNum) {
	$.ajax({
		url: BASEURL + 'detail/article/'+getParams('id'),
		// type: 'POST',
		// data: {
		// 	// "id": "27",
		// 	"pageSize": "10",
		// 	"pageNum": pageNum,
		// },
		success: function (data) {
			if (data.code != 200) {
                layerAlert(data.msg);
            }else {
            	renderAllReport(data.data);
            }
		},
		error: function () {
			layerAlert('系统繁忙，请稍后再试');
		}
	})
}
// 渲染
function renderAllReport(data) {
	var reportsHtml = '';
    for(var n = 0; n < data.length; n++) {
        reportsHtml += '<li class="report-item">'
            +'<a href="../../views/news/newsDetails.html?id='+ data[n]['id'] +'&articleTypeName=媒体报道" class="clearfix report-a">'
            +'<img src="'+ data[n]['articleBanner'] + '" class="report-img fl-l">'
            +'<div class=" report-item-inf">'
            +'<h3 class="report-item-title">' + data[n]['articleTitle'] + '</h3>'

            if(data[n]['articleIntroduce'].length > 25) {
                reportsHtml +='<p class="report-item-con">' + data[n]['articleIntroduce'].substr(0, 25) +'...<span class="see-all">查看全部></span></p>'
            }else {
                reportsHtml +='<p class="report-item-con">' + data[n]['articleIntroduce'] +'</p>'
            }

        reportsHtml +='<p class="report-src-wrap"><span class="report-src">'+ data[n]['author'] +'</span><span class="report-date">'+ formatterDate(data[n]['createDateTime']) +'</span></p>'
            +'</div></a></li>'
    }
    $('#reports').html(reportsHtml);
    // $('#reports').on('click', '.see-all', function() {
    //     var index = $(this).closest('li').index();
    //     $(this).parent('.report-item-con').html(data[index]['articleIntroduce']);
    // });
}