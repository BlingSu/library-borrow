$('#dataForm').validate({
    rules:{
        name:{
          required:true,
          minlength:2
        },
        email:{
          email:true,
          required:true,
        },
        birthday:{
          required:true,
          dateISO:true
        },
        mobile:{
          isMobile:true,
          required:true
        },
        address:{
          required:true,
        }
    },
    submitHandler: function(e) {
        console.log(e)
        $.ajax({
            method: 'post',
            url: $(e).attr('action'),
            data: $(e).serialize(),
            success: function(res) {
                if (res.status == 'y') {
                    window.location.href = '/admin/student/list'
                }
            }
        })
    }
})
