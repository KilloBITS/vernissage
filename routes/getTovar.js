'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.get('/*', function(req, res, next){
  var languageSystem;
  console.log(req.cookies.vernissageLang);
  if(req.cookies.vernissageLang === undefined){
    languageSystem = 0;
  }else{
    if(req.cookies.vernissageLang === 'ua'){
      languageSystem = 1;
    }else{
      languageSystem = 0;
    }
  }

  var searchData;
  var DA = req.url.split('=');

  if(DA[0] !== "/"){
    searchData = DA[1].split(',');
  }
  mongoClient.connect(url, function(err, client){
    const db = client.db(global.baseName);
    const config = db.collection("config");
    const menu  = db.collection("menu");
    const tovar  = db.collection("tovar");

    if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
       if(results_config[languageSystem].opens){

         menu.find().toArray(function(err, results_menu ){
           if(DA[0] !== "/"){
             let FILTER = {
               category: parseInt(searchData[0])
             };
             if(searchData.length >= 2 ){
               FILTER.types = searchData[1];
             }

             console.log(FILTER)

             tovar.find(FILTER).sort({ AI: -1 }).limit(24).toArray(function(err, results_tovar ){
               res.render('tovar.ejs',{conf: results_config[languageSystem], menu: results_menu, tovarArr: results_tovar})
               client.close();
             });
           }else{
             tovar.find().sort({ AI: -1 }).limit(24).toArray(function(err, results_tovar ){
               res.render('tovar.ejs',{conf: results_config[languageSystem], menu: results_menu, tovarArr: results_tovar})
               client.close();
             });
           }

         });
       }else{
         res.render('close.ejs')
       }
     });
  });
});

module.exports = router;
