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
    var showTimeDetail = drama['showTimeDetail'].replace(/(<br\/>)|(<br>)|(\n)|(\r)/g, '<br/>').split('<br/>');
    var performanceHtml = '';
    var showTimeItems = showTimeDetail.length > 5 ? 5 : showTimeDetail.length;
    for (var m = 0; m < showTimeItems; m++) {
        if ($.trim(showTimeDetail[m]) == "") {
            continue;
        }
        performanceHtml += '<li class="clearfix">'
        +'<img src="../../images/plays/location.gif" class="fl-l location-pic">'
        +'<div class="date-site fl-l">'
        +'<p class="performance-site">'+ showTimeDetail[m].split('：')[0] +'</p>'
        +'<p class="performance-date">'+ showTimeDetail[m].split('：')[1] +'</p></div>'
        +'<p class="ticket-price fl-r">￥'+ drama['minPrice'] + '-' + drama['maxPrice'] +'</p></li>'
    }
    $('#performanceLists').html(performanceHtml);

    if (showTimeDetail.length > 5) {
        $('#performanceExpand').show();

        $('#performanceExpand').click(function () {
            var performanceHtml = '';
            for (var m = 5; m < showTimeDetail.length; m++) {
                if (showTimeDetail[m] == "") {
                    continue;
                }
                performanceHtml += '<li class="clearfix">'
                +'<img src="../../images/plays/location.gif" class="fl-l location-pic">'
                +'<div class="date-site fl-l">'
                +'<p class="performance-site">'+ showTimeDetail[m].split('：')[0] +'</p>'
                +'<p class="performance-date">'+ showTimeDetail[m].split('：')[1] +'</p></div>'
                +'<p class="ticket-price fl-r">￥'+ drama['minPrice'] + '-' + drama['maxPrice'] +'</p></li>'
            }
            $('#performanceLists').append(performanceHtml);
            $('#performanceExpand').hide();
        })
    }
        

    // 剧情简介
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
        creatorsHtml += '<a href="creatorsIntro.html?id='+ data['drama']['id'] +'" class="swiper-slide creator-wrap"><div class="clearfix personal">'
            // +'<img class="profile-wrap fl-l" src="'+ data['performers'][k]['performerPhoto'] +'"><div class="name-position fl-l">'
            +'<div class="profile-wrap fl-l" style="background:url('+ data['performers'][k]['performerPhoto'] +') no-repeat center top;background-size:cover;"></div><div class="name-position fl-l">'
            +'<span class="creator-name">'+ data['performers'][k]['performer'] +'</span><br/>'
            +'<span class="creator-position">'+ data['performers'][k]['performerLabel'] +'</span></div></div>'
            +'<p class="intro">'+ data['performers'][k]['performerIntroduce'].substr(0, 30) +'...</p></a>'
    }
    creatorsHtml += '</div>';
    $('#creatorsSwiper').html(creatorsHtml);
    var newsSwiper = new Swiper('#creatorsSwiper',{
        slidesPerView :'auto',
        freeMode: true,
    });

    // 观众剧评
    $('#allComments').click(function () {
        window.location.href = '../../views/plays/allComments.html?id=' + data['drama']['id'];
    })
    var comments = '';
    for(var l = 0; l < data['comments'].length; l++) {
        comments += '<li class="clearfix comment-item">'
            +'<img class="author-profile fl-l" src="' + returnProfile() + '"></div>'
            +'<div class="author-inf fl-l">'
            +'<p class="author-name">'+ data['comments'][l]['commentUser'] +'</p>'
            if(data['comments'][l]['commentDetail'].length > 110) {
                comments +='<p class="comment-content">'+ data['comments'][l]['commentDetail'].substr(0, 110) +'...<span class="see-all">查看全部></span></p>'
            }else {
                comments +='<p class="comment-content">'+ data['comments'][l]['commentDetail'] +'</p>'
            }
        comments +='<p class="comment-date">' + formatterDate(data['comments'][l]['commentDateTime']) + '</p>'
            +'</div></li>'
    }
    $('#comments').html(comments);

    $('#comments').on('click', '.see-all', function() {
        var index = $(this).closest('li').index();
        $(this).parent('.comment-content').html(data['comments'][index]['commentDetail']);
    });

    // 媒体报道
    $('#moreReport').click(function () {
        window.location.href = 'allReport.html?id='+ data['drama']['id'];
    });
    var reportsHtml = '';
    for(var n = 0; n < data['articles'].length; n++) {
        reportsHtml += '<li class="report-item">'
            +'<a href="javascript:;" class="clearfix report-a">'
            +'<img src="'+ data['articles'][n]['articleBanner'] + '" class="report-img fl-l">'
            +'<div class="report-item-inf">'
            +'<h3 class="report-item-title">' + data['articles'][n]['articleTitle'] + '</h3>'

            if(data['articles'][n]['articleIntroduce'].length > 25) {
                reportsHtml +='<p class="report-item-con">' + data['articles'][n]['articleIntroduce'].substr(0, 25) +'...<span class="see-all">查看全部></span></p>'
            }else {
                reportsHtml +='<p class="report-item-con">' + data['articles'][n]['articleIntroduce'] +'</p>'
            }

        reportsHtml +='<p class="report-src-wrap"><span class="report-src">光纬戏剧</span><span class="report-date">'+ formatterDate(data['comments'][n]['createDateTime']) +'</span></p>'
            +'</div></a></li>'
    }
    $('#reports').html(reportsHtml);
    $('#reports').on('click', '.see-all', function() {
        var index = $(this).closest('li').index();
        $(this).parent('.report-item-con').html(data['articles'][index]['articleIntroduce']);
    });
    if (data['articles'].length <= 0) {
        $('#moreReport').hide();
    }

    // 购票按钮
    $('#thirdPartyLink').attr('href', data['drama']['thirdPartyLink']);
    if (data['drama']['theShelves'] == 1 && amongShow(data['drama']['showStartDateTime'], data['drama']['showEndDateTime'])) {
        $('#thirdPartyLink').css('display','block'); 
    }else {
        $('#stopTicket').css('display','block'); 
    }



}
/*当前时间是否在开始结束时间之间*/
function amongShow(showStartDateTime, showEndDateTime) {
    var newTime = new Date().getTime();
    return (showStartDateTime <= newTime ) && (showEndDateTime >= newTime);
}
/*随机返回头像*/
function returnProfile() {
    var num = parseInt(Math.random()*10);
    if (num%2 == 0) {
        return '../../images/plays/profile-f.png';
    }else {
        return '../../images/plays/profile-m.png';
    }
}