var ML;

var AUTH = {
  DESIGHN: function(){
    $('.signup-slider').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    });

    $("img").height($(".main-box").height());

    $(".to-signin").on("click", function () {
      $(this)
        .addClass("top-active-button")
        .siblings()
        .removeClass("top-active-button");
      $(".form-signup").slideUp(500);
      $(".form-signin").slideDown(500);
    });

    $(".to-signup").on("click", function () {
      $(this)
        .addClass("top-active-button")
        .siblings()
        .removeClass("top-active-button");
      $(".form-signin").slideUp(500);
      $(".form-signup").slideDown(500);
    });

    $(".to-signin-link").on("click", function () {
      $(".to-signin")
        .addClass("top-active-button")
        .siblings()
        .removeClass("top-active-button");
      $(".form-signup").slideUp(200);
      $(".form-signin").slideDown(200);
    });

    $(".to-signup-link").on("click", function () {
      $(".to-signup")
        .addClass("top-active-button")
        .siblings()
        .removeClass("top-active-button");
      $(".form-signin").slideUp(200);
      $(".form-signup").slideDown(200);
    });

    $(".searchBlock").hover(function(){
      $(".searchLine").css({"width":"170px"});
    });
    $('.menu-wrapper').on('click', function() {
      $('.hamburger-menu').toggleClass('animate');
      $('.twoLine').toggleClass('openMenuClass');
    })
    $( ".menuBTN" ).hover(function() {
     try{
       $("."+ML+",.opensMenu").hide();
     }catch(e){
       console.warn('Есть небольшой конфликт, но это не критично')
     }
     ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');
     if(ML != undefined){
       $("."+ML+",.opensMenu").show();
     }
    }, function(e){
     ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');
         $( ".opensMenu" ).hover(function() {}, function(e){
               $("."+ML+",.opensMenu").hide();
         });
    });
  },
  POST_AUTH: function(){
    $(".backet_load").fadeIn(200);
    let ld = {
      login: $("#login").val(),
      password: $("#pass").val()
    };

    $.post('/auth',ld,function(res){      
      if(res.code === 500){
        window.location.replace("/profile");
      }
    });
  },
  INIT: function(){
    AUTH.DESIGHN()
  }
};




$(document).ready(function(){
  AUTH.INIT();
});
