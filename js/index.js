$(function(){
    document.querySelector('html').style.fontSize = screen.width / 10 + 'px';
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //渲染首页nav
    function getmenu(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getindexmenu",
            type: "GET",
            success: function(res){
                console.log(res);
                var htmlStr = template("getmenu", {list : res.result});
                $(".nav").html(htmlStr);
            }
        });
    }
    getmenu();

    //  找到更多,点击更多才会显示第三行
    $(".nav").on("click","a:eq(7)",function(){
        if($(".nav a:nth-child(n+9)").hasClass("active")){
            $(".nav a:nth-child(n+9)").removeClass("active");
            $(".nav a:nth-child(n+9)").addClass("activeout")
        }else{
            $(".nav a:nth-child(n+9)").removeClass("activeout");
            $(".nav a:nth-child(n+9)").addClass("active")
        }
        return false;
    })


    var totalCount = 0;
    var pageSize = 0;

    // 渲染商品详情
    function getproductLists(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: "GET",
            success: function(res){
                console.log(res);
                // 商品渲染
                var htmlStr = template("getproductLists", {data : res.result});
                $(".productLists").html(htmlStr);

                // 一,分页渲染
                // 1.总商品数,每页大小
                // totalCount = res.totalCount;
                // pageSize = res.pagesize;
                // // 总页数pageNum
                // var pageNum = Math.ceil(totalCount/pageSize);
                // res["pageNum"] = pageNum;

                // // 2.把当前页面的取值范围遍历出来存在数组中
                // var numArr = [];
                // for(var i=1;i<=pageNum; i++){
                //     numArr.push(Number(i));
                // }

                // res["numArr"] = numArr;
                // console.log(res);
                // var htmlPage = template("pageTemplate", {pageData : res.numArr});
                // console.log(htmlPage);
                // $(".footer .pager").html(htmlPage);
            }
        })
    }

    getproductLists();

    // 跳转到国内详情页
    $(".productLists").on("click","li",function(){
        // 获取该商品的自定义id
        // var productId = $(this).data("id");
        window.location.href = "./inlanddiscount.html?productId="+$(this).data("id");
    })

    // 返回顶部
    $(".footer .back").click(function(){
        // alert("ggg");
        $('body,html').animate({scrollTop: 0 }, 200);
    })
    
});


