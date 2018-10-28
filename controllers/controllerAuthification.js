'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());

router.post('/auth', function(req, res, next){
  if (!req.body.login || !req.body.password) {
    res.send({code:450, message: 'Неверный логин или пароль'});
  }else{
    mongoClient.connect(global.baseIP, function(err, client){
      const db = client.db(global.baseName);
      const users = db.collection("users");
      if(err) return console.log(err);
      users.find({email: req.body.login}).toArray(function(err, results_users){
        if(req.body.login === results_users[0].email || req.body.password === results_users[0].password) {
          req.session.user = results_users[0].email;
          req.session.admin = results_users[0].isAdmin;
          global.online = global.online + 1;
          res.send({code:500});
        }else{
          res.send({code:450, message: 'Неверный логин или пароль'});
        }
      });
    });
  }
});

router.post('/create_accaunt', function(req, res, next){
    mongoClient.connect(global.baseIP, function(err, client){
      const db = client.db(global.baseName);
      const users = db.collection("users");
      if(err) return console.log(err);

      users.find({email: req.body.newEmail}).toArray(function(err, results_usersEmail ){
        if(results_usersEmail.length === 0){
          users.find().sort({AI:-1}).limit(1).toArray(function(err, results_users ){
            var mainData = req.body;
            var NEXT_AI = results_users[0].AI + 1;
            var NEW_USER = {};
            NEW_USER.nick = req.body.newEmail.split('@')[0],
            NEW_USER.name =  req.body.newName,
            NEW_USER.email = req.body.newEmail,
            NEW_USER.phone_number = null,
            NEW_USER.secret = null,
            NEW_USER.password = req.body.newPass,
            NEW_USER.rank = 0,
            NEW_USER.stars = 0,
            NEW_USER.AI = NEXT_AI,
            NEW_USER.isAdmin = false,
            NEW_USER.ava = "";
            users.insertOne(NEW_USER);
            req.session.user = req.body.newEmail;
            req.session.admin = false;
            global.online = global.online + 1;

            res.send({code: 500});
          });
        }else{
          res.send({code: 450})
        }
      });
    });

});
//isAdmin
module.exports = router;
