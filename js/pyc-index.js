/**
 * Created by Administrator on 2017/2/28.
 */
var isIE = function (ver) {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}
$.fn.slideFadeToggle = function (speed, easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, speed, easing, callback);
};


//初始加载动画
$(window).on("load", function () {

    /*初始化横向滚动轮播——2017/02/24 删除 替换为淡出淡入*/
    // if ($(".bg_carousel > ul").length != 0) {
    //     new h_carousel({
    //         $container: $(".bg_carousel > ul"),
    //         autoPlay: true,
    //         delay: 5000,
    //         direction: 0,
    //         hoverPause: false
    //     })
    // }
    /*首页 加载动画控制*/
    $(".py-index .sy-top").slideFadeToggle(500);
    $(".py-index .logo-title-container").slideFadeToggle(500,function () {
        $(".py-index .sy-search").show();
        // $(".py-guide2").show();
        $(".py-index .sy-main").slideFadeToggle(function () {
            $(".py-index .sy-footer").slideFadeToggle(function () {
                $(".py-index .lt-nav").animate({ opacity: 'toggle', width: 'toggle' },'fast', function () {

                    /*鼠标移动至轮播区域，其他透明化*/
                    function fadeSwitchTrue() {//消失
                        $(".sy-main").stop(false, false);
                        $(".sy-main").fadeTo(800, 0);
                    }
                    function fadeSwitchFalse() {//出现
                        $(".sy-main").stop(true, false);
                        $(".sy-main").fadeTo(500, 1);
                    }
                    $('.sy-main').on("mouseleave", fadeSwitchTrue);
                    $('.lt-nav,.sy-main').on("mouseenter", fadeSwitchFalse);
                });
            });
        });
    });
})

