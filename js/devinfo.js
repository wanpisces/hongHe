// 2017/4/1新增
$(function(){


    $('.check-role input').click(function(){
        $(this).attr('checked','checked').siblings('input').removeAttr('checked');
    });
    getText($('.select-wrap'));
    //下拉框
     function getText(parent){
        parent.click(function(){
            // window.event?window.event.cancelBubble=true:event.stopPropagation();
            var e=getEvent();
            if(window.event){
                //e.returnValue=false;//阻止自身行为
                e.cancelBubble=true;//阻止冒泡
             }else if(e.preventDefault){
                //e.preventDefault();//阻止自身行为
                e.stopPropagation();//阻止冒泡
             }
            var _this = $(this);
            _this.find("ul").slideToggle();
            _this.find("ul li").click(function(){
                var liText = $(this).text();
                _this.find("input").val(liText);
            });
        });
        $("body").click(function(){
            parent.find("ul").slideUp();
        })
      }
    //获取事件
    function getEvent(){
        if(window.event)    {return window.event;}
        func=getEvent.caller;
        while(func!=null){
          var arg0=func.arguments[0];
          if(arg0){
           if((arg0.constructor==Event || arg0.constructor ==MouseEvent
              || arg0.constructor==KeyboardEvent)
              ||(typeof(arg0)=="object" && arg0.preventDefault
              && arg0.stopPropagation)){
              return arg0;
            }
          }
          func=func.caller;
        }
        return null;
      }
    });

// 2017/4/1新增end




$(function(){
    //高级检索-列表
    // 2017/3/10修改
    //根据行数来限制文字溢出
   function wordRowLimt(node, row) {
        var _height = parseInt($(node).css('line-height'))*row; //限制的高度
        for (var i = 0; i < $(node).length; i++) {//多个节点遍历
            var old_str = $(node).eq(i).text(); //节点文本
            for (var j = 0; j < old_str.length; j++) {
                $(node).eq(i).text(old_str.substring(0, j));
                if ($(node).eq(i).height() > _height) { //截取字符串
                    new_str = old_str.substring(0, j-2)+"...";
                    $(node).eq(i).text(new_str);
                    break;
                }
            }
        }
    }
    wordRowLimt($(".pym-gjjs-ct .pym-result .info"), 2);


     /**
     * tab切换
     */
    function tabShift(tabLi, contents, clazz, event) {
        var event    = event || "mouseover";
        var tabTimer = null;
        contents.eq(0).show().siblings().hide();
        tabLi.on(event,function () {
            var _this = $(this);
            var i     = $(this).index();
            function way() {
                _this.addClass(clazz).siblings().removeClass(clazz);
                contents.eq(i).show().siblings().hide();
            }
            tabTimer = setTimeout(way,200);
        });
    }
    tabShift($("#szhhTab1 li"), $("#szhhTab1Ct .pym-newslist"), "py-act1");//时政红河-国务院文件
    tabShift($("#szhhTab2 li"), $("#szhhTab2Ct .pym-newslist"), "py-act1");//时政红河-国务院信息
    // 细览页超40

     $(".nav-wrap>div").hover(function(){
        $(this).find(".green-btn").removeClass("hide");
    },function(){
        $(this).find(".green-btn").addClass("hide");
    });
    $("#detail-nav-id .medical").hover(function(){
        $(this).children("div").show();
    },function(){
        $(this).children("div").hide();
    });

//   下拉
    $(document).click(function(e){
        $('.ysgk-select').removeClass('cur');
        $('.ysgk-select-option').slideUp(100);
    })
    $('.ysgk-select-label').click(function(e){
        var e=e||event;

        if(e.stopPropagation){
            e.stopPropagation()
        }else{
            e.cancelBubble=true;
        }
       var _Select=$('.ysgk-select');
       var index= _Select.index($(this).parent('.ysgk-select'))
        for (var i=0,max=_Select.length; i<max;i++){
            if(i==index){
                $(this).parent('.ysgk-select').toggleClass('cur');
                $(this).siblings('.ysgk-select-option').slideToggle(100);
                return;
            }
            _Select.eq(i).removeClass('cur');
            _Select.eq(i).children('.ysgk-select-option').slideUp(100);
        }
    });
    $('.ysgk-select-option li').click(function(){
        var text=$(this).text();
        $(this).parent().siblings('.ysgk-select-label').text(text)
    })
//    radio
    $('.ysgk-radio').click(function(){
        $(this).addClass('cur').siblings('.ysgk-radio').removeClass('cur').children('input').attr('checked',false);
    })
//    name 定位

    for(var i=0,max=$('.ysgk-form-name p').length;i<max;i++){
       var _p= $('.ysgk-form-name p').eq(i);
        var ph=_p.height();
        _p.css({'margin-top':-ph/2})
    }
});




