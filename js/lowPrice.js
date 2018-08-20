<<<<<<< HEAD
$(function(){
=======
$(function () {
>>>>>>> 12ea3259b169bd1de6f0db865ae4194b6bba0a3d
    document.querySelector('html').style.fontSize = screen.width / 10 + 'px';
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

<<<<<<< HEAD




=======
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log(res);

            var html = template('topNavTpl', {
                list: res.result
            });
            $('.mui-scroll').html(html);
            render($('.mui-scroll a').eq(0).data('titleid'));
        }
    });

    $('.mui-scroll').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        render($(this).data('titleid'));
    });


    function render(tid) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data: {
                titleid: tid
            },
            type: 'get',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var html = template('productTpl', {
                    list: res.result
                });
                $('.goodList ul').html(html);
            }
        });
    }



    $('.fixed, .top').click(function () {        
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    $('.back').click(function(){
        history.back();
    });
>>>>>>> 12ea3259b169bd1de6f0db865ae4194b6bba0a3d








<<<<<<< HEAD



});


=======
});
>>>>>>> 12ea3259b169bd1de6f0db865ae4194b6bba0a3d