$(function () {

    //设置图片自适应
    function setIMG(img, div){
        var imgWidth=1920;
        var imgHeight=1080;
        var screen_width=$(window).width()||$(document).width();
        var screen_height=$(window).height()||$(document).height();

        div.css({'width':screen_width+'px','height':screen_height+'px'});//容器宽度高度根据浏览器适应

        if(screen_width/screen_height>imgWidth/imgHeight){//说明屏幕宽比较大一点
            var imgNewHeight=screen_width*(imgHeight/imgWidth);
            // console.log(1);
            img.css({'width':screen_width+'px','height':imgNewHeight+'px','top':(screen_height-imgNewHeight)/2+'px',
                'left':0+'px'});
        }else{
            var imgNewWidth=screen_height*(imgWidth/imgHeight);
            img.css({'width':imgNewWidth+'px','height':screen_height+'px','top':0+'px',
                'left':(screen_width-imgNewWidth)/2+'px'});
        }
    }

    //背景图片自适应
    setIMG($('.bg_carousel ul li img'),$('.bg_carousel ul li'));

    //窗口适应
    function widowScreen(divId, hValue,boolean) {
        var sw = $(window).width() || $(document).width();
        if (sw < 1440) {
            $(divId).removeClass(hValue);
        }else  {
            $(divId).addClass(hValue);
        }

    }
    widowScreen($('.logo-title-container'), 'py-logo-max',true);
    widowScreen($('.sy-search'), 'py-search-max',true);
    widowScreen($('.sy-main'), 'py-main-max',true);
    widowScreen($('.sy-footer'), 'py-footer-max',true);


    //根据高度来设置模块之间的间隙
    function setSpace(minH) {
        var syH     = $(window).height() || $(document).height();
        var differH = syH - minH;
        if (differH > 0) {
            $('.logo-title-container').css('padding-top',differH*(1/5)+10+'px');
            $('.sy-search').css({'margin-top':differH*(1/8)+10+'px', 'margin-bottom': differH*(1/12)+10+'px'});
        }else return;
    }
    setSpace(635);


    //窗口变化
    $(window).resize(function () {

        //图片自适应
        setIMG($('.bg_carousel ul li img'),$('.bg_carousel ul li'));

        //布局自适应
        setSpace(635);
        widowScreen($('.logo-title-container'), 'py-logo-max',true);
        widowScreen($('.sy-search'), 'py-search-max',true);
        widowScreen($('.sy-main'), 'py-main-max',true);
        widowScreen($('.sy-footer'), 'py-footer-max',true);
    });

    // 字符限制
    hidden_char($(".hot-news p span"), 54);
    hidden_char($(".md-article-preview p"), 100);

    // 下拉菜单
    $(".dropmenu").on("click", "p", function (e) {
        e.stopPropagation();
        if ($(this).siblings("ul").is(":visible")) {
            $(this).siblings("ul").slideUp();
            $("body").off("click", hideDropmenu);
        }
        else {
            $(".dropmenu").find("ul").hide();
            $(this).siblings("ul").slideDown();
            $("body").on("click", hideDropmenu);
        }
    })
    $(".dropmenu").on("click", "a", function (e) {
        if ($(this).closest(".md-main-pagination").length != 0) {
            e.preventDefault();
        }
        $(this).closest("ul").siblings("p").html($(this).html())
    })
    function hideDropmenu() {
        $(".dropmenu").find("ul").hide();
        $("body").off("click", hideDropmenu);
    }
    /*天气*/
    // $.ajax({
    //     type: "GET",
    //     // url: "http://flash.weather.com.cn/wmaps/xml/yunnan.xml",
    //     url: "http://www.weather.com.cn/data/cityinfo/101291301.html",
    //     data: "",
    //     // dataType: "jsonp",
    //     // jsonp:"callback",
    //     // jsonpCallback:"success_jsonpCallback",
    //     success: function (response) {
    //         console.log(response)
    //     }
    // });
    /*显示提示框*/
    if ($(".flat-btn.mail").length !== 0) {
        var tooltext = "<p>来信须知：</p>" +
            "<p>一、请您自觉遵守中华人民共和国宪法和法律；</p>" +
            "<p>二、您应对来信内容的真实性、客观性负责，信中不要有造谣、诽谤、攻击他人的内容和言论。否则，您将承担由此而引发的一切法律责任；</p>" +
            "<p>三、请勿发表任何形式的广告和推介企业产品或服务等内容；</p>" +
            "<p>四、本信箱只用于国土资源部和社会公众之间的交流，请勿发表与国土资源工作无关的任何内容；</p>" +
            "<p>五、请您真实、准确地填写您联系方式的信息，以便与您联系，我们将依法保护您的隐私权，保守您的联系方式等信息秘密；</p>" +
            "<p>六、您联系方式的信息如不真实、不准确，系统将不予接受无法受理。</p>" +
            "<p>如果您认真阅读并接受上述各项条款，请继续。</p>" +
            "<p class='text-center'><a id='tooltip_agree' href='#此处链接请在index.js中设置'>同意</a><a id='tooltip_refuse' href='javascript:;'>关闭</a></p>"
        $(".flat-btn.mail").tooltip(tooltext, 0);/*参数说明： 显示内容（格式：html字符串）， 鼠标离开元素后多久隐藏（单位：ms）*/
        // $(".flat-btn.blue").tooltip("12312", 0);
    }

    $(".panel-switch").on("mouseover", "a", function () {
        var switchs = $(this).closest(".panel-switch");
        var panels = switchs.siblings(".panel");
        var i = $(this).index();
        $(this).addClass("active").siblings("a").removeClass("active");
        panels.removeClass("active").eq(i).addClass("active");
    });

    /*搜索高级选项*/
    $(".py-index .btn-advanced").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".py-index .py-dropdown").toggle();
    })

    $(".py-dropdown .py-label").each(function () {
        $(this).click(function () {
            $(this).addClass("py-act1").siblings().removeClass("py-act1");
            $(this).siblings().children(".iptweb").removeAttr('checked');
            $(this).children(".iptweb").attr('checked','checked');
        });
    });
    $(".py-dropdown").click(function (e) {
        e.stopPropagation();
        $(this).show();
    });
    $("body").on("click",function () {
        if($(".py-dropdown").length) {
            $(".py-dropdown").hide();
        }
    });
})
//多行字数限制
function hidden_char(node, show) {
    for (var i = 0; i < node.length; i++) {
        var node_str = node[i].innerHTML;

        if (node_str.length > show) {
            var show_str = node_str.substr(0, show) + "...";
            node[i].innerHTML = show_str;
        }
    }
}
// 2017-3-27 修改
/*
 * 注释掉一下方法
 * */
