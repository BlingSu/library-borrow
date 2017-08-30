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
    .then(resp => {
        if (resp) {
            res.json({ status: 'n', message: '用户名已存在~' })
        } else {
            /* 保存注册信息 */
            Student.findByIdAndUpdate(req.params.id, req.body, { upsert: true }) //true为creat
            .then(data => {
                console.log(data, '==data')
                if (data) {
                    res.json({ status: 'n', message: '注册失败' })
                } else {
                    /*
                        设置cookie过期时间10天， 保存用户id信息
                        expires 当前开始计算
                     */
                    let time = new Date(Date.now() + 24 * 60 * 60 * 1000 * 10)
                    res.cookie('user_id', req.params.id, { path: '/', expires: time })
                    res.json({ status: 'y', message: '注册成功'})
                }
            })
        }
    })
})

router.get('/user_info', (req, res) => {
    Student.findById(req.cookies.user_id)
    .then(resp => {
        if (resp) {
            console.log(resp)
        } else {
            res.redirect('/user/login')
        }
    })
    .catch(err => {
        console.log(err)
        re.redirect('/user/login')
    })
})

router.get('/login', (req, res) => {
    Student.findById(req.cookies.user_id)
    .then(data => {
        console.log(data)
        if (data) {
            res.redirect('/user/user_info')
        }
        else {
            res.render('user/login')
        }
    })
})

router.post('/login', (req, res) => {
    Student.findOne({ user_name: req.body.userName })
    .then(res => {
        console.log(res , 'res')
        if (res) {
            if (res.pwd === req.body.userPWD) {
                let timeSpan = new Date(Date.now() + 24 * 60 * 60 * 1000 * 10)
                res.cookie('user_id', res.id, { path: '/', expires: timeSpan })
                res.json({ status: 'y', message: '登录成功'})
            } else {
                res.json({ status: 'n', message: '密码错误' })
            }
        } else {
            res.json({ status: 'n', message: '用户信息不存在，请先注册' })
        }
    })
})

module.exports = router
