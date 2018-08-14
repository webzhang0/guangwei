$(document).ready(function () {
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
                renderFirstScreen(data.data);
            }
        },
        error: function (err) {
            layerAlert('系统繁忙，请稍后再试');
        }
    })
    
}
/*渲染首屏*/
function renderFirstScreen(data) {
    var drama = data['drama'];
    var bannerHtml = '';

    bannerHtml += '<div class="plays-title-wrap">'
        +'<h3 class="plays-title">'+ drama['dramaName'] +'</h3>'
        +'<div class="plays-price">￥'+ drama['minPrice'] + '-' + drama['maxPrice'] +'</div></div>'
        +'<img src="'+ drama['dramaCoverImage'] +'" class="plays-poster">';

    $('#bannerWrap').html(bannerHtml);
    $('#bannerWrap').css({
        'background': 'url('+ drama['dramaBanner'] +') no-repeat center center',
        // 'background': 'url(../../images/aboutus/stagephoto.gif) no-repeat',
        'background-size': 'cover'
    });

    // 演出信息
    var view = document.getElementById('synopsisContent');
    var str = drama['dramaDetail'];
    var oHeight = view.offsetHeight;
    for (var i = 0; i < str.length; i++) {
        view.innerHTML = str.substr(0, i);
        if (oHeight < view.scrollHeight) {
            view.innerHTML = str.substr(0, i-10)+'...<span class="expand-detail" id="expandDetail">展开</span>';
            // view.classList.add("ellipsis");
            break;
        }
    }
    $('#synopsisContent').on('click', '#expandDetail', function() {
        $('#synopsisContent').html(str);
        $('#synopsisContent').css({
            'height': 'auto'
        });
    });

    // 精彩剧照
    var stagePhoHtml = '<div class="swiper-wrapper">';
    for(var j = 0; j < data['marvellous'].length; j++) {
        if (data['marvellous'][j]['marvellousLink'] != "") {
            stagePhoHtml += '<div class="swiper-slide stage-photo-wrap video"><a href="'+ data['marvellous'][j]['marvellousLink'] +'"><img src="../../images/plays/play-icon.png" class="play-icon"></a>'
        }else {
            stagePhoHtml += '<div class="swiper-slide stage-photo-wrap">'
        }
        stagePhoHtml +='<img src="'+ data['marvellous'][j]['marvellousImage'] +'" width="100%" height="100%">'
                    +'</div>'
    }
    stagePhoHtml += '</div>';
    $('#stagePhotoSwiper').html(stagePhoHtml);
    var newsSwiper = new Swiper('#stagePhotoSwiper',{
        slidesPerView :'auto',
        freeMode: true,
    });

    // 主创介绍
    var creatorsHtml = '<div class="swiper-wrapper creators-wrap">';
    for (var k = 0; k < data['performers'].length; k++) {
        // data['performers'][k]
        creatorsHtml += '<a href="javascript:;" class="swiper-slide creator-wrap"><div class="clearfix personal"><img class="profile-wrap fl-l" src="'+ data['performers'][k]['performerPhoto'] +'"><div class="name-position fl-l">'
            +'<span class="creator-name">'+ data['performers'][k]['performer'] +'</span><br/>'
            +'<span class="creator-position">'+ data['performers'][k]['performerLabel'] +'</span></div></div>'
            +'<p class="intro">'+ data['performers'][k]['performerIntroduce'] +'</p></a>'
    }
    creatorsHtml += '</div>';
    $('#creatorsSwiper').html(creatorsHtml);
    var newsSwiper = new Swiper('#creatorsSwiper',{
        slidesPerView :'auto',
        freeMode: true,
    });

    // 观众剧评
    var comments = '';
    for(var l = 0; l < data['comments'].length; l++) {
        comments += '<li class="clearfix comment-item">'
            +'<img class="author-profile fl-l"></div>'
            +'<div class="author-inf fl-l">'
            +'<p class="author-name">'+ data['comments'][l]['commentUser'] +'</p>'
            +'<p class="comment-content">'+ data['comments'][l]['commentDetail'] +'</p>'
            +'<p class="comment-date">' + formatterDate(data['comments'][l]['commentDateTime']) + '</p>'
            +'</div></li>'
    }
    $('#comments').html(comments);

    // 媒体报道
    var reportsHtml = '';
    for(var n = 0; n < data['articles'].length; n++) {
        reportsHtml += '<li class="report-item">'
            +'<a href="javascript:;" class="clearfix report-a">'
            +'<img src="'+ data['articles'][n]['articleBanner'] + '" class="report-img fl-l">'
            +'<div class="fl-r report-item-inf">'
            +'<h3 class="report-item-title">' + data['articles'][n]['articleTitle'] + '</h3>'
            +'<p class="report-item-con">'+ data['articles'][n]['articleIntroduce'] +'</p>'
            +'<p class="report-src-wrap"><span class="report-src">光纬戏剧</span><span class="report-date">'+ formatterDate(data['comments'][n]['createDateTime']) +'</span></p>'
            +'</div></a></li>'
    }
    $('#reports').html(reportsHtml);



}
