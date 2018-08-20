$(function () {
    // 获取productId;
    var productId = location.href;
    productId = productId.split('?')[1];
    productId = productId.split('&');
    var obj = {};
    for (var i = 0; i < productId.length; i++) {
        var id = productId[i].split('=');
        console.log(id);
        obj[id[0]] = id[1];
    }
    console.log(obj);


    $('.nav .left img').attr("src", obj.img);
    var producName = localStorage.getItem('name');
    console.log();
    $('.nav .right').html(producName);
    var titText=localStorage.getItem('brand');
    $('.titText').html(titText+"最新评论");



    // 发起ajax请求
    function details() {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductcom',
            type: 'GET',
            data: { productid: obj.productId },
            success: function (res) {
                console.log(res);
                var html = template('details', res);
                $('.main').html(html);
            }
        })
    }

    // 执行函数调用数据;
    details();




})