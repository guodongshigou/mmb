$(function () {
    function brandlist() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrandtitle",
            type: 'GET',
            success: function (res) {
                console.log(res);
                var html = template('brandList', res);
                $('.list .mui-table-view').html(html);
            }
        })
    }
    brandlist();

    // 点击跳转下个页面
    $('.list').on('click', 'li', function () {
        var brand = $(this).text()
        brand = brand.split('十')[0];
        console.log(brand);
        localStorage.removeItem('brand');
        localStorage.setItem('brand', brand);
        var id = $(this).data('id');
        location.href = "brand.html?id=" + id;
    })
})