/*首页地图*/
//function pyMap(mapId, urls) {
//    if ($(mapId).length != 0) {
//        $.getJSON('js/map.json', function (geojson) {
//            $(mapId).highcharts('Map', {
//                title: {
//                    text: null
//                },
//                credits: {
//                    enabled: false
//                },
//                legend: {
//                    enabled: false
//                },
//                series: [{
//                    // data: [],
//                    nullColor: '#3a729b',//地图块背景色
//                    color: 'transparent',
//                    // nullInteraction: true,
//                    mapData: geojson,
//                    URLs: urls,
//                    dataLabels: {
//                        enabled: true,
//                        color: '#fff',
//                        // format: '{point.properties.name}'
//                        formatter: function () {
//
//                            if(mapId=="#pyMap2")return '<span>'+this.point.properties.name+'</span>';
//                            return "<a href='" + this.series.userOptions.URLs[this.point.properties.name] + "'>" + this.point.properties.name + "</a>"
//                        },
//                        useHTML: true,
//                        crop: false,
//                         //allowOverlap:true
//                    },
//                    cursor: "pointer"
//                }]
//            }, function () {
//                var hongheMap = $(mapId).highcharts();
//                var URLarr = [];
//                for (var x in $(mapId).highcharts().pointer.options.series[0].URLs) {
//                    URLarr.push($(mapId).highcharts().pointer.options.series[0].URLs[x])
//                }
//                $(mapId).on("click", "[class*=highcharts-name-]", function () {
//                    var index = $(this).index();
//
//                    $(this).css("fill","#e16845").siblings("[class*=highcharts-name-]").css("fill","#3a729b");
//                    $(".map-detail .m-det-model").eq(index).show().siblings(".m-det-model").hide();
//                });
//                $(mapId).on("hover", "[class*=highcharts-name-]", function () {
//                    $(this)[0].point.color = "#e16845";
//                })
//            });
//        });
//    }
//}
//

