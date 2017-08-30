$('#dataForm').validate({
    rules: {
        userName: {
            required: true,
            minlength: 2
        },
        userPWD: {
            required: true,
            minlength: 2
        }
    },
    submitHandler: function (e) {
        $.ajax({
            method: 'post',
            url: $(e).attr('action'),
            data: $(e).serialize(),
            success: function (res) {
                if (res.status == 'y') {
                    alert(res.msg);
                    window.location.reload();
                }
                else{
                    alert(res.msg);
                }
            }
        })
    }
})
