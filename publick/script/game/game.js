'use strict';
var data = {
  ak: GlobalObj.GET_COOKIE('AuthKEY'),
  ud: new Object()
}

var Game = {
  UserInit: function(){
    $.post('/gameInit', {aKey: data.ak},function(d){
      data.ud.us = d;
    });
  },
  CreateGameData: function(d){
    $(".GameNavButton_AB").remove();
    for(let l = 0; l < d.locGO.length; l++){
      let NewLoc = document.createElement("div");
      NewLoc.className = "GameNavButton_AB LocIcon",
      NewLoc.innerHTML = d.locGO[l].name;
      NewLoc.id = 'Loc_'+d.locGO[l].LOC_ID;
      NewLoc.onclick = () => {
        Game.goLoc('Loc_'+d.locGO[l].LOC_ID);
      };
      $(".LeftNav .Button_area").append(NewLoc);
    }

    for(let n = 0; n < d.npcData.length; n++){
      let NewNPC = document.createElement("div");
      NewNPC.className = "GameNavButton_AB NPCIcon",
      NewNPC.innerHTML = d.npcData[n].name;
      NewNPC.id = 'NPC_'+d.npcData[n].idNPC;
      NewNPC.onclick = () => {
        Game.goNPC('NPC_'+d.npcData[n].idNPC);
      };
      $(".RightNav .Button_area").append(NewNPC);
    }
    console.log(d);
    $("#LocNameGlobal").html(d.locDATA.name);
    $("#LocInfoGlobal").html(d.locDATA.text);
    Game.loadDesign(false, '...')
  },
  LocationInit: function(){
    $.post('/locInit', {aKey: data.ak},function(d){
      data.ud.loc = d;
      Game.CreateGameData(d)
    });
  },
  goLoc: function(e){
    Game.loadDesign(true, 'Переходи на другую локацию...')
    $.post("/doLocGo",{l:e, aKey: data.ak},(d) => {
      Game.CreateGameData(d);
    });
    console.log(e)
  },
  goNPC: function(){},
  clickMenu: function(){},
  loadDesign: function(t,s){
    if(t){
      $(".load").fadeIn(100);
      $(".load_text").html(s);
    }else{
      $(".load").fadeOut(100);
      $(".load_text").html(s);
    }
  },
  styles: function(){
    $(".smile_btn").click(function(){
      if($(".smiles_block").hasClass("show")){
        $(".smiles_block").removeClass("show")
      }else{
        $(".smiles_block").addClass("show")
      }
    });
  },
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
