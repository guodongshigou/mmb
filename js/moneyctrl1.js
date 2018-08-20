$(function () {


    var prodata = {
        "categoryid": 1,
        "pageid": 1,
    }


    // crumbs(prodata.categoryid);
    //渲染商品列表
    var titalpagenum = 0;
    function categoryList(prodata) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            data:prodata,
            typedata: "json",
            success: function (res) {
                var htmlstr = template("product", res);
                $(".main ul").html(htmlstr);
                //商品总条数
                //totalCoundtdata.totalCount;
                //每页显示商品的条数
                //data.pagesize;
                //商品总显示页数
                var pageing = res.totalCount / res.pagesize;
                //将当前页和总页数渲染到页面
                titalpagenum= Math.ceil(pageing);
                $("#pagenum").html(prodata["pageid"] + "/" +titalpagenum);
                Math.ceil
            }
        });
    }
    categoryList(prodata);


    // 点击翻页按钮进行翻页；
    // 传进来的值为:categoryid ： 分类id  ( Number类型)，
    //pageid :  页数id   ( Number类型);
    //上一页
    $('.mui-previous').click(function (e) {
        // e.defaultPrevented;
        if (prodata["pageid"] <= 1) {
            prodata["pageid"] = 1;
            return;
        } else {
            prodata["pageid"] -= 1;
            categoryList(prodata)
        }
        // pagenum( prodata["pageid"],pageing);


    });
    //下一页
    $('.mui-next').click(function () {
        if (prodata["pageid"] >= titalpagenum) {
            prodata["pageid"] = titalpagenum;
            return;
        } else {
            prodata["pageid"] += 1;
            categoryList(prodata)
        }

    });



})
