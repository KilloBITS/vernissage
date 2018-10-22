'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());

var getAdmTovar = (req, res, next) => {
  mongoClient.connect(global.baseIP, function(err, client){
      const db = client.db(global.baseName);
      const config = db.collection("tovar");
      if(err) return console.log(err);
     config.find({ AI: parseInt(req.body.d)}).toArray(function(err, results_tovar){
       res.send({code: 500, tovarArr: results_tovar});

       // tovar.find( { AI: req.body.id}).toArray(function(err, results){
       //   tovar.updateOne({ AI: parseInt(req.body.d) },{
       //     $set: { popular: parseInt(req.body.ss) },
       //       $currentDate: { lastModified: true }
       //     });
       //     res.send({code:500});
       // });
     });
  });
};


var delAdmTovar = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const tovar  = db.collection("tovar");
   if(err) return console.log(err);
   tovar.find( { AI: req.body.id}).toArray(function(err, results){
     // tovar.updateOne({ AI: parseInt(req.body.d) },{
     //   $set: { popular: parseInt(req.body.ss) },
     //     $currentDate: { lastModified: true }
     //   });
       res.send({code:500});
   });
  });
};

var createFile = function(file,AI){
  var base64Data = file.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,'');
  require("fs").writeFile("./publick/data/tovar/tov"+AI+".jpg", base64Data, 'base64', function(err) {
    console.log(err);
  });
};

var createUA = function(data, ai){
  mongoClient.connect(global.baseIP, { useNewUrlParser: true } ,function(err, client){
    const db = client.db(global.baseName);
    const tovaruk  = db.collection("tovar-uk");
    if(err) return console.log(err);
    var NEW_TOVAR_UA = data;
    NEW_TOVAR_UA.availability = true;
    NEW_TOVAR_UA.sale = [false, "0"];
    NEW_TOVAR_UA.category = parseInt(NEW_TOVAR_UA.category),
    NEW_TOVAR_UA.popular = 5;
    NEW_TOVAR_UA.AI = ai;
    NEW_TOVAR_UA.image = "tov"+ai+".jpg";
    tovaruk.insertOne(NEW_TOVAR_UA);
  });
};

var createRU = function(data, ai){
  mongoClient.connect(global.baseIP, { useNewUrlParser: true } ,function(err, client){
    const db = client.db(global.baseName);
    const tovar  = db.collection("tovar");
    if(err) return console.log(err);
    var NEW_TOVAR = data;
    NEW_TOVAR.availability = true;
    NEW_TOVAR.sale = [false, "0"];
    NEW_TOVAR.category = parseInt(NEW_TOVAR.category),
    NEW_TOVAR.popular = 5;
    NEW_TOVAR.AI = ai;
    NEW_TOVAR.image = "tov"+ai+".jpg";
    tovar.insertOne(NEW_TOVAR);
  });
};

var setAdmTovar = (req, res, next) => {
  mongoClient.connect(global.baseIP, { useNewUrlParser: true } ,function(err, client){
    const db = client.db(global.baseName);
    const tovar  = db.collection("tovar");
    if(err) return console.log(err);
    tovar.find().sort({AI:-1}).limit(1).toArray(function(err, results_tovar ){
      var mainData = req.body;
      var NEXT_AI = results_tovar[0].AI + 1;
      createUA(mainData.ua, NEXT_AI);
      createRU(mainData.ru, NEXT_AI);
      createFile(mainData.file, NEXT_AI);
      res.send({code: 500});
    });
  });

};

router.post('/getAdmTovar', getAdmTovar, function(req, res, next){});

router.post('/delAdmTovar', delAdmTovar, function(req, res, next){});

router.post('/setAdmTovar', setAdmTovar, function(req, res, next){});

module.exports = router;
