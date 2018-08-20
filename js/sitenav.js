$(function() {
    function render () {
        $.ajax({
            url: "http://mmb.ittun.com/api/getsitenav",
            type: "GET",
            success: function(res) {
                console.log(res);
                var str = template("navlist",res);
                $(".main").html(str);
            }
        })
    }
    render ();
});
