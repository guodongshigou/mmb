//返回到上一级
function goback() {
    history.back(); 
}

$(function () {
    //渲染数据店铺和区域
    function render(url, idName, selector) {
        $.ajax({
            url: url,
            type: "get",
            success: function (res) {
                var htmlstr = template(idName, res);
                $(selector).html(htmlstr);
                if (idName == "shoplist") {
                    $(".storeName").html(res.result[0].shopName);
                }
                if (idName == "arealist") {
                    $(".addrName").html(res.result[0].areaName.substring(0, 2));
                }
            }
        })
    };

    //刚进时,要渲染数据,上游没有传输对应的参数,默认渲染id都为1的数据
    //修改:以对象的形式传进去
    var data = {};
    data.shopid = 0;
    data.areaid = 0;
    function renderPro(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsproduct",
            type: "get",
            data: data,
            success: function (res) {
                var htmlstr = template("productlist", res);
                $(".main").html(htmlstr);
            }
        });
    }

    //调用方法渲染店铺数据
    render("http://mmb.ittun.com/api/getgsshop", "shoplist", ".list");

    //调用方法渲染区域数据
    render("http://mmb.ittun.com/api/getgsshoparea", "arealist", ".areashop");

    //调用方法,初始渲染默认的数据
    renderPro(data);

    //列表交互效果
    /**
     * ele0:被点击的对象
     * ele1:列表对象
     * ele2:兄弟列表对象
     * ele4:坐在被点击对象旁边的受害者
     */
    function animate(ele0, ele1, ele2, ele4) {
        //改变箭头的方向,并且改变下拉表的显示状态
        if ($(ele0).find(".fa").hasClass("fa-caret-down")) {
            //显示下拉表
            $(ele1).slideDown();
            //将其他的下拉表隐藏
            $(ele2).slideUp();
            $(ele4).find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");
            //将箭头向上
            $(ele0).find(".fa").removeClass("fa-caret-down").addClass("fa-caret-up");
        } else {
            //显示下拉表
            $(ele1).slideUp();
            //将箭头向上
            $(ele0).find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");

        }
    }

    //店铺添加点击事件
    $(".business").click(function () {
        animate(".business", ".list", ".areashop", ".area");
    });

    // 给区域添加点击事件
    $(".area").click(function () {
        animate(".area", ".areashop", ".list", ".business");
    });

    //动态添加点击事件
    $(".list").on("click", "li", function () {
        var shopid = $(this).data("shopid");
        //点击时改变勾选的状态
        $(this).find(".fa").addClass("fa-check").parent().siblings().find(".fa").removeClass("fa-check");
        $(this).parent().slideUp(100);
        //改变箭头方向
        $(".business").find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");
        //改变值
        var value = $(this).find(".title").html();
        $(".storeName").text(value);

        //传入点击时获取的数据
        data.shopid = shopid;
        renderPro(data);
    });

    $(".areashop").on("click", "li", function () {
        var areaid = $(this).data("areaid");
        $(this).find(".fa").addClass("fa-check").parent().siblings().find(".fa").removeClass("fa-check");
        $(this).parent().slideUp(100);
        //改变箭头方向
        $(".area").find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");
        //改变值
        var value = $(this).find(".title").html().substring(0, 2);
        $(".addrName").text(value);
        data.areaid = areaid;
        renderPro(data);
    });

    $(".main").on("click",".gotogether",function(){
        location = "https://www.taobao.com/";
    })

});