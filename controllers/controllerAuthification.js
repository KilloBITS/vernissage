'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
const bParser = require('body-parser');


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
          res.send('{"code":500, "userDATA":'+JSON.stringify(results[0])+'}')
        }else{

        }
        next();
      }else{
        res.send('{code:450, type:"nRed", error:"Неверный логий или пароль :("}')
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
