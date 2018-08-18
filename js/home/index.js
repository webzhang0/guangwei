//获取首页数据
var indexData = ''
function getData(){
    $.ajax({
        type:'get',
        async:false,
        url:'http://www.guangweixiju.com/drama/mobile/index',
        dataType:'json',
        success:function(msg){
            if(msg.code==200){
                indexData = msg.data
            }
        },
        error:function(data){
            
        }
    })
}
getData();
//banner
console.log(indexData)
//时间戳转换
function time(s){
     var date = new Date(s);
       Y = date.getFullYear();
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
        D = date.getDate()<10? '0'+date.getDate():date.getDate()
        var rell ={y:Y,m:M,d:D};
        return Y+'.'+M+'.'+D
}
//获取当前时间戳
function getNowTime(){
    var timestamp=new Date().getTime();
    return timestamp
}
//字段截取
function detail(s){
    return s.slice(0,50)+'...'
}
console.log(getNowTime())
var homePage = {
    banner:function(){
        var html = '';
        $.each(indexData.banners,function(index,item){
            html+='<div class="swiper-slide"><a href="'+item.bannerLink+'"><img src="'+item.banner+'" alt=""></a></div>'
        })
        $('#bannerSwiper .swiper-wrapper').html(html)
    },
    recommendation:function(){
        var html = '<a href="'+indexData.welfareDrama.dramaLink+'"><img src="'+indexData.welfareDrama.image+'" alt=""></a>';
        $('#recommendtionCover').html(html)
        var count = Math.ceil(indexData.dramas.length/3);
        var swiperHtml = '';
        for(var i = 0;i<count;i++){
            var ll = '<ul class="">';
            for(var k= i*3;k<(i+1)*3;k++){
                if(indexData.dramas[k]){
                    ll+='<li><a href="'+indexData.dramas[k].thirdPartyLink+'">'
                    ll+='<img src="'+indexData.dramas[k].dramaCoverImage+'" alt="">'
                    ll+='<div class="describe">'
                    ll+='<h2>'+indexData.dramas[k].dramaName+'</h2>'
                     ll+='<div class="time">'+time(indexData.dramas[k].showStartDateTime)+'-'+time(indexData.dramas[k].showEndDateTime)+'</div>'
                    if(indexData.dramas[k].theShelves == 1 && getNowTime()<indexData.dramas[k].showEndDateTime){
                        ll+='<span>售票中</span></div>'
                    }else{
                        ll+='<span>已下架</span></div>'
                    }
                    ll+= '</a></li>'
                }
            }
            ll+='</ul>'
            swiperHtml+='<div class="swiper-slide">';
            swiperHtml+=ll;
            swiperHtml+='</div>'
        }
        $('#reommondSwiper .swiper-wrapper').html(swiperHtml)
    },
    news:function(){
        var html = '';
        $.each(indexData.articles,function(index,item){
            html+='<div class="swiper-slide news-item"><a href="views/news/newsDetails.html?id='+ item.id +'&articleTypeName='+ item.articleTypeName +'">'
            html+='<div class="img-box">'
            html+='<img src="'+item.articleBanner+'" alt="">'
            html+='<span class="tip">'+item.articleTypeName+'</span></div>'
            if(item.articleTypeName=='行业新闻'){
                html+=' <div class="red bottom">'
            }else if(item.articleTypeName == '媒体报道'){
                html+=' <div class="green bottom">'
            }else{
                html+=' <div class="bule bottom">'
            }
            html+='<div class="name">'+item.articleTitle+'</div>'
            html+='<div class="time">'+item.time+'</div></div></a></div>'                           
        })
        $('#newsSwiper .swiper-wrapper').html(html)
    },
    hot:function(){
        var html = '';
        $.each(indexData.comments,function(index,item){
            html+='<div class="hot-item"><a href="'+item.path+'">'
            html+='<img src="'+item.image+'" alt="">'
            html+='<div class="hot-right">'
            html+='<span style="vertical-align: middle">'
            html+='<div class="hot-item-title">'+item.dramaName+' </div>'
            html+='<div class="hot-item-content"> '+detail(item.detail)+' </div></span></div></a></div>'                   
        })
        $('#hotList').html(html)
    },
    init:function(){
        this.banner();
        this.news();
        this.recommendation();
        this.hot();
    }
}
homePage.init();