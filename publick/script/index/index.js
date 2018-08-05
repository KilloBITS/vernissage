'use strict';
var indexObj = new Object();
var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

setInterval(function () {
    var blinkTime = randomInteger(1, 15);
    if (blinkTime > 12) {
        $(".lum-r .light").css({
            "box-shadow": "none",
            "background": "rgba(83, 86, 55, 0.78)"
        });
    } else {
        $(".lum-r .light").css({
            "box-shadow": "rgb(255, 90, 24) 0px 20px 90px 18px",
            "background": "rgb(255, 0, 0)"
        });
    }
}, 80);

let buttons = () => {
  $('.nev-btn').click(function () {
    let index = $('.nev-btn').index(this);
    $('.nev-btn').removeClass('btnAct');
    $('.nev-btn:eq('+index+')').addClass('btnAct');
    $('.data-block').css({'bottom':'-100%'});
    $('.data-block:eq('+ index +')').css({'bottom':'0%'});
  });

  $('.arrow-page').click(function(){
    //blockTopNavPanel
    //arrow-page
    //8px 8px 14px -4px black
    if(indexObj.openedBottomPanel){
      $('.blockTopNavPanel').css({"height":"30px"});
      $('.arrow-page').css({
        "transform":"translate(-50%, 0) rotate(45deg)",
        "box-shadow":"-8px -8px 14px -4px black"
      });
      indexObj.openedBottomPanel = false;
    }else{
      $('.blockTopNavPanel').css({"height":"190px"});
      $('.arrow-page').css({
        "transform":"translate(-50%, 0) rotate(225deg)",
        "box-shadow":"8px 8px 14px -4px black"
      });
      indexObj.openedBottomPanel = true;
    }
  });

  $('#btnAuth').click(() => {
    $('#auth-loader').fadeIn(100);
    let l = $('#login-data input').val();
    let p = $('#pass-data input').val();
    $.post('/auth',{login:l, password:p}, function(result){
      let result_data = JSON.parse(result);
      console.log(JSON.parse(result))
      if(result_data.code === 500){
        indexObj.userDataObj = result_data.userDATA;
        $('.profile-block').show();
        $('.auth-block').hide();

      }else{

      }

      $('#auth-loader').fadeOut();
    });
  });
};




$(document).ready(() => {
  indexObj.openedBottomPanel = false;
  buttons();
});