//pyMap('#pyMap1');
//pyMap('#pyMap2');
//pyMap('#pyMap3');
// 2017-3-27 end
// pyMap('#pyMap4');
$(function () {

    //首页引导
    $(".guider").on("click", showGuide)
    $(".btn-guide-next").click(showGuide);
    $(".btn-guide-close").click(function () {
        guide_step = 1;
        $("[class^=g-]").hide();
        $(".py-guidebg").hide();
    });
    var guide_step = 1;
    var steptotal;
    //获得当前是第几个map
    var mapIndex;

    function showGuide() {
        for(var i=0;i<$('.py-page').length;i++){
            if($('.py-page').eq(i).hasClass('active-page')){
                mapIndex = i;
            }
        }

        if ($('.py-page').eq(mapIndex).find('.hongheMap').length) {
            steptotal = 5;
        }else {
            steptotal = 4;
        }

        if (guide_step == steptotal) {
            guide_step = 1;
            $("[class^=g-]").hide();
            $(".py-guidebg").hide();
            $(".hongheMap").removeClass("py-guide-act");
            // $(".map").removeClass("map-act");
            return false;
        }
        $(".py-guidebg").show();
        getGuideStyle(guide_step);
        guide_step++;
    }
    function getGuideStyle(step) {
        $("[class^=g-]").hide();
        $(".g-" + step).fadeIn(1000);
        $(".py-guide1").removeClass("py-guide-act");
        $(".py-guide2").removeClass("py-guide-act");
        $(".lt-nav").removeClass("py-guide-act");
        // $(".hongheMap").removeClass("map-act");
        $(".hongheMap").removeClass("py-guide-act");

        switch (step) {
            case 1:
                $(".g-" + step).css({
                    "left": $(".py-guide1").offset().left + $(".py-guide1").width() +20 + "px",
                    "top": $(".py-guide1").offset().top + $(".py-guide1").height() - $(".g-" + step).height() / 2 + "px"
                })
                $(".py-guide1").addClass("py-guide-act");
                break;
            case 2:
                $(".g-" + step).css({
                    "left": $(".btn-advanced").offset().left + $(".btn-advanced").width() + 20 + "px",
                    "top": $(".btn-advanced").offset().top + $(".btn-advanced").height() - $(".g-" + step).height() / 2 + "px"
                })
                $(".py-guide2").addClass("py-guide-act");
                break;
            case 3:
                $(".g-" + step).css({
                    "left": $(".lt-nav").offset().left + $(".lt-nav").outerWidth(true) + 20 + "px",
                    "top": $(".lt-nav").outerHeight(true) / 2 - $(".g-" + step).height() / 2 + "px"
                })
                $(".lt-nav").addClass("py-guide-act");
                break;
            case 4:
                $(".g-" + step).css({
                    "left": $('.py-page').eq(mapIndex).find('.hongheMap').offset().left - $(".g-" + step).outerWidth(true)-20 + "px",
                    "top":  $('.py-page').eq(mapIndex).find('.hongheMap').offset().top + $(".map").outerHeight(true) / 2 - $(".g-" + step).height() / 2 + "px"
                })
                $('.py-page').eq(mapIndex).find('.hongheMap').addClass("map-act");
                $('.py-page').eq(mapIndex).find('.hongheMap').addClass("py-guide-act");
                break;
            default:
                break;
        }
    }

    /*左侧固定导航 联动*/
    var timer;
    slideScreen();
    $('.lt-nav ul li').mouseenter(function(){

        var _this = $(this);
        var index = $(this).index(); //当前点击的菜单序号 hover上去
        var scw = $('.sy-main').width(); //初始宽度
        timer = setTimeout(function () {

            _this.addClass("active").siblings().removeClass("active");

            if(!$('.py-page').is(":animated")){
                var pageIndex;

                //获取当前可视的内容序号（还未滑动）
                for(var i=0;i<$('.py-page').length;i++){
                    if($('.py-page').eq(i).hasClass('active-page')){
                        pageIndex = i;
                    }
                }

                $('.py-page').eq(index).addClass('active-page').siblings().removeClass('active-page');

                if(index==pageIndex) return; //防治用户连续点击同一个菜单

                if(index>pageIndex){//向后点击
                    $('.py-page').eq(pageIndex).stop(true,true).animate({'left':-scw+'px'},500);
                    $('.py-page').eq(index).stop(true,true).animate({'left':0+'px'},500);

                }else{//向前点击
                    $('.py-page').eq(pageIndex).stop(true,true).animate({'left':scw+'px'},500);
                    $('.py-page').eq(index).stop(true,true).animate({'left':0+'px'},500);
                }

                setTimeout(function(){
                    for(var k=0;k<$('.py-page').length;k++){
                        if(k!=pageIndex&&k<index){
                            $('.py-page').eq(k).stop(false,true).css({'left':-scw+'px'});
                        }
                        if(k>index){
                            $('.py-page').eq(k).stop(false,true).css({'left':scw+'px'});
                        }
                    }
                },500);
            }
        },400);
    });

    $('.lt-nav ul li').mouseleave(function () {
        clearTimeout(timer);
    });

    /* 字数限制 boolen为ture 为加“[详情]”*/
    function txtLimit(node,num,boolen) {
        for (var i = 0; i < node.length; i++) {
            var old_str = node.eq(i).text();
            if(old_str.length > num){
                new_str = old_str.substring(0, num)+"...";
                node.eq(i).text(new_str);
                if (boolen) {
                    node.eq(i).append("<a href='#'>[详情]</a>");
                }
            }
        }
    }

    //首页
    txtLimit($(".py-leader-ct .py-img .leader-ct .intro"), 34);
    txtLimit($(".py-topic .pym-ct4 .p1"), 290);//首页-专题专栏

    //整体滑屏效果
    function slideScreen(){
        var scw = $('.sy-main').width();
        $('.py-page').css({'left':scw+'px'});
        $('.active-page').css({'left':0+'px'});
    }

    //搜索框点击
    $('.py-index .sy-search input[type=text]').focus(function(){
        if ($(this).val()=="请输入搜索关键词") {
            $(this).val("");
            $(this).siblings('.icon-close').show();
        }
    }).blur(function(){
        if ($(this).val()=="") {
            $(this).val("请输入搜索关键词");
            $(this).siblings('.icon-close').hide();
        }
    });
    $('.py-index .sy-search .icon-close').click(function () {
        $('.py-index .sy-search input[type=text]').val("");
        $('.py-index .sy-search input[type=text]').focus();
    });

    $('#imcarl1').slider();
});

