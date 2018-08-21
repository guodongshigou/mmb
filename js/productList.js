$(function(){

    //1.发起导航请求,获取导航信息
    function getNav(categoryid){
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorybyid",
            data: {categoryid:categoryid},
            success:function(res){
                var html = template("navlist",res);
                $(".topBar .breadcrumb").html(html);
            }
        })
    };

    //2.调用函数,生成导航数据
    //2.1 从sessionStorage中获取categoryid
    var categoryId = sessionStorage.getItem("categoryId");
    getNav(categoryId);

    //3.1.1 声明一个全局变量,用于记录当前页
    var currentPage;
    //3.1.2 声明一个全局变量,用于记录总的页数
    var totalpage;

    //3.封装函数,用于获取商品详情
    function getItem(categoryid,pageid) {
        //3.2 记录当前页数
        currentPage = pageid;


        //3.3 发送请求
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            data: {categoryid:categoryid,pageid:pageid},
            success: function(res){
                 
                var price;
                var brandName;

                console.log(res);
                

                //7.设置侧栏品牌的点击事件
                $("#menu .types").on("click","span",function(){
                    //7.1 声明空对象用于接收筛选的值
                    var selectedRes = {};
                    //7.2 为对象设置result属性存放筛选出来的数据
                    selectedRes.result = [];
                    //7.3 点击的时候改变颜色
                    $(this).addClass("active").parent().siblings().find("span").removeClass("active");

                    if($(this).html()=="全部品牌" || $(this).html() =="全部价格"){
                        getItem(categoryId,1);
                        //7.9 调用关闭侧栏的函数
                        $("#my-button").click();
                        return;
                    };
                    
                    //获取价格
                    if($(this).hasClass("price")){
                        price = $(this).html();
                        //console.log(brandName);
                         //7.5 分解价格
                        if (price != "全部价格") {
                            //获取最小值和最大值
                            var min = parseInt(price.split("-")[0]);
                            var max = parseInt(price.split("-")[1]);
                            //将响应体中符合要求的值存放进新的对象中
                            for (var i = 0; i < res.result.length; i++) {
                                var currentPrice = parseInt(res.result[i].productPrice.slice(1));
                                if (currentPrice <= max && currentPrice >= min) {
                                    selectedRes.result.push(res.result[i]);
                                }
                            };
                            //如果有品牌名,代表已经筛选
                            if (brandName) {
                                var arr = selectedRes.result;
                                selectedRes.result = [];
                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].brandName == brandName) {
                                        selectedRes.result.push(arr[i]);
                                    }
                                }
                                console.log(selectedRes.result);
                            };
                         
                        }
                    }else {
                        //7.4 获取选择的品牌名
                        brandName = $(this).html();
                        //console.log(price);
                        //7.5 从响应体中筛选出对应的数据,添加至声明的对象中
                        for (var i = 0; i < res.result.length; i++) {
                            if (res.result[i].brandName == brandName) {
                                selectedRes.result.push(res.result[i]);
                            }
                        };

                        if(price){
                            var arr = selectedRes.result;
                            selectedRes.result = [];
                            var min = parseInt(price.split("-")[0]);
                            var max = parseInt(price.split("-")[1]);

                            for (var i = 0; i < arr.length; i++) {
                                var currentPrice = parseInt(arr[i].productPrice.slice(1));
                                if (currentPrice <= max && currentPrice >= min) {
                                    selectedRes.result.push(arr[i]);
                                }
                           }
                        }
                    }
                     
                    //7.6 渲染模板
                    var html = template("itemlist",selectedRes);
                    $(".itemlist").html(html);

                     //7.7 计算总页数
                    totalpage = Math.ceil(selectedRes.result.length/res.pagesize);

                    //当为第一页的时候才加载下拉框模板
                    if(currentPage == 1){
                    //7.8  渲染分页模板
                        var pagehtml = template("pagenum",{totalpage:totalpage});
                        $(".current").html(pagehtml);
                    }

                    //将请求页的下拉框对应的option设置为selected,以便下拉框显示内容,用排除法将其他的设置为未被选中
                    $(".pageSelect").eq(pageid-1).attr("selected",true).siblings().attr("selected",false);

                    //返回顶部
                    document.body.scrollTop = document.documentElement.scrollTop = 0;

                    //7.9 调用关闭侧栏的函数
                    $("#my-button").click();

                });




                //3.4 渲染模板
                var html = template("itemlist",res);
                $(".itemlist").html(html);

                //3.5 计算总页数
                totalpage = Math.ceil(res.totalCount/res.pagesize);

                //当为第一页的时候才加载下拉框模板
                if(currentPage == 1){
                    //3.6 渲染分页模板
                    var pagehtml = template("pagenum",{totalpage:totalpage});
                    $(".current").html(pagehtml);
                }

                //将请求页的下拉框对应的option设置为selected,以便下拉框显示内容,用排除法将其他的设置为未被选中
                $(".pageSelect").eq(pageid-1).attr("selected",true).siblings().attr("selected",false);

                //返回顶部
                document.body.scrollTop = document.documentElement.scrollTop = 0;

                //3.6 设置侧栏的品牌模板
                //去除重复的品牌名称
                var brandArr = [];
                for(var i = 0; i < res.result.length; i++) {
                    for( var j = i+1 ; j < res.result.length; j++){
                        if(res.result[i].brandName == res.result[j].brandName ) {
                            j = ++i;
                        }
                    }
                    brandArr.push(res.result[i].brandName);
                }
                //将去重后的品牌名添加至响应体中
                res.brandArr = brandArr;
                //渲染数据至品牌模板
                var brand = template("brandName",{list:res.brandArr});
                $(".brandName").html(brand);

                //判断生成的a的数量,进行填充
                var aList = $("#menu .brandName a");
                if(aList.length%3 ==2){
                    var a = document.createElement("a");
                    $(a).addClass("hiddenpart");
                    $("#menu .brandName").append(a);
                };

                if(aList.length%3 ==1){
                    for(var i = 0; i < 2; i++){
                        var a = document.createElement("a");
                        $(a).addClass("hiddenpart");
                        $("#menu .brandName").append(a);
                    }
                };


                
            }
        })
    };

    //4.页面一开始显示第一页
    getItem(categoryId,1);

    //5.设置点击跳转至相应的商品页面
    $(".itemlist").on("tap",".item",function(){
        //5.2 将商品对应的id存放到sessionStorage中
        sessionStorage.setItem("productId",$(this).data("id"));
        //5.3 将分类对应的地址和分类名存放在sessionStorage中
        //5.3.1 存分类地址
        sessionStorage.setItem("category",$(".breadcrumb .active").html());
        //5.3 跳转至相应的商品详细页面
        location.href = "./productDetails.html";
    });


    //5.1 设置上一页的点击事件
    $(".previous").click(function(){
        if(currentPage == 1) {
            return;
        }else{
            getItem(categoryId,currentPage-1);
            
        }
    });
    
    //5.2 设置下一页的点击事件
    $(".next").click(function(){
        if(currentPage == totalpage){
            return;
        }else{
            getItem(categoryId,currentPage+1);
            

        }
    });

    //5.3 设置选择框的点击事件
    //下拉框的事件是注册在自身的,不是click,而是change
    $(".current").change(function(){

        getItem(categoryId,$(this).val());
    });

    //6.侧栏滑动(筛选)
    //6.1 配置侧栏的参数
    $("#menu").mmenu({
        "slidingSubmenus": false,
        "extensions": [
           "fx-menu-slide",//滑动效果
           "pagedim-black",//主内容显示为黑色
        //    "listview-60"
        ],
        //设置导航栏的内容
        "navbar": {
            "add":true,
            "title": "<span>筛选</span><a class='fa fa-times mui-pull-right' id='my-button'></a>"
        }
            
     });

     //6.2 配置API设置关闭侧栏
     var API = $("#menu").data( "mmenu" );
     $("#my-button").click(function() {
        API.close();
    });

    //8.侧栏的点击事件
    $("#menu .titlePart").on("click",".fa",function(){
        //8.1 点击箭头方向改变
        $(this).toggleClass("fa fa-angle-down").toggleClass("fa fa-angle-up");
        //8.2 隐藏起来
        if($(this).hasClass("fa fa-angle-up")){
            
            $(this).parent().next(".types").find("a").addClass("hiddenDiv").find('span').css('display','none');
    
        }else {
            $(this).parent().next(".types").find("a").removeClass("hiddenDiv").find('span').css('display','flex');
        }
    })
    
})
