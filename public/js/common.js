$.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^((1[3,5,7,8]{1}[0-9]{1})+[0-9]{8})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

$.validator.addMethod("qq", function(value, element) {
    var qq = /^[1-9]\d{4,9}$/;
    return this.optional(element) || (qq.test(value));
}, "qq号码格式错误");

// 全局ajax配置
$.ajaxSetup({
  complete:function(result){
    // console.log('ajax成功')
  },
  error:function(err){
    console.dir(err)
  },
  timeout:5000
})

$.validator.setDefaults({
  errorElement: "em", //错误信息显示的标签
  errorPlacement: function(error, element) {
      error.addClass("help-block");

      element.parents(".col-sm-5").addClass("has-feedback");

      if (element.prop("type") === "checkbox") {
          error.insertAfter(element.parent("label"));
      } else {
          error.insertAfter(element);
      }

      if (!element.next("span")[0]) {
          $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
      }
  },
  success: function(label, element) {
      if (!$(element).next("span")[0]) {
          $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
      }
  },
  highlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
      $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
  },
  unhighlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
      $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
  }
});
