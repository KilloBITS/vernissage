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
     menu.find().sort({index:-1}).limit(1).toArray(function(err, results_menu2 ){
       var next = results_menu[0].categories + 1;

       let newMenuUk = {
         name: req.body.cat_name_ua,
         podlink: ["/"],
         glink: req.body.test_url,
         categories: parseInt(next),
         edited: true,
         index: parseInt(results_menu2[0].index) + 1
       };

       let newMenuRu = {
         name: req.body.cat_name_ru,
         podlink: ["/"],
         glink: req.body.test_url,
         categories: parseInt(next),
         edited: true,
         index: parseInt(results_menu2[0].index)+1
       };

       menu.insertOne(newMenuRu);
       menuuk.insertOne(newMenuUk);
       res.send({code:500});
     });
  });
});
};
var maxAImenu = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const menu  = db.collection("menu");

   if(err) return console.log(err);

   menu.find().toArray(function(err, results_menu ){
     res.send({code:500, ml: results_menu.length});
   });
  });
};
var removecategory = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const menu  = db.collection("menu");
   const menuuk  = db.collection("menu-uk");

   var myquery = { index: parseInt(req.body.index) };
   menu.remove(myquery, function(err, obj) {
     if (err) throw err;
     console.log(obj.result.n + " category UA deleted");
   });

   menuuk.remove(myquery, function(err, obj) {
     if (err) throw err;
     console.log(obj.result.n + " category RU deleted");
   });

   res.send({code: 500});
  });



};
router.post('/getMenu', getMenuData, function(req, res, next){});
router.post('/addCategory', addCategory, function(req, res, next){});
router.post('/maxAImenu', maxAImenu, function(req, res, next){});
router.post('/removecategory', removecategory, function(req, res, next){});





module.exports = router;
