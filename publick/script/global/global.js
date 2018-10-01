'use strict';
var GlobalObj = {
  socket: undefined,
  PARSE_RANC: function(rank){
    if(rank <= 7){ $(".nicknameUsersLine").addClass("color0")}
    if(rank === 7){ $(".nicknameUsersLine").addClass("color7")}
    if(rank === 8){ $(".nicknameUsersLine").addClass("color6")}
    if(rank === 9){ $(".nicknameUsersLine").addClass("color5")}
    if(rank === 10){ $(".nicknameUsersLine").addClass("color4")}
    if(rank === 11){ $(".nicknameUsersLine").addClass("color3")}
    if(rank === 12){ $(".nicknameUsersLine").addClass("color2")}
    if(rank === 13){ $(".nicknameUsersLine").addClass("color1")}
    switch(rank){
      case 1: return "Новичек" ;break;
      case 2: return "Кадет";break;
      case 3: return "Солдат";break;
      case 4: return "Опытный";break;
      case 5: return "Мастер";break;
      case 6: return "Гуру";break;
      case 7: return "Помошник";break;
      case 8: return "DarkCoin - диллер";break;
      case 9: return "Модератор";break;
      case 10: return "Лидер арены";break;
      case 11: return "Судья";break;
      case 12: return "Помошник администратора";break;
      case 13: return "Администратор";break;
    }
    // nicknameUsersLine
  },
  PARSE_REPUTATION: function(repa){
    if(repa < 1000){ return 'Неизвестный'}
    if(repa > 1000 && repa < 2000){ return 'Узнаваемый'}
    if(repa > 2000 && repa < 5000){ return 'Известный'}
    if(repa > 5000 && repa < 7500){ return 'Популярный'}
    if(repa > 7500 && repa < 10000){ return 'Знаменитый'}
    if(repa > 10000 && repa < 15000){ return 'Прославленный'}
    if(repa > 15000 && repa < 20000){ return ''}
    if(repa > 20000 && repa < 30000){ return ''}
    if(repa > 30000 && repa < 50000){ return ''}
    if(repa > 50000 && repa < 100000){ return ''}
    if(repa > 100000 && repa < 150000){ return ''}
    if(repa > 150000 && repa < 200000){ return ''}
    if(repa > 200000 && repa < 500000){ return 'Легендарный'}
    if(repa > 500000){ return 'Что ты такое ? о_О'}
  },
  SET_STARS: function(r, c){
    $('.star').remove();
    let rep = r;
    for(let i = 0; i < 5; i++){
      const star = document.createElement('div');
      if(rep >= 1000 && rep < 10000){ star.className = 'star s1'; rep = rep - 1000};
      if(rep >= 10000 && rep < 25000){ star.className = 'star s2'; rep = rep - 10000};
      if(rep >= 25000 && rep < 50000){ star.className = 'star s3'; rep = rep - 25000};
      if(rep >= 50000 && rep < 100000){ star.className = 'star s4'; rep = rep - 50000};
      if(rep >= 100000){ star.className = 'star s5'; rep = rep - 100000};
      $(c).append(star);
    }
  },
  GET_COOKIE: function (cookiename) {
      var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
      return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
  },
}
