'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const cookieParser = require('cookie-parser');


router.use(cookieParser());
//&& req.session.user === "mr.kalinuk@gmail.com"
router.get('/', function(req, res, next){
  if (req.session) //&& req.session.admin && req.session.user !== undefined
    {
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
          const tovaruk  = db.collection("tovar-uk");
          const types  = db.collection("types");
          const categories  = db.collection("categories");

          if(err) return console.log(err);

         config.find().toArray(function(err, results_config){
           menu.find().toArray(function(err, results_menu ){
             slider.find().toArray(function(err, results_slider ){
               news.find().toArray(function(err, results_news ){
                 tovar.find().toArray(function(err, results_tovar ){
                   tovaruk.find().toArray(function(err, results_tovaruk ){
                     types.find().toArray(function(err, results_types ){
                       categories.find().toArray(function(err, results_categories ){
                         res.render('admin/panel.ejs',{
                           conf: results_config[languageSystem],
                           menu: results_menu,
                           slides: results_slider,
                           news: results_news,
                           tovar: results_tovar,
                           tovaruk: results_tovar,
                           type: results_types,
                           categorie: results_categories,
                           user: req.session.user
                         })
                         client.close();
                       });
                     });
                   });
                 });
               });
             });
           });
         });
      });
    }
  else
    {
      res.redirect('/');
    }
});

module.exports = router;
