'use strict';
var Index = {
   DESIGHN: function(){
     $(document).ready(function() {
         $('#list').click(function(event){
           event.preventDefault();
           $('#products .item').addClass('list-group-item');
         });
         $('#grid').click(function(event){
           event.preventDefault();
           $('#products .item').removeClass('list-group-item');
           $('#products .item').addClass('grid-group-item');
         });
     });

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
   TOVAR_CONSTRUCTOR: function(dataARR){
     console.log(dataARR)
   },
   LOAD_TOVAR: function(filter){
     if(filter){
       $.post('/tovar',filter,function(tov){
         Index.TOVAR_CONSTRUCTOR(tov);
       });
     }else{
       $.post('/tovar',function(tov){
         Index.TOVAR_CONSTRUCTOR(tov);
       });
     }
   },
   INIT: function(){
    Index.DESIGHN();
    Index.LOAD_TOVAR(false);
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
