var CHAT = {
  sendRoom: undefined,
  myrooms: undefined,
  socket: undefined,
  roomActiveIndex: undefined,
  socket: undefined,
  selectChat: 'mainChat',
  selectIndexChat: 0,
  msg: function(msg){
    let m = '<div class="msg"><span class="msg_date">12:40</span><span class="msg_u_btn">i</span><span class="msg_user '+msg.r+'">'+msg.n+'</span><span class="msg_text">'+msg.m+'</span></div>';
    for(let i = 0; i < $(".RoomBTN").length; i++){
      if($(".messages-block:eq("+i+")").attr("onRoom") === msg.ro){
        $(".messages-block:eq("+i+")").append(m);
        $("#sendingMessage").removeClass('sendload');
      }
    }
  },
  msg_system: function(nick, message, ranks){

  },
  sendMessage: function(msg){
    switch(parseInt(msg.t)){
        case 0: CHAT.msg(msg); break;
        case 1: CHAT.msg_system(msg); break;
    }
  },
  bindButoons: function(){
    $("#msgText").keyup(function(event){
        if(event.keyCode == 13){
          $("#sendingMessage").click();
        }
    });
  },
  chat_init: function(){
    //подключаемся к сокету
    CHAT.socket = io.connect(location.hostname + ':3000');
    CHAT.socket.on('connect', function (d) {
        CHAT.socket.emit('clientConnect', {
            data: 'connection',
            AuthKEY: data.ak,
            sc: CHAT.selectChat
        });
    });

    CHAT.socket.on('message', function (data) {
        CHAT.sendMessage(data);
    });

    $(".RoomBTN").click(function(){
      CHAT.selectChat = $(this).attr('chat');
      $(".RoomBTN").removeClass('RoomActive');
      $(this).addClass('RoomActive');

      for(let i = 0; i < $(".RoomBTN").length; i++){
        $(".messages-block:eq("+i+")").removeClass('msgBlockActive')
        if($(".messages-block:eq("+i+")").attr("onRoom") === $(this).attr('chat')){
          CHAT.selectIndexChat = i;
          $(".messages-block:eq("+i+")").addClass('msgBlockActive');

        }
      }
    });



    $("#sendingMessage").click(function(){
      var text = $("#msgText").val();
      $("#sendingMessage").addClass('sendload');
      if (text.length <= 0)
          return;
      $("#msgText").val("");
      CHAT.socket.emit("message", {message: text, ak: data.ak, r: CHAT.selectChat});
    });

    CHAT.bindButoons();
  }
}
