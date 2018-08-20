$(function () {
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



    

    








});