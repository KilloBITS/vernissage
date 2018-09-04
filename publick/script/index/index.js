'use strict';
var IndexInit = {
  indexObj: new Object(),
  t: 0,
  USER:"",
  randomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
  },
  setModal: function (text){
    $('.modalBackground').fadeIn(400);
    $('.modalInfo').html(text);
    setTimeout(() => {
      $('.modalBackground').fadeOut(400);
    }, 3500)
  },
  getCook: function (cookiename) {
      // Get name followed by anything except a semicolon
      var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
      // Return everything after the equal sign, or an empty string if the cookie name not found
      return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
  },
  loadUsers: function(data){
    console.log(JSON.parse(data));
    IndexInit.USER = JSON.parse(data);

    $(".nick-name-block").html('<span>'+GlobalObj.PARSE_RANC(IndexInit.USER.rank)+'</span>'+IndexInit.USER.nick);
  },
  initFunction: function(){
    $.post('/init', function (result) {
       if (result.code === 500) {
           IndexInit.loadUsers(result.userDATA);
       }
    });
  },
  authFunction: function(l, p){
    $.post('/auth',{login:l, password:p}, function(result){
      if(result.code === 500){
        IndexInit.indexObj.userDataObj = result.userDATA;
        IndexInit.loadUsers(result.userDATA);
        $('.profile-block').show();
        $('.auth-block').hide();
      }else{
        $(".zab-pass").fadeIn(300);
        setModal(result.error)
      }
      $('#auth-loader').fadeOut();
    });
  },
  desighnFunction: function(){
    if(screen.width > 800){
      setInterval(function(){

          $(".thunders-image").show();
          $(".background-image").addClass('thunder');

          setTimeout(function(){
            t++;
            $(".background-image").removeClass('thunder');
            $(".thunders-image").fadeOut(35);
            var audio = new Audio();
            audio.preload = 'auto';
            audio.src = '../../../audio/thunder'+t+'.mp3';
            audio.play();

            if(t >= 4){
              t = 0;
            }
          },220)
      },15000);
    }

    setInterval(function () {
        var blinkTime = IndexInit.randomInteger(1, 15);
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
  },
  buttonsClicked: function(){
    $('.nev-btn').click(function () {
      let index = $('.nev-btn').index(this);
      $('.nev-btn').removeClass('btnAct');
      $('.nev-btn:eq('+index+')').addClass('btnAct');
      $('.data-block').css({'bottom':'-100%'});
      $('.data-block:eq('+ index +')').css({'bottom':'0%'});
    });

    $('.arrow-page').click(function(){
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
      IndexInit.authFunction(l,p);
    });

    $(".toWorld").click(function(){
      console.log('to World click');
      let frame = document.createElement("iframe");
      frame.id = "gameFrame";
      frame.src = "/world";
      $("body").append(frame);
    });

  },
  mobile: function(){
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

          if(screen.width < 800){
            document.addEventListener('touchmove', function(event) {
              event.stopPropagation();
              var clientY = event.touches[0].clientY;
              var opened = $(document).height() - clientY;
              if(event.path[0].className.split(' ')[0] === "drag-menu-btn"){
                $(".mobileP").css({
                  "height": opened + "px"
                });
              }
            }, false);

            document.addEventListener('touchend', function(event) {
              event.stopPropagation();
              var clientY = event.changedTouches[0].clientY;
              if(event.path[0].className.split(' ')[0] === "drag-menu-btn"){
                if(parseInt(clientY) < (screen.height / 2)){
                  $(".mobileP").css({
                    "height": $(document).height() + "px"
                  });
                  $("#DrMaD").addClass('transit');
                }
                if(parseInt(clientY) > ($(document).height() / 2)){
                  $(".mobileP").css({
                    "height": 0 + "px"
                  });
                  $("#DrMaD").removeClass('transit');
                }
              }
            }, false);
          }
      }
    }, 1);
  },
  currentTimeAndDate: function(){
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
  }
}

$(document).ready(() => {
  IndexInit.indexObj.openedBottomPanel = false;
  IndexInit.buttonsClicked();
  IndexInit.mobile();
  IndexInit.currentTimeAndDate();
});
