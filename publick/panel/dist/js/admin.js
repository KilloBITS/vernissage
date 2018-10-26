var ADMIN = {
  GLOBAL_FILE: "",
  NEW_TOVAR: false,
  EDIT_TYPE: '',
  EDIT_AI_SELECT: 0,
  EDIT_IMAGE: '',
  SAVE_NEW_TOVAR:function(){

      let save_data = {
        title: $("#tName").val(),
        price: $("#tPrice").val(),
        category: parseInt($("#tCategories").val()),
        types: $("#tType").val(),
        text: $("#tText").val(),
        sale: [$("#tSaleEnabled").is(':checked'), $("#tSale").val()]
      };

      let save_data_ua = {
        title: $("#tName_ua").val(),
        price: $("#tPrice").val(),
        category: parseInt($("#tCategories").val()),
        types: $("#tType").val(),
        text: $("#tText_ua").val(),
        sale: [$("#tSaleEnabled").is(':checked'), $("#tSale").val()]
      };

      var url = '/setAdmTovar';

      console.log(save_data);
      console.log(save_data_ua);
      $.post(url,{ru:save_data, ua:save_data_ua, file: ADMIN.GLOBAL_FILE, te: ADMIN.NEW_TOVAR, ai:ADMIN.EDIT_AI_SELECT},function(res){
          ADMIN.CANCEL();

      });
  },
  EDIT_TOVAR: function(ai){
    ADMIN.NEW_TOVAR = false;
    ADMIN.EDIT_AI_SELECT = parseInt(ai);
      $('#modal-info').modal('show')
      $.post('/getAdmTovar',{d:ai},(res) => {
        console.log(res);
        $("#tName").val(res.tovar_ru[0].title);
        $("#tName_ua").val(res.tovar_ua[0].title);

        $("#tCategories").val(res.tovar_ru[0].category).change();
        ADMIN.EDIT_TYPE = res.tovar_ru[0].types;

        $("#tPrice").val(res.tovar_ru[0].price);
        if(res.tovar_ru[0].sale[0]){
          $("#tSaleEnabled").attr("checked",true);
          $("#tSale").val(res.tovar_ru[0].sale[1]).removeAttr("disabled");
        }else{
          $("#tSaleEnabled").removeAttr("checked");
          $("#tSale").val(0).attr("disabled",true);
        }
        /**/
        $("#tImageDemo").attr("src","../../../data/tovar/"+res.tovar_ru[0].image);
        ADMIN.EDIT_IMAGE = res.tovar_ru[0].image;
        $("#tText").val(res.tovar_ru[0].text);
        $("#tText_ua").val(res.tovar_ua[0].text);
      });
  },
  SAVE_LOCAL_TOVAR: function(){
    let RU = {
      btn_shopDetails: $("#btn_shopDetails").val(),
      btn_shopbas: $("#btn_shopbas").val(),
    }
    let UA = {
      btn_shopDetails_ua: $("#btn_shopDetails_ua").val(),
      btn_shopbas_ua: $("#btn_shopbas_ua").val(),
    }

    $.post("/updateLocalTovar",{ru: RU, ua: UA}, (res) => {
      console.log(res);
    });
  },
  SAVE_LOCAL_INDEX: function(){
    let RU = {
      news_titleNEW_ru: $("#news_titleNEW_ru").val(),
      news_textNEW_ru: $("#news_textNEW_ru").val(),
      news_btnNEW_ru: 'Посмотреть больше',
      about_titleNEW_ru: $("#about_titleNEW_ru").val(),
      about_textNEW_ru: $("#about_textNEW_ru").val(),
      about_btnNEW_ru: $("#about_btnNEW_ru").val(),
      newsB_titleNEW_ru: 'Детальнее',
      mail_titleNEW_ru: $("#mail_titleNEW_ru").val(),
      mail_textNEW_ru: $("#mail_textNEW_ru").val(),
      mail_btnNEW_ru: 'Отправить сообщение'
    }
    let UA = {
      news_titleNEW_ua: $("#news_titleNEW_ua").val(),
      news_textNEW_ua: $("#news_textNEW_ua").val(),
      news_btnNEW_ua: 'Подивитись більше',
      about_titleNEW_ua: $("#about_titleNEW_ua").val(),
      about_textNEW_ua: $("#about_textNEW_ua").val(),
      about_btnNEW_ua: 'Детальніше',
      newsB_titleNEW_ua: $("#newsB_titleNEW_ua").val(),
      mail_titleNEW_ua: $("#mail_titleNEW_ua").val(),
      mail_textNEW_ua: $("#mail_textNEW_ua").val(),
      mail_btnNEW_ua: 'Відправити повідомлення',
    }

    $.post("/updateLocal",{ru: RU, ua: UA}, (res) => {
      console.log(res);
    });
  },
  SITE_STATUS: function(s){
    $.post("/siteStatus",{status: s}, (res) => {
      console.log(res);
    })
  },
  SAVE_TITLE: function(){
    var T = {
      title_ua: $("#edit_title_ua").val(),
      title_ru: $("#edit_title_ru").val()
    };

    $.post("/saveTitle",T,(res) => {
      console.log(res);
    });
  },
  CHANGE_TYPE: function(){
    $.post("/getMenu",{c: $("#tCategories").val()},(res) => {
      $("#tType option").remove();
      console.log(res)
      if(res.menu.podlink.length > 1){
        $("#tType").attr("disabled",false).removeAttr("style")
        for (var i = 0; i < res.menu.podlink.length; i++) {
          var option = document.createElement("option");
          option.value = res.menu.podlink[i].types;
          option.text = res.menu.podlink[i].pname;
          $("#tType").append(option);
        }
        $("#tType").prepend("<option disabled selected>выберите тип</option>");
        if(!ADMIN.NEW_TOVAR){
        // }else{
          $("#tType").val(ADMIN.EDIT_TYPE).change();
        }
      }else{
        $("#tType").attr("disabled",true).css({"background-color":"silver"})
      }
    })
  },
  CANCEL: function(canWin){
    switch(canWin){
      case 0:

        $('#modal-info').modal('hide')
        $("#tName,#tPrice,#tCategories,#tType,#tText,#tText_ua,#tName_ua").val("");
      break;
      case 1:
        $("#EDIT_MODAL_OF_CATEGORY").fadeOut(100);
        $("#TPlinkName_RU,#TPlinkName_UA").val("");
      break;
    }

  },
  CHART_SALES_STATISTICS: function(){
    $.post('/getCounters',function(res){
      // console.log(res);
      var countdata = res.counters_data;
      // var paysdata = res.paysdata_data;
      var line_chart = [];
      for(let i = 0; i < countdata.length; i++){
        line_chart.push({date: countdata[i].date, value: countdata[i].list.length });
      }
      $("#line-chart").empty();
      var line = new Morris.Line({
        element          : 'line-chart',
        resize           : true,
        data             : line_chart,
        xkey             : 'date',
        ykeys           : ['value'],
        labels           : ['Value'],
        lineColors       : ['#000'],
        lineWidth        : 2,
        hideHover        : 'auto',
        gridTextColor    : '#fff',
        gridStrokeWidth  : 0.4,
        pointSize        : 4,
        pointStrokeColors: ['#efefef'],
        gridLineColor    : '#efefef',
        gridTextFamily   : 'Open Sans',
        gridTextSize     : 10
      });
      line.redraw();
    });
    $("#revenue-chart").empty();
    let revenue = Morris.Area({
      element   : 'revenue-chart',
      resize    : true,
      data      : [
        { y: '2018 Q1', item1: 1 },
        { y: '2018 Q2', item1: 10 },
        { y: '2018 Q3', item1: 22 },
        { y: '2018 Q4', item1: 18 },
        { y: '2018 Q5', item1: 28 },
        { y: '2018 Q5', item1: 28 },
        { y: '2018 Q5', item1: 28 },
      ],
      xkey      : 'y',
      ykeys     : ['item1'],
      labels    : ['Item 1'],
      lineColors: ['#a0d0e0'],
      hideHover : 'auto'
    });
    revenue.redraw()


  },
  BUTTONS: function(){
    $(".miniClick").click(function(){
      let index = $(".miniClick").index(this);
      $(".miniClick").removeClass("active");
      $(".miniClick:eq("+index+")").addClass("active");

      $(".pageOfPanel").removeClass("pageActive");
      $(".pageOfPanel:eq("+index+")").addClass("pageActive");
    });
  },
  SCRIPTS:function(){
    /*Для загрузки изображений в товары*/
      file = document.getElementById('tFile');
      file.addEventListener('change', function () {
        // $("#tImageDemo").css({"background-image":" url(../../../image/loaders/load.gif)"});
        $("#tImageDemo").attr("src","../../../image/loaders/load.gif")
          var fullPath = file.value;
          var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
          var filename = fullPath.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
              filename = filename.substring(1);
          }

          if (this.files && this.files[0]) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  ADMIN.GLOBAL_FILE = e.target.result;
                  $("#tImageDemo").attr("src",ADMIN.GLOBAL_FILE)
                  // $("#tImageDemo").css({"background-image":" url("+ADMIN.GLOBAL_FILE+")"});
              };
              reader.readAsDataURL(this.files[0]);
          }
      }, false);
    /*Для загрузки новой аватарки*/
      newLogotype = document.getElementById('newLogotype');
      newLogotype.addEventListener('change', function () {
        // $("#visiblelogo").css({"background-image":" url(../../../image/loaders/load.gif)"});
        var fullPath = newLogotype.value;
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                ADMIN.GLOBAL_FILE = e.target.result;
                $.post('/updateAva',{n: ADMIN.GLOBAL_FILE},(res) => {
                  $("#vis_logo").attr("src", res.img);
                });
            };
            reader.readAsDataURL(this.files[0]);
        }
      }, false);

      $('#example1').DataTable({
        'paging'      : true,
        'lengthChange': true,
        'searching'   : true,
        'ordering'    : true,
        'info'        : true,
        'autoWidth'   : true
      });
  }
};

$(document).ready(function(){
  ADMIN.BUTTONS();
  ADMIN.SCRIPTS();
  ADMIN.CHART_SALES_STATISTICS();
});
