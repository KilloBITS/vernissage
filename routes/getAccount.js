'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;

router.get('/', function(req, res, next){
  var languageSystem, langMenu;
  var titles = ["Профиль","Профіль"];
  if(req.cookies.vernissageLang === undefined){
    languageSystem = 0;
    langMenu = 'menu';
  }else{
    if(req.cookies.vernissageLang === 'ua'){
      languageSystem = 1;
      langMenu = 'menu-uk';
    }else{
      languageSystem = 0;
      langMenu = 'menu';
    }
  }

  mongoClient.connect(global.baseIP, function(err, client){
      const db = client.db(global.baseName);
      const config = db.collection("config");
      const menu  = db.collection(langMenu);

      if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
       if(results_config[languageSystem].opens){
         menu.find().toArray(function(err, results_menu ){
           res.render('account.ejs',{
             conf: results_config[languageSystem],
             menu: results_menu,
             title: titles[languageSystem],
             sessionUser: req.session.user
           })
           client.close();
         });
       }else{
         res.render('close.ejs',{
           conf: results_config[languageSystem]
         })
       }

     });
  });
});

module.exports = router;
