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
    const tovar  = db.collection("tovar");

    if(err) return console.log(err);

     config.find().toArray(function(err, results_config){
       if(results_config[0].opens){

         menu.find().toArray(function(err, results_menu ){
           tovar.find().toArray(function(err, results_tovar ){
             res.render('tovar.ejs',{conf: results_config[0], menu: results_menu, tovarArr: results_tovar})
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