(function ($) {
    //轮播插件
    $.fn.slider = function (options) {

        var carouselId = $(this);
        var bCarousel  = carouselId.children(".carousel-img");
        var bImgWidth  = bCarousel.find("img").width();
        var spans      = carouselId.find(".carousel-span .carousel-span-infor a");
        var nownum     = carouselId.find(".carousel-buttons .now");
        var totalnum   = carouselId.find(".carousel-buttons .total");
        var pre        = carouselId.children(".pre");
        var next       = carouselId.children(".next");
        var len        = bCarousel.children("li").length;
        var i          = 0;
        var timer      = null;
        bCarousel.width(len*bImgWidth);
        nownum.text(1);
        totalnum.text(len);

        for(var i=0; i < len; i++) {
            carouselId.find(".carousel-buttons").append('<li></li>');
        }
        carouselId.find(".carousel-buttons li").eq(0).addClass('carousel-btn-act');
        var buttons    = carouselId.find(".carousel-buttons li");
        //上一张按钮
        pre.click(function () {
            makeSlider(-1, 1);
        });

        //下一张
        next.click(function () {
            makeSlider(1, 1);
        });

        function makeSlider(direct,distanceNum) {

            if(!bCarousel.is(":animated")) {

                //向上循环
                if(direct < 0){

                    i = i - distanceNum;
                    if(i <= -1){
                        i  = len-1;
                    }
                    //无缝循环
                    for(var kk = 0; kk < distanceNum; kk++){
                        bCarousel.prepend(bCarousel.children("li").eq(len-1));
                    }
                    bCarousel.css('left', -distanceNum*bImgWidth);
                    bCarousel.animate({'left': 0},600);

                }else {//向下循环
                    i = i + distanceNum;
                    if(i >= len){
                        i = 0;
                    }
                    bCarousel.animate({"left": -distanceNum*bImgWidth}, 600,function () {

                        //无缝循环
                        for(var kk = 0; kk < distanceNum; kk++){
                            bCarousel.append(bCarousel.children("li").eq(0));
                        }
                        bCarousel.css('left', 0);
                    });
                }
                //文本，按钮样式
                buttons.eq(i).addClass("carousel-btn-act").siblings().removeClass("carousel-btn-act");
                spans.eq(i).show().siblings().hide();
                nownum.text(i+1);
                return true;
            }else return false;
        }

        //按钮按动
        buttons.each(function () {
            $(this).click(function () {
                var btnIndex = $(this).index();//当前点击的小圆点序号
                var distan   = btnIndex - i;
                var flag     = true;
                if(distan == -(len-1)){
                    flag = makeSlider(1,1);
                }else {
                    if(distan < 0){
                        flag = makeSlider(-1, Math.abs(distan));//上一张
                    } else if(distan > 0){
                        flag = makeSlider(1, Math.abs(distan));//下一张
                    }else return false;
                }
                if(flag){
                    i = btnIndex;
                }
            });
        });

        //移入移出设置清除定时器
        carouselId.hover(function () {
            clearInterval(timer);
        },function () {
            timer = setInterval(function () {
                makeSlider(1,1);
            },3000);
        });

        //设置定时器
        timer = setInterval(function () {
            makeSlider(1,1);
        },3000);
    }

})(jQuery);

/*
* 新增map
* */
function pyMap(id,data){
    $.get('js/map.json', function (hongHeJson) {
        echarts.registerMap('honghe', hongHeJson);
        var myChart = echarts.init(document.getElementById(id));
        myChart.setOption({
            series: [{
                type: 'map',
                map: 'honghe',
                roam:false,
                selectedMode:"single",
                zoom:1.3,
                aspectScale:1,
                label:{
                    normal:{
                        show:true,
                        textStyle:{
                            color:"#ffffff",
                            fontSize:12,
                            fontFamily:'Microsoft YaHei'
                        }
                    },
                    emphasis:{
                        show:true,
                        textStyle:{
                            color:"#ffffff",
                            fontSize:12,
                            fontFamily:'Microsoft YaHei'
                        }
                    }
                },
                itemStyle:{
                    normal:{
                        areaColor:"#3a849b",
                        borderColor:"#ffffff",
                        borderWidth:1,
                    },
                    emphasis:{
                        areaColor:"#e14b45"
                    }
                },
                data:data
            }]
        });

        myChart.on('click',function(params){
            if(id=="pyMap2"){
                hongheMapTab(params.data.url,params.data.name,params.data.imgUrl);
                return
            }
            window.open(params.data.url)
        })
    });
}
function hongheMapTab(url,name,imgUrl){
    $('.pym-ct6 h3').text(name);
    $('.pym-ct6 img').attr('src',imgUrl);
    $('.pym-ct6 a').attr('href',url);
}

$(function(){
    var bg=$('.bg_carousel li');
   function playBg(){
       for(var i=0,max=bg.length;i<max;i++){
           if(bg.eq(i).is(':visible')){
               var index =i+1==max?0:i+1;
               console.log(index)
               bg.eq(index).fadeIn(500).siblings('li').fadeOut(500);
               break;
           }
       }
       setTimeout(playBg,5000);
   }
    setTimeout(playBg,5000)
});