//布局

$(function () {



    $(".sq-md-check").click(function(){
        $(".check-popup").show(200);
        $(".sq-del").click(function(){
            $(".check-popup").hide(200);
        })
    });

    $(".submit-btn").click(function(){
        $(".check-popup").show(200);
        $(".sq-del").click(function(){
            $(".check-popup").hide(200);
        })
    });



    //魅力红河点击扩展
    //2017/3/8修改
    $(".charm-section1").hover(function(){
        $(".p-ml-sec1").css({"overflow-y":"visible","height":"auto"});
    },function(){
        $(".p-ml-sec1").css({"overflow-y":"hidden","height":"130px"});
    });
    $(".p-arrow").hover(function(){
        $(".p-ml-sec1").css({"overflow-y":"visible","height":"auto"});
    },function(){
        $(".p-ml-sec1").css({"overflow-y":"hidden","height":"130px"});
    });

    liNum($(".img-list-con"), 4);
    function liNum(parent, num) {
        var oLi = parent.find("li");
        for (var i = 1; i <= oLi.length; i++) {
            if (i % num == 0) {
                oLi.eq(i - 1).css("margin-right", "0px");
            }
        }
    }

    $(".img-list-con li").mouseover(function () {
        $(this).css("border", "1px solid #3a849b").siblings().css("border", "1px solid #d2d2d2");
    });
    $(window).scroll(function(){
        var bodyY = $(this).scrollLeft();
        $(".hh-nav").css("left",-bodyY+"px");
        $(".hh-head").css("left",-bodyY+"px");
    })


});


