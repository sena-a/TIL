
// item.addClass('icon-plus');
$(document).ready(function () {
     // 뷰포트 사이즈를 최대 999px 설정하여 변수에 해당 값을 할당
     var viewport = window.matchMedia('(max-width:999px)');
     // resize 이벤트 발생 시 새로고침 실행
     $(window).resize(function(){
       location.reload();
     });

if(viewport.matches){
var btn = $('.btn-menu');
var nav = $('.navigation');
var item = $('.menu-item');
var sub = $('.sub-menu');

btn.click(function(){
    nav.toggleClass('menu-act');
    item.addClass('icon-plus');
});

item.on('click', function(){
    $(this).toggleClass('menu-item-act');
    $(this).siblings().removeClass('menu-item-act').addClass('icon-plus');
    if($(this).hasClass('menu-item-act')){
        $(this).removeClass('icon-plus').addClass('icon-minus');
    }else{
        $(this).addClass('icon-plus').removeClass('icon-minus');
    }
});
}
});

