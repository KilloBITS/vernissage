'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.get('/', function(req, res, next){
  mongoClient.connect(url, function(err, client){
      const db = client.db("VERNISSAGE");
      const config = db.collection("config");
      const menu  = db.collection("menu");

      if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
        menu.find().toArray(function(err, results_menu ){
          console.log(results_menu)
          res.render('index.ejs',{conf: results_config[0], menu: results_menu})
          client.close();
        });
     });
  });
});

module.exports = router;
