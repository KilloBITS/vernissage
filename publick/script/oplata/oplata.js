'use strict';
var Oplata = {
    ML:"",
   DESIGHN: function(){

     $(".searchBlock").hover(function(){
       $(".searchLine").css({"width":"170px"});
     });

     $('body').click(function(e){
       if(e.target.className != 'searchBlockVal' && $('#SEARCH').val().length === 0){
         $(".searchLine").css({"width":"0px"});
       }
     });

     $('.menu-wrapper').on('click', function() {
       $('.hamburger-menu').toggleClass('animate');
       $('.twoLine').toggleClass('openMenuClass');
     })

    $( ".menuBTN" ).hover(function() {
      try{
        $("."+Oplata.ML+",.opensMenu").hide();
      }catch(e){
        console.warn('Есть небольшой конфликт, но это не критично')
      }
      Oplata.ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');
      if(Oplata.ML != undefined){
        $("."+Oplata.ML+",.opensMenu").show();
      }
    }, function(e){
      Oplata.ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');
          $( ".opensMenu" ).hover(function() {}, function(e){
                $("."+Oplata.ML+",.opensMenu").hide();
          });
    });


   },
   INIT: function(){
    Oplata.DESIGHN();
   }
}

$(document).ready(() => {
  Oplata.INIT();
});
$(document).ready(function(){
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
});
