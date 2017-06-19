/**
 * Created by Administrator on 2017/3/26.
 * 子页面新增js on 2017/24
 */

 /*2017/4/17新增enter键搜索*/
$(function(){
    $("#orpro").keydown(function(event) {
        var keyCode = event.keyCode || event.which;
        if (keyCode == 13) {//表示按下enter键

        }
    });
});

 /*2017/4/17新增enter键搜索 end*/


$(function () {
    var height = $('.py-table1 tr').height();
     $('.py-table1').hover(function(){
            $('.list-info-wrap .con-list-info').each(function(item,i){
            $(this).css('top',height*item+'px');
        });
        $('.py-table1 .list-tr').hover(function(){
            var index = $(this).index()-1;
            $('.py-table1 .list-tr td').css('color','#5c5c5c');//2017/4/12新增
            $(this).find('td').eq(1).css('color','#006a8b');
            $('.list-info-wrap .con-list-info').eq(index).show().siblings().hide();
        })
     },function(){
        $('.list-info-wrap .con-list-info').hide();
        $('.py-table1 .list-tr td').css('color','#5c5c5c');//2017/4/12新增
     });


    //下拉列表
    function slidedp(divId) {
        $(divId).each(function () {
            var _thisli = $(this).parent();
            $(this).click(function () {
                _thisli.addClass('active').siblings().removeClass('active');
                if ($(_thisli).children('ul').css('display') == 'none') {
                    $(_thisli).children('ul, div').slideDown();
                    $(_thisli).siblings().children('ul, div').slideUp();
                }else {
                    $(_thisli).children('ul, div').slideUp();
                }
            });
        });
    }
    //slidedp($('.pym-ldxx-ct1 .m-slide-list-1>li>a')); //信息公开三级目录-左侧下拉列表
    slidedp($('.m-zmhd-sidelf .m-slide-list>li>a')); //政民互动-左侧下拉列表


    //tab切换
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

    //信息公开三级目录-左侧下拉
    $(".pym-tabtt").each(function () {
        var contents = $(this).siblings('.pym-tabct').children('.m-slide-list2');
        tabShift($(this).children('li'), contents, "active");
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

    //时政红河
    txtLimit($('.pym-ldxx-title .p'), 115);
});

