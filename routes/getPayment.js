'use strict';
const express = require('express');
const router = express.Router();
const btoa = require('btoa');
const sha1 = require('sha1');
const mongoClient = require("mongodb").MongoClient;
const TelegramBot = require('node-telegram-bot-api');
// const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var adminIDs = [404616351, 602865793];
var SendToTelega = function(ZAKAZ_TO_TELEGA){
  const token = '787774114:AAFy7_6RBnbwPJqJjaDG7t08-Ih_54ns1PQ';
  const botTelega = new TelegramBot(token, {polling: true});
  var dataTelPay = 'Новый заказ!\n\nНомер телефона: '+ZAKAZ_TO_TELEGA.number+'\nID Заказа: '+ZAKAZ_TO_TELEGA.id+'\nФИО заказчика'+ZAKAZ_TO_TELEGA.FIO+'\nДата заказа: '+ZAKAZ_TO_TELEGA.today+'\nСумма заказа: '+ZAKAZ_TO_TELEGA.summa+'\nПолучено бонусов: '+ZAKAZ_TO_TELEGA.bonus+'\nТип оплаты: '+ZAKAZ_TO_TELEGA.PAYS+'\nСтатус заказа: '+'Новый'+'\nПосмотреть чек заказа: '+ 'http://ladyman.club/delivery?'+ZAKAZ_TO_TELEGA.id;
  for(let i = 0; i < adminIDs.length; i++){
    botTelega.sendMessage(adminIDs[i], dataTelPay);
  }
}

router.get('/', function(req, res, next){
  var sum = 0;
  // console.log(JSON.parse(req.query.JSON_Tovar))
  for(let i = 0; i < JSON.parse(req.query.JSON_Tovar).length; i++){
    sum = sum + (parseFloat(JSON.parse(req.query.JSON_Tovar)[i].data.price) * parseFloat(JSON.parse(req.query.JSON_Tovar)[i].length));
  }
  console.log(sum)

  var lmCoin = (parseInt(sum) / 100);
  if(lmCoin > 1){
    if (req.session && req.session.user !== undefined){
      mongoClient.connect(global.baseIP, function(err, client){
        const db = client.db(global.baseName);
        const users = db.collection("USERS");
        users.find({email: req.session.user}).toArray(function(err, results_users){
          var curCoin = results_users[0].LM_COIN + parseInt(lmCoin);
          users.update( { email: req.session.user }, { $set : { LM_COIN: curCoin } });
        });
      });
    }
  }

  mongoClient.connect(global.baseIP, function(err, client){
    const db = client.db(global.baseName);
    const config = db.collection("CONFIG");
    const locale = db.collection("LOCALE");
    const payments = db.collection("PAYMENTS");
    const users = db.collection("USERS");

    if(err) return console.log(err);
    locale.find().toArray(function(err, resLocale){
      config.find().toArray(function(err, resConfig){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();

        if(dd<10) {
          dd = '0'+dd
        }

        if(mm<10) {
          mm = '0'+mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        var NEW_ZAKAZ = {};
        NEW_ZAKAZ.number = req.query.phoneNum;
        NEW_ZAKAZ.id =  makeid();
        NEW_ZAKAZ.FIO = req.query.foname + ' ' + req.query.name + ' ' + req.query.FamName;
        NEW_ZAKAZ.today = today;
        NEW_ZAKAZ.summa = sum;
        NEW_ZAKAZ.bonus = lmCoin;
        if(parseInt(req.query.oplatatype) === 0){
          NEW_ZAKAZ.PAYS = 'Оплата наличными';
        }
        if(parseInt(req.query.oplatatype) === 1){
          NEW_ZAKAZ.PAYS = 'Оплата картой';
        }      
        NEW_ZAKAZ.PAYS_S = 'Не оплачено';
        NEW_ZAKAZ.status = 0;
        NEW_ZAKAZ.TTH = null;
        NEW_ZAKAZ.tovars = JSON.parse(req.query.JSON_Tovar);

        if(parseInt(req.query.dosttype) === 0){
          NEW_ZAKAZ.dostavka = "Самовывоз";
          NEW_ZAKAZ.adress = "Самовывоз";
        }

        if(parseInt(req.query.dosttype) === 1){
          NEW_ZAKAZ.dostavka = "Доставка курьером";
          NEW_ZAKAZ.adress = 'Город:' + "Львов" + ', Улица:' + req.query.ulica + ', Дом:' + req.query.dom + ', Квартира:' + req.query.kvartira;
        }
        if(parseInt(req.query.dosttype) === 2){ 
          NEW_ZAKAZ.dostavka = "Доставка новой почтой";
          NEW_ZAKAZ.adress = 'Город:' + req.query.city + ', Отделение:' + req.query.otdelenieNP;
        }
        if(parseInt(req.query.dosttype) === 3){

        }
        payments.insertOne(NEW_ZAKAZ);

        if (req.session && req.session.user !== undefined){
          users.find({email: req.session.user}).toArray(function(err, results_users){
            results_users[0].payments.push(NEW_ZAKAZ.id);
            users.update({email: req.session.user},{ $set : { payments: results_users[0].payments}});
          });
        }
        SendToTelega(NEW_ZAKAZ);
        global.sendSMS(req.query.phoneNum.replace(/[^-0-9]/gim,''));
        res.redirect("/delivery?"+NEW_ZAKAZ.id);
      });
    });
  });
});

module.exports = router;

    // const pKey = "T9l51qLSTrMPTZDfDC7R3mneNT6cAU2MRYM3meOn";
    // var json_string = {public_key:"i40058369372", version:"3", action:"pay", amount:"1", currency:"UAH", description:"test", order_id: makeid()};
    // var data = btoa(JSON.stringify(json_string));
    // var sign_string = pKey + data + pKey;
    // var signature = btoa(sha1(sign_string, 1));
    //
    // mongoClient.connect(global.baseIP, function(err, client){
    //     const db = client.db(global.baseName);
    //     const config = db.collection("config");
    //     const menu  = db.collection(langMenu);
    //     const titles_page = db.collection("titles_page");
    //
    //     if(err) return console.log(err);
    //     titles_page.find().toArray(function(err, results_titles_page){
    //       config.find().toArray(function(err, results_config){
    //        if(results_config[languageSystem].opens){
    //          menu.find().toArray(function(err, results_menu ){
    //            res.render('payment.ejs',{
    //              conf: results_config[languageSystem],
    //              menu: results_menu,
    //              title: results_titles_page[languageSystem].payment,
    //              sessionUser: req.session.user,
    //              datadata: data,
    //              signaturedata: signature,
    //              isAdm: req.session.admin
    //            })
    //            client.close();
    //          });
    //        }else{
    //          res.render('close.ejs',{
    //            conf: results_config[languageSystem],
    //            isAdm: req.session.admin
    //          })
    //        }
    //      });
    //    });
    // });