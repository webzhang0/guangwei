getAllReport("1");

/*查询媒体报道*/
function getAllReport(pageNum) {
	$.ajax({
		url: BASEURL + 'detail/article/'+getParams('id'),
		type: 'POST',
		data: {
			// "id": "27",
			"pageSize": "10",
			"pageNum": pageNum,
		},
		success: function () {
			if (data.code != 200) {
                layerAlert(data.msg);
            }else {

            }
		},
		error: function () {
			layerAlert('系统繁忙，请稍后再试');
		}
	})
}