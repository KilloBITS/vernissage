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
            "box-shadow": "rgba(255, 255, 0, 1) 0px 20px 140px 32px",
            "background": "rgb(237, 255, 0) url(https://avatanplus.com/files/resources/mid/583ac15f0f27d158a5835b56.png)",
            "background-size":"185px"
        });
    }
}, 80);

setInterval(function(){
  var blinkTime = randomInteger(1, 15);
  if (blinkTime > 14) {
      $(".thunders-image").show();
      $(".background-image").addClass('thunder');
      setTimeout(function(){
        $(".background-image").removeClass('thunder');
        $(".thunders-image").fadeOut(35);
      },220)
  }
},100);

function setModal(text){
  $('.modalBackground').fadeIn(400);
  $('.modalInfo').html(text);
  setTimeout(() => {
    $('.modalBackground').fadeOut(400);
  }, 3500);
};


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
      if(result.code === 500){
        indexObj.userDataObj = result.userDATA;
        $('.profile-block').show();
        $('.auth-block').hide();
      }else{
        $(".zab-pass").fadeIn(300);
        setModal(result.error)
      }
      $('#auth-loader').fadeOut();
    });
  });

  $(".toWorld").click(function(){
    console.log('to World click');
    let frame = document.createElement("iframe");
    frame.id = "gameFrame";
    frame.src = "/world";
    $("body").append(frame);
  });

};



let currentTimeAndDate = () => {
  setInterval(function(){
    var d = new Date();
    var month = new Array(12);
    month[0]="Январь";
    month[1]="Февраль";
    month[2]="Март";
    month[3]="Апрель";
    month[4]="Май";
    month[5]="Июнь";
    month[6]="Июль";
    month[7]="Август";
    month[8]="Сентябрь";
    month[9]="Октябрь";
    month[10]="Ноябрь";
    month[11]="Декабрь";
    $("#current-date").html(d.getDate() + ' ' + month[d.getMonth()] + ' ' + d.getFullYear());
    // let hour =
    if(d.getMinutes() <= 9){
      var minutes = "0"+d.getMinutes();
    }else{
      var minutes = d.getMinutes();
    }

    if(d.getMinutes() <= 9){
      let hour = "0"+d.getHours();
    }else{
      let hour = d.getHours();
    }

    $("#th").html(d.getHours());
    $("#tm").html(minutes);
    if($("#dt").hasClass("opacity0")){
      $('#dt').removeClass("opacity0");
    }else{
      $('#dt').addClass("opacity0");
    }
  },500);
};



$(document).ready(() => {
  indexObj.openedBottomPanel = false;
  buttons();
  currentTimeAndDate();

  var counter = 0;
  var c = 0;
  var i = setInterval(function(){
      $(".loading-page .counter h1").html(c + "%");
      $(".loading-page .counter hr").css("width", c + "%");
    counter++;
    c++;

    if(counter == 101) {
        clearInterval(i);
        $('.loading-page').fadeOut(350);
        $('#leftP').removeClass('pLoad');
        $('.big-logo').fadeIn(150);
        $('.auth-block').fadeIn(150);
        $('.BUTTON').fadeIn(400);
    }
  }, 1);
});
