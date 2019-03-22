'use strict';
var BASKET = [];


var Details = {
  DESIGHN: function(){
    var amount = document.getElementsByClassName('current-amount');
    var changes = document.getElementsByTagName('i');
    function changeAmount() {
      if(this.className.includes('minus') && amount[0].textContent > 0) {
        amount[0].textContent--;
      }else if(this.className.includes('plus')) {
        amount[0].textContent++;
      }
    }
    for(var i = 0; i < 2; i++) {
      changes[i].addEventListener('click', changeAmount, false);
    }

    $(".sizeBTN").click(function(){
      // let id = $(this).attr('id')
      // console.log(id);
      $(".sizeBTN").removeClass('size_a');
      $(this).addClass('size_a');
    });
    $(".btnTableSizes").click(function(){
      $(".content.tovar").css({
        "filter":"blur(5px) grayscale(100%)"
      });
      $("#modalSizes").fadeIn(300);
    });
    $("#closeTableSizes").click(function(){
      $(".content.tovar").css({
        "filter":"blur(0px) grayscale(0%)"
      });
      $("#modalSizes").fadeOut(300);
    });

    $(".setComments").click(function(){
      $.post('/newComment',{text: $("#commentsText").val(), tovai: $("#commentsText").attr("tov_AI") }, function(res){
        console.log(res);
        if(res.code === 500){
          var newCommebtData = '<div class="comment-wrap"> <div class="comment-block"><p class="comment-text">'+res.msg.text+'</p><div class="bottom-comment"><div class="comment-date">'+res.msg.author+'</div></div></div></div>';
          $('.comments .comment-wrap:eq(0)').after(newCommebtData);
          $("#commentsText").val("");
        }else{
          createAlert('','Ошибка 403','нет доступа','success',true,true,'pageMessages');
        }
      });
    });
     $(".half,.full").click(function(){
       var tovID = $(this).attr("tovid");
       var setStar = $(this).attr("for").split('_')[0].replace(/[^-0-9]/gim,'');
       console.log({id: tovID, ss: setStar})
       $.post("/setStars",{id: tovID, ss: setStar},function(d){
         createAlert('','Ваш голос принят!','','success',true,true,'pageMessages');
       });
     });     
     
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
  INIT: function(){
    Details.DESIGHN();
   }
}



var createAnimCanvasDetails = function(){
  var mycode = function() {

  var pad = scrawl.pad.canvas,
    base = scrawl.cell[pad.base],
    display = scrawl.cell[pad.display],
    canvas = scrawl.canvas[pad.name],
    actionCell,
    hitCell,
    hitGroup,
    magnifier,
    moveMagnifier,
    border = 200,
    here, ratioX, ratioY, x, y,
    offsetX, offsetY,
    currentPin = false,
    choke = true,
    anim;

  scrawl.getImagesByClass('demopic');

  pad.makeCurrent();

  actionCell = pad.addNewCell({
    name: 'demo10_actionCell',
    width: (base.actualWidth + border) * 2,
    height: (base.actualHeight + border) * 2,
    shown: false
  });

  hitCell = pad.addNewCell({
    name: 'demo10_hitCell',
    width: base.actualWidth,
    height: base.actualHeight,
    showOrder: 2
  });
  hitGroup = scrawl.makeGroup({
    name: 'demo10_pins',
    cell: hitCell.name
  });

  scrawl.makePicture({
    name: 'demo10_actionBackground',
    source: 'kitchenLarge',
    copyWidth: '100%',
    copyHeight: '100%',
    pasteWidth: base.actualWidth * 2,
    pasteHeight: base.actualHeight * 2,
    startX: 'center',
    startY: 'center',
    handleX: 'center',
    handleY: 'center',
    group: 'demo10_actionCell',
    order: 0
  });

  scrawl.makePicture({
    name: 'demo10_background',
    source: 'kitchenSmall',
    width: '100%',
    height: '100%',
    globalCompositeOperation: 'destination-over',
    order: 2
  });

  magnifier = scrawl.makePicture({
    name: 'demo10_magnifier',
    source: 'demo10_actionCell',
    copyWidth: base.actualWidth * 2 * 0.15,
    copyHeight: base.actualHeight * 2 * 0.3,
    width: '30%',
    height: '60%',
    handleX: 'center',
    handleY: 'center',
    pivot: 'demo10_magnifierStencil',
    globalCompositeOperation: 'source-in',
    order: 1
  });

  scrawl.makeWheel({
    name: 'demo10_magnifierStencil',
    pivot: 'mouse',
    radius: '15%',
    fillStyle: 'black',
    order: 0
  }).clone({
    name: 'demo10_magnifierOutline',
    pivot: 'demo10_magnifierStencil',
    method: 'draw',
    lineWidth: 2,
    strokeStyle: 'red',
    order: 3
  });



  moveMagnifier = function(e) {
    var testPin;
    if (e.force) {
      pad.render();
    } else {
      here = pad.getMouse();
      if (choke && here.active && !isNaN(here.x)) {
        ratioX = base.actualWidth / display.actualWidth;
        ratioY = base.actualHeight / display.actualHeight;
        x = Math.floor(here.x * ratioX * 2) + border;
        y = Math.floor(here.y * ratioY * 2) + border;
        offsetX = magnifier.get('width') / 2;
        offsetY = magnifier.get('height') / 2;
        magnifier.set({
          copyX: x - offsetX,
          copyY: y - offsetY
        });
        testPin = hitGroup.getEntityAt(here);
        if (testPin) {
          if (currentPin && currentPin.name !== testPin.name) {
            currentPin.set({
              scale: 1
            });
            scrawl.entity[currentPin.name + 'Label'].set({
              visibility: false
            });
          }
          testPin.set({
            scale: 2
          });
          scrawl.entity[testPin.name + 'Label'].set({
            visibility: true
          });
          currentPin = testPin;
        } else {
          if (currentPin) {
            currentPin.set({
              scale: 1
            });
            scrawl.entity[currentPin.name + 'Label'].set({
              visibility: false
            });
            currentPin = false;
          }
        }
        pad.render(here);
        choke = false;
      }
    }
  };

  var myanimation = function() {
    choke = true;
  };

  anim = scrawl.makeAnimation({
    name: 'panel10_animation',
    fn: myanimation
  });

  scrawl.addListener(['move'], function(e) {
    moveMagnifier(e);
  }, canvas);

  scrawl.addListener(['down', 'enter'], function() {
    pad.setDisplayOffsets();
    anim.run();
  }, canvas);

  scrawl.addListener(['up', 'leave'], function() {
    anim.halt();
  }, canvas);

  pad.render();
}

  scrawl.loadExtensions({
    minified: true,
    path: 'https://scrawl.rikweb.org.uk/min_5-0-0/',
    extensions: ['images', 'wheel', 'phrase'],
    callback: function() {
      window.addEventListener('load', function() {
        console.log('scrawl load');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        scrawl.init();
        mycode();
      }, false);
    },
  });
}

$(document).ready(() => {
  Details.INIT();

  $(".imageD").click(function(){
    var index = $(".imageD").index(this);
    var imdData = $(".imageD:eq("+index+")").attr('image-data');
    $(".imageTov").removeClass('ac');
    $(".imageTov:eq("+index+")").addClass('ac');
    $("#tovarImage").attr('src', imdData);

    // var img1 = document.createElement('img');
    // var img2 = document.createElement('img');
    //
    // img1.className = 'active demopic';
    // img2.className = 'active demopic';
    //
    // img1.id = 'kitchenSmall';
    // img2.id = 'kitchenLarge';
    //
    // $('.hidden').append(img1);
    // $('.hidden').append(img2);
    // 
    // $("#kitchenSmall").attr('src', imdData);
    // $("#kitchenLarge").attr('src', imdData);
    // createAnimCanvasDetails();
  });

  // createAnimCanvasDetails();
});
