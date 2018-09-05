'use strict';
var data = {
  ak: GlobalObj.GET_COOKIE('AuthKEY'),
  ud: new Object()
}

var Game = {
  UserInit: function(){
    $.post('/gameInit', {aKey: data.ak},function(d){data.ud.us = d;});
  },
  LocationInit: function(){
    $.post('/locInit', {aKey: data.ak},function(d){data.ud.loc = d;});
  },
  goLoc: function(){},
  clickMenu: function(){},
  goNPC: function(){},
  parallax: function(){
    $(document).on('mousemove',function(e){
      // console.log(e)
    });
  },
  init: function(){
    Game.parallax();
    Game.UserInit();
    Game.LocationInit();
  }
};

$(document).ready(function(){
  Game.init();
});
