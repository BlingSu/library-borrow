$('#dataForm').validate({
    rules: {
        user_name: {
            required: false,
            minlength: 2
        },
        pwd:{
            required: false,
            minlength: 6
        },
        rePWD:{
            required: false,
            minlength: 6,
            equalTo:'#pwd'
        },
        name: {
            required: false,
            minlength: 2
        },
        email: {
            email: false,
            required: false,
        },
        birthday: {
            required: false,
            dateISO: false
        },
        mobile: {
            isMobile: false,
            required: false
        },
        address: {
            required: false,
        }
    },
    submitHandler: function(e) {
        console.log(e, '==========e')
        $.ajax({
            method: 'post',
            url: $(ele).attr('action'),
            data: $(ele).serialize(),
            success: function (res) {
                console.log(res)
                // if (res.status == 'y') {
                //     alert(res.msg)
                //     window.location.href = '/user/user_info'
                // }
                // else {
                //     alert(res.msg)
                // }
            }
        })
    }
})
