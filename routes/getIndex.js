'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', function(req, res, next){
  var languageSystem, langMenu;
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
      const slider  = db.collection("slider");
      const news  = db.collection("news");
      const tovar  = db.collection("tovar");

      if(err) return console.log(err);

       config.find().toArray(function(err, results_config){
         if(results_config[languageSystem].opens){
           menu.find().toArray(function(err, results_menu ){
             slider.find().toArray(function(err, results_slider ){
               news.find().toArray(function(err, results_news ){
                 tovar.find().sort({ AI: -1 }).limit(5).toArray(function(err, results_tovar ){

                     res.render('index.ejs',{
                       conf: results_config[languageSystem],
                       menu: results_menu,
                       slides: results_slider,
                       news: results_news,
                       newtovar: results_tovar,
                       sessionUser: req.session.user
                     });

                   client.close();
                 });

               });
             });
           });
         }else{
           res.render('close.ejs')
         }

       });
  });
});

module.exports = router;
