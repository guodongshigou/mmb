$(function () {
    // 过去地址栏id;
    var id = location.href;
    id = id.split('?')[1];
    id = id.split('=')[1];
    console.log(id);


    // ajax请求
    function product(brandtitleid, pagesize, pages, val) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbrandproductlist',
            type: 'GET',
            data: { brandtitleid: brandtitleid, pagesize: pagesize },
            success: function (res) {
                var pagesize = res.result.length;
                var lengths = 3;
                var pageLength = Math.ceil(res.totalCount / lengths);
                var page = [];
                for (var i = 1; i <= pageLength; i++) {
                    page.push(Number(i));
                }
                res.page = page;
                var result = res.result;
                // console.log(pages);
                // console.log(lengths);
                result = result.slice(pages * lengths, (pages + 1) * lengths)

                // console.log(result);
                res.result = result;
                res.pages = pages;
                console.log(res);
                var html = template('product', res);
                $('.main').html(html);
                $('select').val(val);
                var titText = localStorage.getItem('brand');
                $('.titText').html(titText+"产品销量排行");
            }
        })
    }
    // 调用渲染
    product(id, Infinity, 0, 1);

    // 上一页
    $('.main').on('click', '#btn1', function () {
        var val = $('#select').val();
        if (val > 1) {
            $('#select').val(val - 1);
            var val = Number($('#select').val());
            var length = val - 1;

            product(id, Infinity, length, val);
        }
    })
    // 下一页
    $('.main').on('click', '#btn2', function () {
        var val = Number($('#select').val());
        if (val < $('option').length) {
            $('#select').val(Number(val) + 1);
            var val = Number($('#select').val());
            var length = val - 1;

            product(id, Infinity, length, val);
        }
    })
    // 值改变事件
    $('.main').on('change', '#select', function () {
        var val = Number($(this).val());
        var length = val - 1;
        product(id, Infinity, length, val);
    })


    // 跳转
    $('.main').on('click', 'li', function () {
        var productId = $(this).data('productid');
        var img = $(this).find('img').attr('src');
        var productName = $(this).find('.text').text();
        localStorage.removeItem('name');
        localStorage.setItem('name', productName);
        location.href = 'details.html?productId=' + productId + "&img=" + img;

    })

})