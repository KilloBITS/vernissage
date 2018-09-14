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
  GlobalMessage(d){
    var GMC = document.createElement('div');
    GMC.className = 'GlobalMsgContainer';
    var GM = document.createElement('div');
    GM.className = "GM";
    var close_global = document.createElement('div');
    close_global.className = 'close_global';
    close_global.innerHTML = "X";
    var type_global = document.createElement('div');
    type_global.className = 'type_global';
    var author_global = document.createElement('div');
    author_global.className = 'author_global';
    var message_global = document.createElement('div');
    message_global.className = 'message_global';
    var texture_global = document.createElement('div');
    texture_global.className = 'texture_global';

    if(d.code === 500){

    }else{
      close_global.onclick = function(){
        $(this).parent().parent().remove();
      };
      author_global.innerHTML = d.author;
      message_global.innerHTML = d.error;
      GMC.append(GM);
      GM.append(close_global);
      GM.append(type_global);
      GM.append(author_global);
      GM.append(message_global);
      GM.append(texture_global);
      $("body").append(GMC);
      $(".GlobalMsgContainer").show();
      $(".NPC_DIALOGS").hide();
    }
  },
  CreateGameData: function(d){
    $(".GameNavButton_AB").remove();
    $("#SityImage").css({"background-image":"url(../../../data/location/image/"+d.locDATA.LOC_ID+".jpg)"})
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
        Game.goNPC('NPC_'+d.npcData[n].idNPC, d.npcData[n].name);
      };
      $(".RightNav .Button_area").append(NewNPC);
    }
    $("#LocNameGlobal").html(d.locDATA.name);
    $("#LocInfoGlobal").html(d.locDATA.text);
    CHAT.chat_init();
    Game.loadDesign(false, '...');
  },
  LocationInit: function(){
    $.post('/locInit', {aKey: data.ak},function(d){
      data.ud.loc = d;
      Game.CreateGameData(d)
    });
  },
  otvetClick: function(npc, oid){
    console.log(npc);
    console.log(oid);
  },
  goLoc: function(e){
    $(".NPC_DIALOGS").hide(150);
    Game.loadDesign(true, 'Переходи на другую локацию...');
    $.post("/doLocGo",{l:e, aKey: data.ak},(d) => {
      Game.CreateGameData(d);
      data.ud.loc = d;
    });
    console.log(e)
  },
  goNPC: function(e, name){
    $('.NPC_load').show();
    $(".NPC_DIALOGS").fadeIn(250);
    $.post("/doNPCGo",{n:e, aKey: data.ak},(d) => {
      if(d.code === 500){
        $(".NPC_OTVET span").remove();
        $(".NPC_TITLE").html(name)
        $(".NPC_TEXT").html(d.dlg);
        for(let ni = 0; ni < d.otv.split(',').length; ni++){
          var span = document.createElement('span');
          span.innerHTML = d.otv.split(',')[ni];
          span.id = "OTV_"+ni;
          span.onclick = function(){
            Game.otvetClick(e, "OTV_"+ni);
          };
          $(".NPC_OTVET").append(span);
        }
        $('.NPC_load').hide();
        console.log(d);
      }else{
        Game.GlobalMessage(d)
      }
    });
  },
  clickMenu: function(){},
  loadDesign: function(t,s){
    if(t){
      $(".load").show();
      $(".load_text").html(s);
    }else{
      $(".load").fadeOut(200);
      $(".load_text").html(s);
    }

    $(".NPC_CLOSE").click(() => {
      $(".NPC_DIALOGS").fadeOut(150);
    });

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
  }
};

$(document).ready(function(){
  Game.init();
});
