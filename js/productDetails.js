$(function(){

    //1.发起请求,获取导航,商品,比价信息
    function getDetails(id) {
        //1.1 发起请求
        $.ajax({
            url: "http://mmb.ittun.com/api/getproduct",
            data: {
                productid: id
            },
            success: function (res) {
                //1.2 截取名字
                var title = res.result[0].productName;
                var index = title.indexOf(" ");
                navTitle = title.slice(0,index);;
                res.result[0].navTitle = navTitle;
                //1.3 生成导航模板
                var html = template("navlist", res);
                $(".topBar .breadcrumb").html(html);
                //1.4 设置分类名
                $(".breadcrumb .category").html(sessionStorage.getItem("category"));
                //1.5 生成商品的模板
                var htmlStr = template("itemlist",res);
                $(".itemlist .inner").html(htmlStr);
                //1.6 生成比价部分的模板
                var pricePart = template("buyItem",res);
                $(".priceBar .article").html(pricePart);
            }
        })
    };

    //2.调用函数,生成导航数据
    //2.1 从sessionStorage中获取productid
    var productid = sessionStorage.getItem("productId");
    getDetails(productid);

    //3.发起请求,获取评论信息
    function getComment(id){
        //3.1 发起ajax请求
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductcom",
            data: {productid,id},
            success: function(res){
                //3.2 渲染评论模板
                var html = template("commentList",res);
                $(".commentDetails").html(html);
            }
        })
    };

    //4.调用显示评论
    getComment(productid);
    
})