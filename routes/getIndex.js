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
      const slider  = db.collection("slider");

      if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
        menu.find().toArray(function(err, results_menu ){
          slider.find().toArray(function(err, results_slider ){
            console.log(results_slider)
            res.render('index.ejs',{conf: results_config[0], menu: results_menu, slides: results_slider})
            client.close();
          });
        });
     });
  });
});

module.exports = router;
