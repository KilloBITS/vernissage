'use strict';
var Index = {
   DESIGHN: function(){
     $('.menu-wrapper').on('click', function() {
       $('.hamburger-menu').toggleClass('animate');
       $('.twoLine').toggleClass('openMenuClass');
     })

    $( ".menuBTN" ).hover(function() {
      let ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');

      if(ML != undefined){
        $("."+ML+",.opensMenu").show();
      }
    }, function(){
      let ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');

      // $('body').on("mousemove", function(e){
        // if(e.target.offsetParent.className != 'opensMenu'){
          $("."+ML+",.opensMenu").hide();
        // }
      // });
    });


   },
   INIT: function(){
    Index.DESIGHN();
   }
}

$(document).ready(() => {
  Index.INIT();
});

// $(window).load(function() {
//   // $('.post-module').hover(function() {
//   //   $(this).find('.description').stop().animate({
//   //     height: "toggle",
//   //     opacity: "toggle"
//   //   }, 300);
//   // });
// });
