/*
    登陆，注册
 */

const express = require('express')
const router = express.Router()
const db = require('../db')
const Student = db.Student

router.get('/reg', (req, res) => {
    let student = new Student()
    res.render('user/reg', { data: student })
})

router.post('/reg/:id', (req, res) => {
    Student.findOne({ user_name: req.body.user_name})
    .then((resp) => {
        if (resp) {
            res.json({ status: 'n', message: '用户名已存在~' })
        } else {
            /* 保存注册信息 */
            Student.findByIdAndUpdate(req.params.id, req.body, { upsert: true }) //true为creat
            .then((data) => {
                console.log(data, '==data')
                if (data) {
                    res.json({ status: 'n', message: '注册失败' })
                } else {
                    res.json({ status: 'y', message: '注册成功'})
                }
            })
        }
    })
})

module.exports = router
