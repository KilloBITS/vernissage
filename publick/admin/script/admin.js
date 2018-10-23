var ADMIN = {
  GLOBAL_FILE: "",
  NEW_TOVAR: false,
  STATISTIC: function(){
    $("#revenue-chart").empty();
    let aaa = Morris.Area({
      element   : 'revenue-chart',
      resize    : true,
      data      : [
        { y: '2018 Q1', item1: 1 },
        { y: '2018 Q2', item1: 10 },
        { y: '2018 Q3', item1: 22 },
        { y: '2018 Q4', item1: 18 },
        { y: '2018 Q1', item1: 28 },
      ],
      xkey      : 'y',
      ykeys     : ['item1'],
      labels    : ['Item 1'],
      lineColors: ['#a0d0e0'],
      hideHover : 'auto'
    });

    aaa.redraw()
  },
  CHANGE_TYPE: function(){
    $.post("/getMenu",{c: $("#tCategories").val()},(res) => {
      $("#tType option").remove();
      for (var i = 0; i < res.menu.podlink.length; i++) {
        var option = document.createElement("option");
        option.value = res.menu.podlink[i].types;
        option.text = res.menu.podlink[i].pname;
        $("#tType").append(option);
      }
      $("#tType").prepend("<option disabled selected>выберите тип</option>");
    })
  },
  CANCEL: function(){
    $("#EDIT_MODAL").fadeOut(200);
    $(".toEdit").hide();
    $("#tName,#tPrice,#tCategories,#tType,#tText").val("");
  },
  SAVE_GLOBAL: function(){
    let RU = {
      news_titleNEW_ru: $("#news_titleNEW_ru").val(),
      news_textNEW_ru: $("#news_textNEW_ru").val(),
      news_btnNEW_ru: $("#news_btnNEW_ru").val(),
      about_titleNEW_ru: $("#about_titleNEW_ru").val(),
      about_textNEW_ru: $("#about_textNEW_ru").val(),
      about_btnNEW_ru: $("#about_btnNEW_ru").val(),
      newsB_titleNEW_ru: $("#newsB_titleNEW_ru").val(),
      mail_titleNEW_ru: $("#mail_titleNEW_ru").val(),
      mail_textNEW_ru: $("#mail_textNEW_ru").val(),
      mail_btnNEW_ru: $("#mail_btnNEW_ru").val()
    }
    let UA = {
      news_titleNEW_ua: $("#news_titleNEW_ua").val(),
      news_textNEW_ua: $("#news_textNEW_ua").val(),
      news_btnNEW_ua: $("#news_btnNEW_ua").val(),
      about_titleNEW_ua: $("#about_titleNEW_ua").val(),
      about_textNEW_ua: $("#about_textNEW_ua").val(),
      about_btnNEW_ua: $("#about_btnNEW_ua").val(),
      newsB_titleNEW_ua: $("#newsB_titleNEW_ua").val(),
      mail_titleNEW_ua: $("#mail_titleNEW_ua").val(),
      mail_textNEW_ua: $("#mail_textNEW_ua").val(),
      mail_btnNEW_ua: $("#mail_btnNEW_ua").val()
    }

    $.post("/updateLocal",{ru: RU, ua: UA}, (res) => {
      console.log(res);
    });

  },
  SAVE:function(){
    $(".backet_load").fadeIn(100);
    if(ADMIN.NEW_TOVAR){
      let save_data = {
        title: $("#tName").val(),
        price: $("#tPrice").val(),
        category: parseInt($("#tCategories").val()),
        types: $("#tType").val(),
        text: $("#tText").val(),
      };

      let save_data_ua = {
        title: $("#tName_ua").val(),
        price: $("#tPrice").val(),
        category: parseInt($("#tCategories").val()),
        types: $("#tType").val(),
        text: $("#tText_ua").val(),
      };

      if(ADMIN.NEW_TOVAR){
        var url = '/setAdmTovar';
      }else{
        var url = '/UpdateAdmTovar';
      }
      $.post(url,{ru:save_data, ua:save_data_ua, file: ADMIN.GLOBAL_FILE},function(res){
        $(".backet_load").fadeOut(100);
      });
    }else{
      /** TO DO дописать дома!!! **/
    }

  },
  REMOVE: function(ai){
    $.post('/delAdmTovar',{d:ai},(res) => {
      console.log(res);
    });
  },
  EDIT: function(ai){
    ADMIN.NEW_TOVAR = false;
    $(".backet_load").fadeIn(100);
    $("#EDIT_MODAL").fadeIn(200);
    $.post('/getAdmTovar',{d:ai},(res) => {
      $(".toEdit").show();
      console.log(res);
      $("#tName").val(res.tovar_ru[0].title);
      $("#tName_ua").val(res.tovar_ua[0].title);
      /* для типа переборка и енаблед*/
      // $("#tType").val();
      /**/
      $("#tPrice").val(res.tovar_ru[0].price);
      /* проверка сале*/
      // $("#tSaleEnabled").attr();
      $("#tSale").val(res.tovar_ru[0].sale[1]);
      /**/
      $("#tImageDemo").attr("src","../../../data/tovar/"+res.tovar_ru[0].image);
      $("#tText").val(res.tovar_ru[0].text);
      $("#tText_ua").val(res.tovar_ua[0].text);


      $(".backet_load").fadeOut(100);
    });
  },
  DESIGHN: function(){
    $(".mini_load_demo").click(function(){
      let index = $('.mini_load_demo').index(this);
      $.post("/updateLoader",{i:index},(res) => {
        $("#newLoaders").css({"background-image":"url(../../../image/loaders/load"+index+".gif)"});
        $("#selectLoaders").click();
      })
    });
    $("#sendNewLogo").click(function(){
      $("#newLogotype").click();
    });
    $("#selectLoaders").click(function(){
      $(".list_loaders").toggle();
    });
  	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
  		$(this).toggleClass('open');
  	});
    $("#newTovar").click(function(){
      $("#EDIT_MODAL").fadeIn(200);
      ADMIN.NEW_TOVAR = true;
    });
    $('.menu_btn').click(function(){
      let index = $('.menu_btn').index(this);
      localStorage.setItem("click_menu",index);
      $('.menu_btn').removeClass("btnact");
      $('.menu_btn:eq('+index+')').addClass("btnact");
      $('.page').removeClass("active");
      $('.page:eq('+index+')').addClass("active");
    });
    $('.mobile_menu').click(function(){
      if(!$('.left_menu').hasClass('active')){
        $('.left_menu').addClass('active');
      }else{
        $('.left_menu').removeClass('active');
      }
    });
    // $('#example1').DataTable()
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': true,
      'searching'   : true,
      'ordering'    : true,
      'info'        : false,
      'autoWidth'   : true
    })
  },
  INIT: function(){
    ADMIN.DESIGHN();
    setInterval(function(){
      ADMIN.STATISTIC();
    },10000);
    $(".menu_btn:eq("+localStorage.getItem("click_menu")+")").click();
  }
};

$(document).ready(function(){
  ADMIN.INIT();
  ADMIN.STATISTIC();
/*Для загрузки изображений в товары*/
  file = document.getElementById('tFile');
  file.addEventListener('change', function () {
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
          };
          reader.readAsDataURL(this.files[0]);
      }
  }, false);

/*Для загрузки новой аватарки*/
  newLogotype = document.getElementById('newLogotype');
  newLogotype.addEventListener('change', function () {
    $("#visiblelogo").css({"background-image":" url(../../../image/loaders/load.gif)"});
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
              $("#visiblelogo").css({"background-image":" url("+res.img+")"});
            });
        };
        reader.readAsDataURL(this.files[0]);
    }
  }, false);




});
