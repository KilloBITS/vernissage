'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());


var saveSocials = (req, res, next) => {
  console.log(req.body);
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const config  = db.collection("config");

   if(err) return console.log(err);

   config.find().toArray(function(err, results_config){
     console.log(results_config[0].socials);
     var newResConf = results_config[0].socials;
     newResConf[0].link = req.body.v;
     newResConf[1].link = req.body.i;
     newResConf[2].link = req.body.f;
     config.update({},{ $set : { socials: newResConf }});
     res.send({code:500});
     client.close();

   });


  });
};

router.post('/saveSocials', saveSocials, function(req, res, next){});

module.exports = router;