$(function () {
    //下拉框
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

$(".btn-advanced").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".py-dropdown").toggle();
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


var _urls = {
                /*
                城市名称：链接地址
                注：城市名称务必与map.json中的数据，顺序一一对应
                */
                "绿春县": "#绿春县",
                "红河县": "#红河县",
                "石屏县": "#石屏县",
                "河口县": "#河口县",
                "开远市": "#开远市",
                "蒙自市": "#蒙自市",
                "弥勒市": "#弥勒市",
                "屏边县": "#屏边县",
                "泸西县": "#泸西县",
                "个旧市": "#个旧市",
                "建水县": "#建水县",
                "金平县": "#金平县",
                "元阳县": "#元阳县"
            };

mapDorw($('#hongheMap3'),_urls,"js/map1.json"); /*魅力红河页面1*/

// 地图描绘
function mapDorw(container,urls,jsonUrl){
    if (container.length != 0) {
        $.getJSON(jsonUrl,function (geojson) {
            container.highcharts('Map', {
                title: {
                    text:null
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                series: [{
                    // data: [],
                    nullColor: '#3a729b',//地图块背景色
                    color: 'transparent',
                    // nullInteraction: true,
                    mapData: geojson,
                    URLs:urls,
                    dataLabels: {
                        enabled: true,
                        color: '#fff',
                        // format: '{point.properties.name}'
                        formatter: function () {
                            return "<a href='" + this.series.userOptions.URLs[this.point.properties.name] + "'>" + this.point.properties.name + "</a>"
                        },
                        useHTML: true,
                        crop: false
                        // allowOverlap:true
                    },
                    cursor: "pointer"
                }]
            }, function () {
                var hongheMap3 = container.highcharts();
                var URLarr = [];
                for (var x in container.highcharts().pointer.options.series[0].URLs) {
                    URLarr.push(container.highcharts().pointer.options.series[0].URLs[x])
                }

                container.on("click", "[class*=highcharts-name-]", function () {
                    location.href = URLarr[$(this).index()];
                    $(this)[0].point.color = "#e16845";
                });
                container.on("hover", "[class*=highcharts-name-]", function () {
                    $(this)[0].point.color = "#e16845";
                });
                container.find(".highcharts-point").click(function(){
                    var index = $(this).index();
                    $(this).css("fill","#e16845").siblings("[class*=highcharts-name-]").css("fill","#3a729b");
                    $(".map-detail .m-det-model").eq(index).show().siblings(".m-det-model").hide();
                });
            });
        });
    }
}



    checkBox($(".check-td ul li"));//我要申请2017/4/1新增
    checkRadio($('.resol-unit li'));//我要申请2017/4/1新增
    checkRadio($('.side-td li'));//我要申请2017/4/1新增
    // 民意调查征集
    checkRadio($(".survey-div ul li"));
    checkRadio($(".ipt-radio p"));

    function checkRadio(box){
        box.click(function(){
            $(this).addClass("on").siblings().removeClass("on");
            $(this).find("input").attr("checked",true);
            $(this).siblings().find("input").attr("checked",false);
        });
    }
     function checkBox(box){
        box.click(function(){
        var checked = $(this).find("input").attr("checked");
        $(this).toggleClass("on");
        if (checked) {
            $(this).attr("checked",false);
        }else{
            $(this).attr("checked",true);
        }
    });
     }


    $(".survey-div1 ul li").click(function(){
        var checked = $(this).find("input").attr("checked");
        $(this).toggleClass("on");
        if (checked) {
            $(this).attr("checked",false);
        }else{
            $(this).attr("checked",true);
        }
    });


    $("#carousel").carousel();
    newsSwitch($(".m-con-hd"));//今日头条切换
    //政务动态选项卡
    tabOption($("#dynamic1 .tle-detail a"), $("#dynamic1 .dy1-conDetali .dy1-con"));
    searchBox($(".search-con"), "请输入关键词");
    wordLimit($(".dy1-con li a p"), 50);
    wordLimit($(".dy1-con-info"), 48);
    wordLimit($(".vedio-info p"), 35);
    wordLimit($(".vedio-info a"), 17);
    dateShow();//日期展示

    backTop($(".side4"));
    //回到顶部
    function backTop(btn) {
        btn.click(function () {
            var timer = null;
            var speed = 2;
            var interval = 50;
            function topMove() {
                var scrollTop = $(document).scrollTop();
                scrollTop = scrollTop / speed;
                if (scrollTop < 1) {
                    scrollTop = 0;
                    clearInterval(timer);
                }
                $(document).scrollTop(scrollTop);
            }
            timer = setInterval(topMove, interval);
        });
    }
    function dateShow() {
        var dateStr = getDate();
        var year = dateStr.substring(0, 4);
        var month = dateStr.substring(4, 6);
        var day = dateStr.substring(6, 8);
        $(".csl-day").text(day);
        $(".csl-year").text(year + "-" + month);
    }
    //日期
    function getDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        } else {
            month = "" + month;
        }
        if (day < 10) {
            day = "0" + day;
        } else {
            day = "" + day;
        }
        return year + month + day;

    }

    //字数限制
    function wordLimit(node, max) {
        for (var i = 0; i < node.length; i++) {
            var old_str = node.eq(i).text();
            if (old_str.length > max) {
                new_str = old_str.substring(0, max) + "...";
                node.eq(i).text(new_str);
            }
        }
    }

    //搜索框
    function searchBox(searchDiv, txtValue) {
        var inpt = searchDiv.find(">input");
        var del = searchDiv.find("span");
        del.click(function () {
            inpt.val("");
        });
        inpt.focus(function () {
            if ($(this).val() == txtValue) {
                $(this).val("");
            }
        }).blur(function () {
            if ($(this).val() == "") {
                $(this).val(txtValue);
            }
        });
    }

    //新闻切换
    function newsSwitch(parent) {
        var oLi = parent.find("li"),
            prev = parent.find(".prev"),
            next = parent.find(".next"),
            timer = null,
            interval = 3000,
            i = 1;
        function autoSwitch() {
            i = i % oLi.length;
            oLi.eq(i).show().siblings().hide();
            i++;
        }
        prev.click(function () {
            clearInterval(timer);
            i--;
            i = i % oLi.length;
            oLi.eq(i).show().siblings().hide();
            $(this).addClass("on").siblings().removeClass("on");
            timer = setInterval(autoSwitch, interval);
        });
        next.click(function () {
            clearInterval(timer);
            i++;
            i = i % oLi.length;
            oLi.eq(i).show().siblings().hide();
            $(this).addClass("on").siblings().removeClass("on");
            timer = setInterval(autoSwitch, interval);
        });
        parent.hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(autoSwitch, interval);
        })
        timer = setInterval(autoSwitch, interval);
    }

    //选显卡
    function tabOption(item, $box) {
        item.mouseover(function () {
            var index = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $box.eq(index).show().siblings().hide();
        })
    }
})



