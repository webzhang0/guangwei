(function PageResize() {
    (function GetSize() {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        width > 750 ? width = 750 : null;
        width < 320 ? width = 320 : null;
        document.documentElement.style.fontSize = (width * (100 / 750)) + "px";
        if (!window.onresize) {
            window.onresize = function() {
                onFooEndFunc(GetSize);
            }
        }
    })();
    //寤惰繜杩愯璁＄畻
    var executionTimer;
    var onFooEndFunc = function(fn) {
        var delay = 300; // 鏍规嵁瀹為檯鎯呭喌鍙皟鏁村欢鏃舵椂闂�
        if (!!executionTimer) {
            clearTimeout(executionTimer);
        }
        //杩欓噷寤舵椂鎵ц浣犵殑鍑芥暟
        executionTimer = setTimeout(function() {
            fn();
        }, delay);
    };
})();

//杩斿洖榛樿鍥剧墖
function GetDefaultHeadImg(obj) {
    obj.src = "/images/base/no-pic.png";
};
// 鎴挎簮璇︽儏椤� 杞挱鍥炬姤閿欐椂鐨勫崰浣嶅浘
function GetDetailImg(obj){
    obj.src = "/images/page/details/defaultImg.png";
};
// 娌℃湁妤肩洏鍥剧墖
function GetDefaultComplexImg(obj){
    obj.src = "/images/page/newhouse/noComplexPic.jpg";
};
// 娌℃湁鎴峰瀷鍥剧墖
function GetDefaultHouseImg(obj){
    obj.src = "/images/page/newhouse/no-housetype.jpg";
}
// 閲嶅鍔犺浇涓€娆″浘鐗�
function loadImg(obj){
    var thisImg = obj.src;
    setTimeout(function(){
        obj.src = thisImg;
    },200);
};
//鍥剧墖灞呬腑
function imgCenter(obj) {
    setTimeout(function () {
        obj.style.cssText = "position:absolute;left:50%;top:50%;margin:-" + (obj.height / 2) + "px 0 0 -" + (obj.width / 2) + "px;";
    }, 300);
};