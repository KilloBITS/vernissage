'use strict';
const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;

router.get('/*', function(req, res, next){
  var DA = req.url.split('?')[1];
  mongoClient.connect(global.baseIP, function(err, client){
    const db = client.db(global.baseName);
    const payments = db.collection("PAYMENTS");
    const locale = db.collection("LOCALE");
    const users = db.collection("USERS");
    const menu = db.collection("MENU");
    const contacts = db.collection("CONTACTS");
    const config = db.collection("CONFIG");

    if(err) return console.log(err);

    locale.find().toArray(function(err, resLocale){
      users.find({email: (req.session.user === undefined)?false:req.session.user}).toArray(function(err, resUsers){
        menu.find().sort({isEnded: 1}).toArray(function(err, resMenu){
          payments.find({id: DA}).toArray(function(err, resPayments){              
            contacts.find().toArray(function(err, resContacts){
              config.find().toArray(function(err, resConfig){
                global.visitors(req);
                res.render('pages/delivery.ejs',{
                  isAdm: req.session.admin,
                  sessionUser: resUsers[0],
                  locale: resLocale[0][global.parseLanguage(req)].index,
                  menu: resMenu,
                  globalLocale:  resLocale[0][global.parseLanguage(req)],
                  contacts: resContacts[0],
                  numLang: global.parseNumLang(req),
                  data: resPayments[0],
                  config: resConfig[0],
                });                    
              });
            });              
          });          
        }); 
      }); 
    }); 
  });
});

module.exports = router;
