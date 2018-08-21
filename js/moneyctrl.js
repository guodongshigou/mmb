$(function () {
    function getdiscountproduct(id) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getdiscountproduct",
            type: "GET",
            data: { productid: id },
            success: function (res) {
                console.log(res.result[0]);
                var html = template('tep', res);
                $('.main').html(html);
            }

        })
    }


    var href = location.href;
    if(href.indexOf("?") != -1) {
        href = href.split('?')[1];
    }else {
        href = "pageid=1";
    }
    href = Number(href.split('=')[1]);
    
    // console.log(href);

    getdiscountproduct(href);





})