'use strict';
var data = {
  ak: GlobalObj.GET_COOKIE('AuthKEY'),
  ud: new Object()
}

var Game = {
  UserInit: function(){

    $.post('/gameInit', {aKey: data.ak},function(d){
      console.log(d.userDATA)
      data.ud.us = d;});
  },
  LocationInit: function(){
    $.post('/locInit', {aKey: data.ak},function(d){data.ud.loc = d;});
  },
  goLoc: function(){},
  clickMenu: function(){},
  styles: function(){
    $(".smile_btn").click(function(){
      if($(".smiles_block").hasClass("show")){
        $(".smiles_block").removeClass("show")
      }else{
        $(".smiles_block").addClass("show")
      }
    });
  },
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
    Game.styles();
    CHAT.chat_init();
  }
};

$(document).ready(function(){
  Game.init();
});
