'use strict';
const express = require('express');
const router = express.Router();
const btoa = require('btoa');
const sha1 = require('sha1');
const mongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

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

  // console.log(req.query.JSON_Tovar);
  var sum = 0;
  for(let i = 0; i < JSON.parse(req.query.JSON_Tovar).length; i++){
    sum = sum + parseFloat(JSON.parse(req.query.JSON_Tovar)[i].price);
  }

  const pKey = "T9l51qLSTrMPTZDfDC7R3mneNT6cAU2MRYM3meOn";
  var json_string = {public_key:"i40058369372", version:"3", action:"pay", amount:"1", currency:"UAH", description:"test", order_id: makeid()};
  var data = btoa(JSON.stringify(json_string));
  var sign_string = pKey + data + pKey;
  var signature = btoa(sha1(sign_string, 1));


  mongoClient.connect(global.baseIP, function(err, client){
      const db = client.db(global.baseName);
      const config = db.collection("config");
      const menu  = db.collection(langMenu);
      const titles_page = db.collection("titles_page");

      if(err) return console.log(err);
      titles_page.find().toArray(function(err, results_titles_page){
        config.find().toArray(function(err, results_config){
         if(results_config[languageSystem].opens){
           menu.find().toArray(function(err, results_menu ){
             res.render('payment.ejs',{
               conf: results_config[languageSystem],
               menu: results_menu,
               title: results_titles_page[languageSystem].payment,
               sessionUser: req.session.user,
               datadata: data,
               signaturedata: signature,
             })
             client.close();
           });
         }else{
           res.render('close.ejs',{
             conf: results_config[languageSystem]
           })
         }
       });
     });
  });
});

module.exports = router;
