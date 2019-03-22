'use strict';
var BASKET = [];
var toPage;
var TOVAR = {
  sendMyEmail: function(){
    $("#input-submit").val('Отправка сообщения').css({"background-image":"../../../image/loaders/load2.gif"});
    $.post('/getMessagesFromTovar',{
      a: $("#inputPodpiska").val()
    }, function(res){
      if(res.code === 50){
        createAlert('','Спасибо за подписку!','Теперь вы будете получать все новости о товарах.','success',true,true,'pageMessages');
      }else{
        createAlert('','Вы уже подписаны!','Вы уже получаете новости о наших товарах.','info',true,true,'pageMessages');
      }      
    });
  },
  DESIGHN: function(){
    $(".dropdown").click(function(){
      $(".menu").toggleClass("showMenu");
      $(".menu > li").click(function(){
        $(".dropdown > p").html($(this).html());
        $(".menu").removeClass("showMenu");
      });
    });
    $(".filtersBtn").click(function(){
      if($(".filtersBtn").hasClass('activeFilter')){
       $(".filtersBtn").removeClass('activeFilter');
       $(".filters").slideToggle();
     }else{
       $(".filtersBtn").addClass('activeFilter');
       $(".filters").slideToggle();
     }
   });
    $(".half,.full").click(function(){
     var tovID = $(this).attr("tovid");
     var setStar = $(this).attr("for").split('_')[0].replace(/[^-0-9]/gim,'');
     $.post("/setStars",{id: tovID, ss: setStar},function(d){
       console.log(d)
     });
   });  
    $(".input-login").each(function() {
     if ($(this).val() != "") {
       $(this).parent().addClass("animation");
     }
   });

    $(".login-input").focus(function(){
     $(this).parent().addClass("animation animation-color");
   });

    $(".login-input").focusout(function(){
     if($(this).val() === "")
       $(this).parent().removeClass("animation");
     $(this).parent().removeClass("animation-color");
   })

    $('#list').click(function(event){
     event.preventDefault();
     $('#products .item').addClass('list-group-item');
   });
    $('#grid').click(function(event){
     event.preventDefault();
     $('#products .item').removeClass('list-group-item');
     $('#products .item').addClass('grid-group-item');
   });
  },
  INIT: function(){
    TOVAR.DESIGHN();
  }
}

$(document).ready(() => {
  TOVAR.INIT();
});
