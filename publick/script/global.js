
var Global = {
  changeTypeDost: function(t){
    $("#CityOfDost,#CityOfPostNP,#CityOfPostUl,#CityOfPostD,#CityOfPostK").fadeOut(130)
    if(parseInt(t) === 0){

    }
    if(parseInt(t) === 1){
      $("#CityOfDost,#CityOfPostUl,#CityOfPostD,#CityOfPostK").fadeIn(300);
      $("#input-PaymentCity").val("Львів").attr("disabled",true);
      $("#CityOfDost label").hide();
    }
    if(parseInt(t) === 2){
      $("#CityOfDost,#CityOfPostNP").fadeIn(300);
      $("#input-PaymentCity").val("").attr("disabled",false);
      $("#CityOfDost label").show();
    }
    if(parseInt(t) === 3){

    }
  },
  message: function(e){
    e.preventDefault(e);

    var msg_data = {
      MyName: $("#input-name").val(),
      myEmail:$("#input-email").val(),
      myTheme:$("#input-subject").val(),
      message:$("#input-message").val(),
    };

    $.post('/sendMessage',msg_data, function(data){
      if(
        ($("#input-name").val().length > 1)||
        ($("#input-email").val().length > 1)||
        ($("#input-subject").val().length > 1)||
        ($("#input-message").val().length > 1)){
          createAlert('','Сообщение отправленно!','Ваше сообщение біло успешно отправлено.','success',true,true,'pageMessages');
          $(".cf input[type='text'],.cf input[type='email'], #input-message").val('');
      }else{
        createAlert('','','Сообщение не отправлено!','warning',false,true,'pageMessages');
        return false
      }
    });

  },
  BTN: function(){


    $( ".draggable" ).draggable({
      cursor: "crosshair"
    });


    $(".NEXT_pay_bas").click(function(){
      $('.basket_info').show(300);
    });

    $(".lang").click(function(){
      document.cookie = "vernissageLang="+$(this).attr("id");
      location.reload();
    });

    if($("body").width() > 800){
        return $(window).scrollTop() > 300 ? $(".logotype").css({"height":"50px"}) : $(".logotype").css({"height":"100px"}), $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show");
    }else{
        return $(window).scrollTop() > 600 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
    }
  }
};


$(document).ready(() => {
  Global.BTN();
  setTimeout(() => {
    $(".spn_hol").fadeOut(500);
  }, 1500);
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
    window.location.href = "/panel";
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
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
$(document).ready(function(){
  $('.container-call').click(function(){
    $(".avenue-messenger").toggle();
    if(i === 0){
      setTimeout(function() {
        fakeMessage();
      }, 100);
    }

  });


  function setDate(){
    d = new Date()
    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
      $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
      $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
    }
  }

  function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }

    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages')).addClass('new');
    setDate();

    $('.message-input').val(null);
    setTimeout(function() {
    }, 1000 + (Math.random() * 20) * 100);
  }

  $('.message-submit').click(function() {
    insertMessage();
  });

  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      insertMessage();
      return false;
    }
  })

  var Fake = ['Здравствуйте, я виртуальный помошник Юля, у вас появились вопроссы ? я могу вам чем то помочь ?']

  function fakeMessage() {
    if ($('.message-input').val() != '') {
      return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="../../../image/chatbot.jpg" /></figure><span></span></div>').appendTo($('.messages-content'));

    setTimeout(function() {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="../../../image/chatbot.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.messages')).addClass('new');
      setDate();
      i++;
    }, 1000 + (Math.random() * 20) * 100);
  }
  $('.button').click(function(){
    $('.menu .items span').toggleClass('active');
     $('.menu .button').toggleClass('active');
  });

});
