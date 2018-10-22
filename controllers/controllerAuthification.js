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
//isAdmin
module.exports = router;
