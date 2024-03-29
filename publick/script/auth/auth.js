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
    // $('.menu-wrapper').on('click', function() {
    //   $('.hamburger-menu').toggleClass('animate');
    //   $('.twoLine').toggleClass('openMenuClass');
    //   $(".menu_data").hide();
    // })
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
      }else{
        $(".backet_load").fadeOut(50);
        $(".errorUP:eq(1)").html(res.message).fadeIn(400);
      }
    });
  },
  POST_REGISTER: function(){
    if($("#checkPrav").is(":checked")){
      $(".backet_load").fadeIn(200);
      let na = {
        newName: $("#newName").val(),
        newEmail: $("#newEmail").val(),
        newPass: $("#newPass").val()
      };
      $.post('/create_accaunt',na,function(res){
        if(res.code === 500){
          window.location.replace("/profile");
        }else{
          $(".backet_load").fadeOut(50);
          $(".errorUP:eq(0)").html(res.message).fadeIn(400);
        }
      });
    }else{
      alert("Вы что не согласны с правилами сайта ?");
    }

  },
  INIT: function(){
    AUTH.DESIGHN()
  }
};




$(document).ready(function(){
  AUTH.INIT();
});


// external js
// https://draggabilly.desandro.com/draggabilly.pkgd.js

// use left/top for all positioning
Draggabilly.prototype.positionDrag = Draggabilly.prototype.setLeftTop;

$( function() {
  $('.knob').each( function( i, knob ) {
    var draggie = new Draggabilly( knob, {
      containment: true,
      axis: 'x'
    });
    draggie.on( 'dragMove', onDragMove );
    draggie.on( 'dragEnd', onDragEnd );

  });
});

function onDragMove() {
  var $knob = $( this.element );
  var $label = $knob.parents('label');
  // on initial drag move
  if ( !this.hasDragged ) {
    this.movePotential = $knob.parent().width() - $knob.width();
    $label.on( 'click', onLabelClickDragging );
    this.input = $label.find('input')[0];
    this.hasDragged = true;
  }

  var isChecked = this.position.x > this.movePotential / 2;
  this.input.checked = isChecked;
}

// disable label clicks when dragging
function onLabelClickDragging( event ) {
  event.preventDefault();
}

function onDragEnd() {
  // clear out Draggabilly's position setting
  this.element.style.left = '';
  delete this.hasDragged;
  var $knob = $( this.element );
  var $label = $knob.parents('label');
  setTimeout( function() {
    $label.off( 'click', onLabelClickDragging );
  });
}
