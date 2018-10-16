'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.get('/', function(req, res, next){
  mongoClient.connect(url, function(err, client){
      const db = client.db(global.baseName);
      const config = db.collection("config");
      const menu  = db.collection("menu");

      if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
       if(results_config[0].opens){
         menu.find().toArray(function(err, results_menu ){
           res.render('oplata.ejs',{conf: results_config[0], menu: results_menu})
           client.close();
         });
       }else{
         res.render('close.ejs')
       }

     });
  });
});

module.exports = router;
