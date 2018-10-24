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


var addCategory = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const menu  = db.collection("menu");
   const menuuk  = db.collection("menu-uk");
   if(err) return console.log(err);

   menu.find().sort({categories:-1}).limit(1).toArray(function(err, results_menu ){
     var next = results_menu[0].categories + 1;
     let newMenuUk = { name: req.body.name_ua ,podlink: ["/"], glink: '/shop?c='+next, categories: parseInt(next)};
     let newMenuRu = { name: req.body.name_ru ,podlink: ["/"], glink: '/shop?c='+next, categories: parseInt(next)};
     menu.insertOne(newMenuRu);
     menuuk.insertOne(newMenuUk);
     res.send({code:500});
   });
  });
};

router.post('/getMenu', getMenuData, function(req, res, next){});

router.post('/addCategory', addCategory, function(req, res, next){});


module.exports = router;
