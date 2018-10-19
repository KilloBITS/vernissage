'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.get('/*', function(req, res, next){
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

  var DA = req.url.split('=');
  var searchData = DA[1].split(',');

  mongoClient.connect(url, function(err, client){
    const db = client.db(global.baseName);
    const config = db.collection("config");
    const menu  = db.collection(langMenu);
    const tovar  = db.collection("tovar");

    if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
       if(results_config[languageSystem].opens){

         menu.find().toArray(function(err, results_menu ){

             tovar.find({AI: parseInt(searchData)}).toArray(function(err, results_tovar ){
               console.log(results_tovar)
               res.render('details.ejs',{conf: results_config[languageSystem], menu: results_menu, tovarArr: results_tovar})
               client.close();
             });


         });
       }else{
         res.render('close.ejs')
       }
     });
  });
});

module.exports = router;
