$(function(){
    //1.发送请求获取一级分类
    function getTopCategory(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorytitle",
            type: "get",
            dataType: "json",
            success: function(res){
                var html = template("category",res);
                $(".mui-table-view").html(html);
                 $(".mui-navigate-right").each(function(index,ele){
                     var id = $(ele).attr("title");
                     getSubCategory(id,index);
                 })
            }
        })
    };

    //调用获取一级分类请求
    getTopCategory();

    //2.发送请求获取二级分类
    function getSubCategory(id,i) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategory",
            data: {titleid:id},
            success: function(res){
                var html = template("subcategory",res);
                $(".mui-collapse-content").eq(i).html(html);
            }
        })
    };


    //3.设置点击事件
    var flag = true;
    $(".catorylist").on("tap","li",function(){
        if(flag){
            $(this).find(".mui-collapse-content").removeClass("hideItem").parent().siblings().find(".mui-collapse-content").addClass("hideItem");
            flag = false;
        }else{
            $(this).find(".mui-collapse-content").addClass("hideItem");
            flag = true;
        }  
    });

    //4.设置二级分类的点击事件
    $(".catorylist").on("tap",".categoryId",function(){
        //4.1 获取点击的二级分类的id,存放在sessionStorage中
        sessionStorage.setItem("categoryId",$(this).data("id"));
        //4.2 跳转至商品列表页
        location.href = "productList.html";
    });
})