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

router.post('/')

module.exports = router
