$(function () {

    var id=location.href;
    id=id.split('?')[1];
    id=id.split('=')[1];

    var titText=localStorage.getItem('brand');
    $('.titText').html(titText+"哪个好");
    function brand(id){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbrand',
            type: 'GEt',
            data: {brandtitleid:id},
            success: function (res) {
                var html=template('brand',res);
                $('.main .mui-table-view').html(html);
            }
        })
    }
    brand(id);
    $('.mui-table-view').on('click','li',function(){
        var id=$(this).data('id');
        location.href="product.html?brandTitleId="+id;
    })
})