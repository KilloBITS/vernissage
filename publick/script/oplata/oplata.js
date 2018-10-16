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
