var ADMIN = {
  GLOBAL_FILE: "",
  NEW_TOVAR: false,
  CHANGE_TYPE: function(){
    $.post("/getMenu",{c: $("#tCategories").val()},(res) => {
      // console.log(res.menu.podlink);
      $("#tType option").remove();
      for (var i = 0; i < res.menu.podlink.length; i++) {
        var option = document.createElement("option");
        option.value = res.menu.podlink[i].types;
        option.text = res.menu.podlink[i].pname;
        $("#tType").append(option);
      }
    })
  },
  CANCEL: function(){
    $("#EDIT_MODAL").fadeOut(200);
    $("#tName,#tPrice,#tCategories,#tType,#tText").val("");
  },
  SAVE:function(){
    $(".backet_load").fadeIn(100);
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
      text: $("#tText").val(),
    };

    if(ADMIN.NEW_TOVAR){
      var url = '/setAdmTovar';
    }else{
      var url = '/UpdateAdmTovar';
    }
    $.post(url,{ru:save_data, ua:save_data_ua, file: ADMIN.GLOBAL_FILE},function(res){
      $(".backet_load").fadeOut(100);
    });
  },
  REMOVE: function(ai){
    $.post('/delAdmTovar',{d:ai},(res) => {
      console.log(res);
    });
  },
  EDIT: function(ai){
    $.post('/getAdmTovar',{d:ai},(res) => {
      console.log(res);
    });
  },
  DESIGHN: function(){
  	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
  		$(this).toggleClass('open');
  	});
    $("#newTovar").click(function(){
      $("#EDIT_MODAL").fadeIn(200);
      ADMIN.NEW_TOVAR = true;
    });
    $('.menu_btn').click(function(){
      let index = $('.menu_btn').index(this);
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
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    })
  },
  INIT: function(){
    ADMIN.DESIGHN();
  }
};





$(document).ready(function(){
  ADMIN.INIT();

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

});
