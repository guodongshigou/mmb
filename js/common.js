$(function () {
    //设置rem大小
    document.querySelector('html').style.fontSize = screen.width / 10 + 'px';
    if(screen.width > 768){
        document.querySelector('html').style.fontSize = '76.8px';
    }

    //局部滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //返回键点击事件
    $('.back').click(function(){
        history.back();
    });

    //底部点击返回顶部事件
    $('.fixed, .top').click(function () {        
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });


    
});