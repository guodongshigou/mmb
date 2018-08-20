$(function () {
    // 拿到地址栏的id
    // var arr = location.href.split("?").pop().split("&");
    // console.log(arr);
    // var query = {};

    var urlId = location.href.split("=").pop();

    // 发送ajax请求,获取优惠券详情数据并渲染页面
    function getcouponproducts(cid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getcouponproduct",
            type: "GET",
            data: { couponid: cid },
            success: function (obj) {
                console.log(obj);
                // 渲染页面
                var htmlStr = template("couponlists", { list: obj.result });
                $('.main .couponproducts').html(htmlStr);
            }
        })
    }

    getcouponproducts(urlId);

    // 点击某一优惠券事件,弹出遮罩层
    $('.couponproducts').on('click', '.couponproduct', function () {
        // 通过自定义属性,优惠券图片
        var res = $(this).data('pic');
        console.log(res);
        $.ajax({
            url: "http://mmb.ittun.com/api/getcouponproduct",
            type: "GET",
            data: { couponid: urlId },
            success: function (obj) {
                // console.log(obj);
                var html = template('picslide', { list: obj.result });
                $('.swiper-wrapper').html(html);

                // 显示遮罩层及内容
                $('.bg').show();
                $('.lb').show();

                // 轮播图生效
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    parallax: true,
                    speed: 600,
                    observer: true,//调完接口不能翻页解决方法，修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//调完接口不能翻页解决方法，修改swiper的父元素时，自动初始化swiper
                    onSlideNextEnd: function (swiper) {
                        sow()
                    },
                    onSlidePrevEnd: function (swiper) {
                        sow()
                    }
                });

                // 遮罩层及内容隐藏
                $('.bg').click(function(){
                    $('.lb').hide();
                    $('.bg').hide();
                })
            }
        })
    })

    // 区域滚动,调用MUI的scroll方法
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });

})