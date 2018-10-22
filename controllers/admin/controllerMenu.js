'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());



var getMenuData = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const menu  = db.collection("menu");
   if(err) return console.log(err);
   menu.find( { categories: parseInt(req.body.c)}).toArray(function(err, results){
       res.send({code:500, menu: results[0]});
   });
  });
};

router.post('/getMenu', getMenuData, function(req, res, next){});


module.exports = router;
