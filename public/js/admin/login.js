$('#dataForm').validate({
    rules: {
        adminName: {
            required: true,
            minlength: 2
        },
        adminPassWord: {
            required: true,
            minlength: 2
        }
    },
    submitHandler: function (e) {
        console.log(e)
        $.ajax({
            method: 'post',
            url: $(e).attr('action'),
            data: $(e).serialize(),
            success: function (res) {
                if (res.status === 'y') {
                    window.location.href = '/admin/student/list';
                } else {
                    alert(res.message)
                }
            }
        })
    }
})
