'use strict';
const express = require('express');
const http = require('http');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
const bParser = require('body-parser');
const options = {pingInterval: 10, cookie: false};

let app = express();
let server = http.createServer(app);

const io = require('socket.io').listen(server,  options);
global.socketIO = io;

var GetUserLoc = function(nick){
  return 'loc1'
};

io.sockets.on('connection', function (client) {

    client.on('clientConnect', function(data){ //подключение к чату
        client.username = data.nickName;
        client.ak = data.AuthKEY;
        client.join('mainChat');
        client.join('ShopChat');
        client.join(GetUserLoc(data.nickName));
    });

    client.on('message', function (MD) { //функция отправки сообщений

      mongoClient.connect(url, { useNewUrlParser: true } ,function(err, clientMDB){
        var db = clientMDB.db("UsersData");
        var collection = db.collection("Session"),
            collection2 = db.collection("users");

        collection.find({c:MD.ak}).toArray(function(err, results){
            collection2.find({nick: results[0].a}).toArray(function(err, results2){

              if(MD.type && (MD.type === 1) && parseInt(results2[0].rank) > 8){
                var typeMSG = 1;
              }else{
                var typeMSG = 0;
              }


              if(MD.r !== "mainChat" && MD.r !== "ShopChat"){
                var userLoc = GetUserLoc(results2[0].nick);
              }else{
                var userLoc = MD.r;
              }

              let msg = {
                m: MD.message,
                n: results2[0].nick,
                r: 'textColor'+results2[0].rank,
                t: typeMSG,
                ro: userLoc
              };

              switch(msg.t){
                case 0: io.sockets.in(userLoc).emit('message', msg);break;
                case 1: io.sockets.emit('message', msg); break;
              }

              //
            });
          clientMDB.close();
        });
      });
    });



    // Отключение от сервера
    // client.on('disconnect', function() {
    //     if(usernames[client.aKey]){
    //         setOnline(global.usernames[client.aKey].id, 0);
    //     }
    //     client.leave(global.usernames[client.aKey].rooms); //выходим из комнаты
    //     let userRoomLength =  io.sockets.adapter.rooms[global.usernames[client.aKey].rooms ];
    //     clients.splice(clients.indexOf(client), 1); //удаляем из массива юзеров
    //
    //     let delUserRoom = usernames[client.aKey].rooms
    //     delete global.usernames[client.aKey]; //удаляем из обекта юзеров
    //
    //     if(userRoomLength !== undefined){
    //         io.sockets.in(delUserRoom).emit('users', {data: userRoomLength.length, users: users_location(delUserRoom)}); //обновляем данные у пользователей
    //     }else{
    //         io.sockets.in(delUserRoom).emit('users', {data: 0, users: users_location(delUserRoom)}); //обновляем данные у пользователей
    //     }
    // });
});

server.listen(3000, function (err) {
  console.log('Chat server starter...');
});

module.exports = router;
