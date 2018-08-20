$(function(){
    // 页面打开,发送ajax请求获取优惠券列表数据并渲染
    function getcoupon(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getcoupon",
            type: "GET",
            success: function(obj){
                // console.log(obj);
                // 渲染页面
                var htmlStr = template("coupontpl", {list: obj.result});
                $('.main .couponbrands').html(htmlStr);       
            }
        })
    }

    getcoupon();


    // 点击优惠券标题,跳转到对应的优惠券列表页面,把couponid(优惠券标题id)加到url
    $('.couponbrands').on('click','a',function(){
        // console.log("a");
        var couponid = $(this).data("id");
        window.location.href = "./couponproduct.html?couponId="+couponid;
        return false;
    })

    // 区域滚动,调用MUI的scroll方法
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });

    
})