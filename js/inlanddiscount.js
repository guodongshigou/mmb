$(function () {
    function getinlanddiscount() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getinlanddiscount",
            type: "GET",
            success: function (res) {
                console.log(res);
                var htmlStr = template("getland", { list: res.result })
                $(".main").html(htmlStr);
            }

        })
    }
    getinlanddiscount();

    $('.main').on('click', '.chanping', function () {
        var id = $(this).data('id');
        location.href = "moneyctrl.html?productId="+id;
    })

});