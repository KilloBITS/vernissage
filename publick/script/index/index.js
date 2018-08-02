'use strict';
var indexObj = new Object();
var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

setInterval(function () {
    var blinkTime = randomInteger(1, 15);
    if (blinkTime > 12) {
        $(".lum-r .light").css({
            "box-shadow": "none",
            "background": "rgba(83, 86, 55, 0.78)"
        });
    } else {
        $(".lum-r .light").css({
            "box-shadow": "rgb(255, 90, 24) 0px 20px 90px 18px",
            "background": "rgb(255, 0, 0)"
        });
    }
}, 80);

let buttons = () => {
  $('.nev-btn').click(function () {
    let index = $('.nev-btn').index(this);
    $('.nev-btn').removeClass('btnAct');
    $('.nev-btn:eq('+index+')').addClass('btnAct');
    $('.data-block').css({'bottom':'-100%'});
    $('.data-block:eq('+ index +')').css({'bottom':'0%'});
  });

  $('.arrow-page').click(function(){
    //blockTopNavPanel
    //arrow-page
    //8px 8px 14px -4px black
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
};

var parallax = {
  options: {
    multiplier: 0.002,
    wrapper: "#parallax-wrap",
    wrapperOffset: $("#parallax").offset(),
    wrapperWidth: $("#parallax").width(),
    wrapperHeight: $("#parallax").height(),
    wrapperCenter: {
      x: function() {
        return parallax.options.wrapperOffset.left + parallax.options.wrapperWidth/2;
      },
      y: function() {
			return parallax.options.wrapperOffset.top + parallax.options.wrapperHeight/2;
      }
    },
    relativeMouse: {
      x: function(x) {
        return (x - parallax.options.wrapperCenter.x()) * parallax.options.multiplier;
      },
      y: function() {
        return (parallax.mouseY - parallax.options.wrapperCenter.y()) * parallax.options.multiplier;
      }
    },
    origin: {
      x: function() {
        return ((parallax.mouseX) / $(window).width()) * 100;
      },
      y: function() {
        return ((parallax.mouseY) / $(window).height()) * 100;
      }
    }
  },
  mouseX: 0,
  mouseY: 0,
  mouse: function(x, y) {
    var that = this;
    this.mouseX = x;
    this.mouseY = y;
    $(parallax.options.wrapper).css({
      "-webkit-transform": "perspective(1000px) rotateY("+ that.options.relativeMouse.x(that.mouseX) +"deg) rotateX("+ that.options.relativeMouse.y(that.mouseY) +"deg)",
      "transform": "perspective(1000px) rotateY("+ that.options.relativeMouse.x(that.mouseX) +"deg) rotateX("+ that.options.relativeMouse.y(that.mouseY) +"deg)"
    });
  },
  mousemoveEvent: function() {
    var that = this;
    $("body").mousemove(function(e) {
        that.mouse(e.pageX, e.pageY);
    });
  },
  init: function() {
    this.mousemoveEvent();
  }
}



$(document).ready(() => {
  indexObj.openedBottomPanel = false;
  buttons();
});
