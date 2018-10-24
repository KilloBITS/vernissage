'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());

var updateAva = (req, res, next) => {
  var base64Data = req.body.n.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,'');
  require("fs").writeFile("./publick/image/vernissageLogo.png", base64Data, 'base64', function(err) {
    console.log(err);
    res.send({code:500, img: req.body.n})
  });
};

var updateLoader = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const config  = db.collection("config");

   if(err) return console.log(err);

    config.update({},{ $set : { loader: "load"+req.body.i+".gif"}}, {multi: true});
    res.send({code:500});
    client.close();
  });
};

var updateLocal = (req, res, next) => {
  var a = req.body.ru;
  var b = req.body.ua;
  mongoClient.connect(global.baseIP ,function(err, client){
    const db = client.db(global.baseName);
    const config  = db.collection("config");

    if(err) return console.log(err);
    /* Для русского языка */
    config.update({LANG: "RU"},{ $set : { news_tovar: [a.news_titleNEW_ru, a.news_textNEW_ru, { btnTitle: a.news_btnNEW_ru, btnLink: "/shop"}]}});
    config.update({LANG: "RU"},{ $set : { about: [a.about_titleNEW_ru, a.about_textNEW_ru, { btnTitle: a.about_btnNEW_ru, btnLink: "/"}]}});
    config.update({LANG: "RU"},{ $set : { news: a.newsB_titleNEW_ru}});
    config.update({LANG: "RU"},{ $set : { contact: [a.mail_titleNEW_ru, a.mail_textNEW_ru]}});
    config.update({LANG: "RU"},{ $set : { input_submit: a.mail_btnNEW_ru}});
    // Для украинского языка
    config.update({LANG: "UA"},{ $set : { news_tovar: [b.news_titleNEW_ua, b.news_textNEW_ua, { btnTitle: b.news_btnNEW_ua, btnLink: "/shop"}]}});
    config.update({LANG: "UA"},{ $set : { about: [b.about_titleNEW_ua, b.about_textNEW_ua, { btnTitle: b.about_btnNEW_ua, btnLink: "/"}]}});
    config.update({LANG: "UA"},{ $set : { news: b.newsB_titleNEW_ua}});
    config.update({LANG: "UA"},{ $set : { contact: [b.mail_titleNEW_ua, b.mail_textNEW_ua]}});
    config.update({LANG: "UA"},{ $set : { input_submit: b.mail_btnNEW_ua}});

    res.send(req.body);
    client.close();
  });
};



router.post('/updateAva', updateAva, function(req, res, next){});
router.post('/updateLoader', updateLoader, function(req, res, next){});
router.post('/updateLocal', updateLocal, function(req, res, next){});


module.exports = router;