/**
 * Created by Administrator on 2017/1/20. 政府信箱
 */
$(function () {
    //政府信息公开 表格下拉选项
    // function tabList(tabId) {
    //     $(tabId)
    // }
    $('.py-sellist').click(function (e) {
        e.stopPropagation();
        $(this).children('.py-ul').toggle();
    });
    $('.py-sellist .py-ul li').click(function (e) {
        // e.stopPropagation();
        var livalue = $(this).text();
        $(this).parents('.py-sellist').children('span').text(livalue);
    });

    //body点击，所有列表收回
    $('body').on('click',function () {
        if($('.py-ul').length) {
            $('.py-ul').hide();
        }
    });

    //表格里面 radio按钮点击
    $(".py-agree").each(function () {
        $(this).click(function () {
            $(this).addClass("py-act1").siblings().removeClass("py-act1");
            $(this).siblings().children(".iptagree").removeAttr('checked');
            $(this).children(".iptagree").attr('checked','checked');
        });
    });

    //清空表单
    $('.py-btn .py-none').click(function () {
        $('.py-table input').val('');
        $('.py-table textarea').val('');
        $(".py-agree:first").addClass("py-act1").siblings().removeClass("py-act1");
        $('.py-sellist').children('span').text('请选择');

    });

});







    ; (function ($) {
        $.fn.carousel = function () {
            var speed = 1000,
                interval = 2000,
                nowIndex = 0,
                timer = null,
                oPrev = $(this).find(".prev"),
                oNext = $(this).find(".next"),
                oP = $(this).find(".p-con"),
                oUl = $(this).find(".csl-content ul"),
                firstLi = oUl.find("li:first").clone(),
                liWidth = oUl.find("li:first").outerWidth();
            oUl = oUl.append(firstLi);
            var length = oUl.children("li").length;
            var ulWidth = length * liWidth;
            oUl.width(ulWidth);
            oPrev.click(function () {
                clearInterval(timer);
                nowIndex--;
                if (nowIndex == -1) {
                    nowIndex = length - 2;
                    oUl.css({ "left": -liWidth * (length - 1) + "px" });
                }
                oUl.stop().animate({ "left": -liWidth * nowIndex + "px" }, speed, function () {
                    timer = setInterval(cslProgcess, interval);
                });
                oP.eq(nowIndex).show().siblings().hide();
                $(this).addClass("on").siblings().removeClass("on");
            });
            oNext.click(function () {
                clearInterval(timer);
                nowIndex++;
                if (nowIndex == length) {
                    nowIndex = 1;
                    oUl.css({ "left": "0px" });
                }
                oUl.stop().animate({ "left": -liWidth * nowIndex + "px" }, speed, function () {
                    timer = setInterval(cslProgcess, interval);
                });
                if (nowIndex == length - 1) {
                    oP.eq(0).show().siblings().hide();
                } else {
                    oP.eq(nowIndex).show().siblings().hide();
                }
                $(this).addClass("on").siblings().removeClass("on");
            });
            oUl.hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(cslProgcess, interval);
            });
            function cslProgcess() {
                nowIndex++;
                if (nowIndex == length) {
                    nowIndex = 1;
                    oUl.css({ "left": "0px" });
                }
                oUl.stop().animate({ "left": -liWidth * nowIndex + "px" }, speed);
                if (nowIndex == length - 1) {
                    oP.eq(0).show().siblings().hide();
                } else {
                    oP.eq(nowIndex).show().siblings().hide();
                }
            }
            timer = setInterval(cslProgcess, interval);
        }

    })(jQuery);







