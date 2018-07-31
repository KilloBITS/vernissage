'use strict';
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
console.log(index);
    $('.data-block').css({'bottom':'-100%'});
    $('.data-block:eq('+ index +')').css({'bottom':'0%'});

  });
};

$(document).ready(() => {
  buttons();
});
