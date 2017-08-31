const express = require('express')
const router = express.Router()
const db = require('../../db')

let gloabAdmin = [
    { adminName: 'admin', adminPassWord: 'admin' },
    { adminName: 'adminadmin', adminPassWord: 'adminadmin'}
]

router.get('/', (req, res) => {
    res.render('admin/admin_user/login')
})

router.post('/', (req, res) => {
    let admin_name = req.body.adminName
    let admin_pwd = req.body.adminPassWord
    let result = gloabAdmin.forEach(item => {
        if (item.adminName == admin_name) {
            return item
        }
    })
    if (result) {
        if (result.adminPassWord == admin_pwd) {
            let timeSpan = new Date(Date.now() + 24 * 60 * 60 * 1000 * 10)
            res.cookie('admin_user_name', admin_name, { path: '/', expires: timeSpan })
            res.json({ status: 'y', message: '登陆成功' })
        } else {
            res.json({ status: 'n', message: '密码错误' })
        }
    } else {
        res.json({ status: 'n', message: '用户不存在' })
    }
})

module.exports = router
