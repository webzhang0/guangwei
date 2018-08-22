var layerIndex;
getPlaysDetail();
// window.onload = function () {
//     layer.close(layerIndex);
// }
function getPlaysDetail() {
	// layerIndex = layer.open({type: 2, shadeClose: false});
	$.ajax({
		url: BASEURL + 'detail/' + getParams('id'),
        type: 'GET',
        dataType: 'json',
        // data: {param1: 'value1'},
        success: function (data) {
            if (data.code != 200) {
                layerAlert(data.msg);
            }else {
                // renderPlaysList(data.data);
                renderStagePhoto(data.data);
            }
        },
        error: function (err) {
            layerAlert('系统繁忙，请稍后再试');
        }
	})
}
// 渲染剧照
function renderStagePhoto(list) {
	var stagePhotoHtml = '';
	for (var i = 0; i < list['marvellous'].length; i++) {
		stagePhotoHtml += '<a href="javascript:;" class="photo" style="background: url(' + list['marvellous'][i]['marvellousImage'] + ') no-repeat center center;background-size:cover;"></a>'
	}
	$('#stagePhotoWrap').html(stagePhotoHtml);

    // 剧照预览
    var prePhoHtml = '<div class="swiper-wrapper">';
    for(var j = 0; j < list['marvellous'].length; j++) {
        if (list['marvellous'][j]['marvellousLink'] != "") {
            // prePhoHtml += '<div href="'+ list['marvellous'][j]['marvellousLink'] +'" class="swiper-slide video"><img src="../../images/plays/play-icon.png" class="play-icon">'
            prePhoHtml += '<div class="swiper-slide video"><a href="'+ list['marvellous'][j]['marvellousLink'] +'"><img src="../../images/plays/play-icon.png" class="play-icon"></a>'
                +'<img src="'+ list['marvellous'][j]['marvellousImage'] +'" width="100%"></div>'
        }else {
            prePhoHtml += '<div class="swiper-slide">'
                +'<img src="'+ list['marvellous'][j]['marvellousImage'] +'" width="100%"></div>'
        }
    }
    prePhoHtml += '</div>';
    $('#stagePhotoPreview').html(prePhoHtml);

    $('#stagePhotoWrap').on('click', '.photo', function () {
        // window.location.href = 'photoPreview.html?id=' +  data['drama']['id'];
        var index = $(this).index();
        $('#preView').show();
        var stagePhotoWrap = new Swiper('#stagePhotoPreview', {
        	initialSlide: index
        });
    });
    $('#preView').click(function () {
        $(this).hide();
    });
		
}