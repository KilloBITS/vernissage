'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.get('/', function(req, res, next){
  var languageSystem, langMenu;
  if(req.cookies.vernissageLang === undefined){
    languageSystem = 0;
    langMenu = 'menu';
  }else{
    if(req.cookies.vernissageLang === 'ua'){
      languageSystem = 1;
      langMenu = 'menu-uk';
    }else{
      languageSystem = 0;
      langMenu = 'menu';
    }
  }
  
   res.render('login.ejs')
});

module.exports = router;
