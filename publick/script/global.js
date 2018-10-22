
$(document).ready(() => {
  $(".lang").click(function(){
    document.cookie = "vernissageLang="+$(this).attr("id");
    location.reload();
  });

  if($("body").width() > 800){
      return $(window).scrollTop() > 300 ? $(".logotype").css({"height":"50px"}) : $(".logotype").css({"height":"100px"}), $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show");
  }else{
      return $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
  }
});

function runOnKeys(func) {
  var codes = [].slice.call(arguments, 1);
  var pressed = {};
  document.onkeydown = function(e) {
    e = e || window.event;
    pressed[e.keyCode] = true;
    for (var i = 0; i < codes.length; i++) {
      if (!pressed[codes[i]]) {
        return;
      }
    }
    pressed = {};
    func();

  };
  document.onkeyup = function(e) {
    e = e || window.event;
    delete pressed[e.keyCode];
  };
}
runOnKeys(function() {
  var isAdmin = confirm("Вы действительно хотите перейти к панели управления?");
  if(isAdmin){
    window.location.href = "/login";
  }
},"Q".charCodeAt(0),"A".charCodeAt(0));
function createAlert(title, summary, details, severity, dismissible, autoDismiss, appendToId) {
  var iconMap = {
    info: "fa fa-info-circle",
    success: "fa fa-thumbs-up",
    warning: "fa fa-exclamation-triangle",
    danger: "fa ffa fa-exclamation-circle"
  };

  var iconAdded = false;

  var alertClasses = ["alert", "animated", "flipInX"];
  alertClasses.push("alert-" + severity.toLowerCase());

  if (dismissible) {
    alertClasses.push("alert-dismissible");
  }

  var msgIcon = $("<i />", {
    "class": iconMap[severity] // you need to quote "class" since it's a reserved keyword
  });

  var msg = $("<div />", {
    "class": alertClasses.join(" ") // you need to quote "class" since it's a reserved keyword
  });

  if (title) {
    var msgTitle = $("<h4 />", {
      html: title
    }).appendTo(msg);

    if(!iconAdded){
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (summary) {
    var msgSummary = $("<strong />", {
      html: summary
    }).appendTo(msg);

    if(!iconAdded){
      msgSummary.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (details) {
    var msgDetails = $("<p />", {
      html: details
    }).appendTo(msg);

    if(!iconAdded){
      msgDetails.prepend(msgIcon);
      iconAdded = true;
    }
  }


  if (dismissible) {
    var msgClose = $("<span />", {
      "class": "close", // you need to quote "class" since it's a reserved keyword
      "data-dismiss": "alert",
      html: "X"
    }).appendTo(msg);
  }

  $('#' + appendToId).prepend(msg);

  if(autoDismiss){
    setTimeout(function(){
      msg.addClass("flipOutX");
      setTimeout(function(){
        msg.remove();
      },1000);
    }, 5000);
  }
}
$(function() {
  if ($('#sidecontent3').length) {
    var el = $('#sidecontent3');
    var stickyTop = $('#sidecontent3').offset().top;
    var stickyHeight = $('#sidecontent3').height();
    $(window).scroll(function() {
      var limit = $('#footer-wrapper').offset().top - stickyHeight - 20;
      var windowTop = $(window).scrollTop();
      if (stickyTop < windowTop) {
        el.css({
          position: 'fixed',
          top: 20
        });
      } else {
        el.css('position', 'static');
      }
      if (limit < windowTop) {
        var diff = limit - windowTop;
        el.css({
          top: diff
        });
      }
    });
  }
});
// Back to top button
(function() {
  $(document).ready(function() {
    if($("body").width() > 800){
      return $(window).scroll(function() {
        return $(window).scrollTop() > 300 ? $(".logotype").css({"height":"50px"}) : $(".logotype").css({"height":"100px"}), $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
      }), $("#back-to-top").click(function() {
        return $("html,body").animate({
          scrollTop: "0"
        })
      })
    }else{
      return $(window).scroll(function() {
        return $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
      }), $("#back-to-top").click(function() {
        return $("html,body").animate({
          scrollTop: "0"
        })
      })
    }

  })
}).call(this);
//
//
// var initialPoint;
// var finalPoint;
// document.addEventListener('touchstart', function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   initialPoint=event.changedTouches[0];
// }, false);
// document.addEventListener('touchend', function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   finalPoint=event.changedTouches[0];
//   var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
//   var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
//   if (xAbs > 20 || yAbs > 20) {
//   if (xAbs > yAbs) {
//   if (finalPoint.pageX < initialPoint.pageX){
//   /*СВАЙП ВЛЕВО*/}
//   else{
//   /*СВАЙП ВПРАВО*/}
//   }
//   else {
//   if (finalPoint.pageY < initialPoint.pageY){
//   /*СВАЙП ВВЕРХ*/}
//   else{
//   /*СВАЙП ВНИЗ*/}
//   }
//   }
// }, false);