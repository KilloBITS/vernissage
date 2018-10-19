'use strict';
var BASKET = [];

var Details = {
   UPDATE_BASCET: function(){
     $('.basket_doc').remove();
     $("#basketDATA").fadeIn(300);
     $("body").css({"overflow":"hidden"});
     $.post('/getbasket',{data:BASKET},function(tovar){
       for(let i = 0; i < tovar.tovar.length; i++){
         var newDiv = document.createElement("div");
         newDiv.className = "basket_doc";
         $(".basket_tovar").append(newDiv)

         var minBasImg = document.createElement("div");
         minBasImg.style.backgroundImage = "url(../../../data/tovar/"+tovar.tovar[i].image+")";
         minBasImg.className = "minBasImg";

         var minBasTitle = document.createElement("div");
         minBasTitle.innerHTML = tovar.tovar[i].title;
         minBasTitle.className = "minBasTitle";

         var minAllSum = document.createElement("div");
         minAllSum.className = "minAllSum";

         var minBasLength = document.createElement("div");
         minBasLength.className = "minBasLength";

         var minBasDel = document.createElement("div");
         minBasDel.onclick = function(){
           let index = $(".minBasDel").index(this);
           BASKET.splice(index, 1);
           localStorage.setItem("VernissageBasket", BASKET);
           $(".basketBlock span").html(BASKET.length);
           $(this).parent().remove();

           if(BASKET.length === 0){
             $(".backet_load").show();
             $("body").css({"overflow":"auto"});
             $("#basketDATA").fadeOut(300);
           }

         };
         minBasDel.className = "minBasDel";

         $(newDiv).append(minBasImg);
         $(newDiv).append(minBasTitle);
         $(newDiv).append(minAllSum);
         $(newDiv).append(minBasLength);
         $(newDiv).append(minBasDel);
       }
       $(".backet_load").hide();
     });
   },
   DESIGHN: function(){
     $(".half,.full").click(function(){
       var tovID = $(this).attr("tovid");
       var setStar = $(this).attr("for").split('_')[0].replace(/[^-0-9]/gim,'');

       $.post("/setStars",{id: tovID, ss: setStar},function(d){
         console.log(d)
       });
     });
     $(".basketBlock").click(function(){
       if(BASKET.length >= 1){
         Details.UPDATE_BASCET();
       }else{
         createAlert('','','Ваша корзина пуста :(','warning',false,true,'pageMessages')
       }
     });
     $(".basket_close").click(function(){
       $(".backet_load").show();
       $("body").css({"overflow":"auto"});
       $("#basketDATA").fadeOut(300);
     });
     $( document ).ready(function() {
       $(".input-login").each(function() {
         if ($(this).val() != "") {
           $(this).parent().addClass("animation");
         }
       });
     });
     $(".login-input").focus(function(){
       $(this).parent().addClass("animation animation-color");
     });
     $(".login-input").focusout(function(){
       if($(this).val() === "")
         $(this).parent().removeClass("animation");
       $(this).parent().removeClass("animation-color");
     })
     $(".btn-success").click(function(){

     });
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
       try{
         $("."+Details.ML+",.opensMenu").hide();
       }catch(e){
         console.warn('Есть небольшой конфликт, но это не критично')
       }
       Details.ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');
       if(Details.ML != undefined){
         $("."+Details.ML+",.opensMenu").show();
       }
     }, function(e){
       Details.ML = $(".menuBTN:eq("+$(".menuBTN").index(this)+")").attr('menu-link');
           $( ".opensMenu" ).hover(function() {}, function(e){
                 $("."+Details.ML+",.opensMenu").hide();
           });
     });
   },
   BASKET: function(){
     if(localStorage.getItem('VernissageBasket') !== null){

       let MY = localStorage.getItem("VernissageBasket").split(",");
       if(MY[0] !== ""){
         $(".basketBlock span").html(MY.length);
         BASKET = MY;
       }
     }
   },
   setBasket: function(ind){
     if(BASKET.indexOf(ind.toString()) === -1){
       BASKET.push(ind.toString());
       localStorage.setItem("VernissageBasket", BASKET);
       $(".basketBlock span").html(BASKET.length);

     }else{
       createAlert('','','Такой товар уже есть в вашей корзине!','warning',false,true,'pageMessages');
     }
   },
   INIT: function(){
    Details.DESIGHN();
    Details.BASKET();
   }
}

$(document).ready(() => {
  Details.INIT();
});
