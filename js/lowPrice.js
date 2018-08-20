<<<<<<< HEAD
$(function(){
=======
$(function () {
<<<<<<< HEAD
=======
>>>>>>> 12ea3259b169bd1de6f0db865ae4194b6bba0a3d
    document.querySelector('html').style.fontSize = screen.width / 10 + 'px';
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

<<<<<<< HEAD




=======
>>>>>>> 4c4fc012a7f1fa0e9692f0dba8f92c73513c8293
    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        type: 'get',
        dataType: 'json',
        success: function (res) {
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
                var html = template('productTpl', {
                    list: res.result
                });
                $('.goodList ul').html(html);
            }
        });
    }



    

<<<<<<< HEAD
    
=======
    $('.back').click(function(){
        history.back();
    });
>>>>>>> 12ea3259b169bd1de6f0db865ae4194b6bba0a3d





>>>>>>> 4c4fc012a7f1fa0e9692f0dba8f92c73513c8293



<<<<<<< HEAD



});


=======
});
>>>>>>> 12ea3259b169bd1de6f0db865ae4194b6bba0a3d
