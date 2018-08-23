'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
const bParser = require('body-parser');

router.use(cookieParser());

function key_generator(len) {
    var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //to upper
    var numeric = '01234567895645874684156873524357454151156468755154686002545641025374';
    var password = "";
    var character = "";
    while (password.length < length) {
         var entity1 = Math.ceil(string.length * Math.random() * Math.random());
         var entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
         var hold = string.charAt(entity1);
         hold = (entity1 % 2 === 0) ? (hold.toUpperCase()) : (hold);
         character += hold;
         character += numeric.charAt(entity2);
         password = character;
    }
    return password;
}

var authStructure = function(req, res, next)  {
  mongoClient.connect(url, { useNewUrlParser: true } ,function(err, client){
    var db = client.db("UsersData");
    var collection = db.collection("users");

    if(err) return console.log(err);
    let userLogin = req.body.login;
    let userPass = req.body.password;

    collection.find({nick:userLogin}).toArray(function(err, results){
      console.log(results)
      results
      if(results[0] !== undefined){
        if(results[0].pass === userPass){
          results[0].pass = 'Информация недоступна!';
          results[0].secret = 'Информация недоступна!';
          let newKey = key_generator(35);

          res.cookie('AuthKEY', newKey);
          res.cookie('uID', results[0]._id);
          res.cookie('language', "rus");

          res.send({code:500, userDATA:JSON.stringify(results[0])})
        }else{
          res.send({code:450, type:"nRed", error:"Неверный логин или пароль :("})
        }
        next();
      }else{
        res.send({code:450, type:"nRed", error:"Неверный логин или пароль :("})
        next();
      }


      client.close();
    });
  });
};


router.post('/auth', authStructure, function(req, res, next){

});
// router.post('/auth', function(req, res, next){
//   res.send('{"code":500, "userDATA":"asdasdsd"}')
// });

module.exports = router;
