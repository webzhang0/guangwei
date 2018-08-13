var newsSwiper = new Swiper('#stagePhotoSwiper',{
    slidesPerView :'auto',
    // spaceBetween : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)* (100 / 750)*0.18,
    freeMode: true,
});
var newsSwiper = new Swiper('#creatorsSwiper',{
    slidesPerView :'auto',
    // spaceBetween : (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)* (100 / 750)*0.18,
    freeMode: true,
});
// 获取当前详情页数据
getDetail();

/*获取当前页详情*/
function getDetail() {
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
            }
        },
        error: function (err) {
            layerAlert('系统繁忙，请稍后再试');
        }
    })
    
}