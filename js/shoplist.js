$(function() {
    var data = {};
    function render(id,pe) {
        data = {categoryid:id,pageid:pe};
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "GET",
            data: data,
            success: function(res) {
                console.log(res);
                var htmlstr = template("numlist",{list:res.result});
                console.log(htmlstr);
                $(".productinfo").html(htmlstr);
            }
        })
    }
    render(3,2);
    // render(query.categoryid ,query.pageid );
});
// 拿到URL地址
var urlstr = window.location.href;
// console.log(urlstr);
// var query = urlTool(urlstr);

