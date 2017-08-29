/*
    登陆，注册
 */

var express = require('express')
var router = express.Router()
var db = require('../db')

router.get('/reg', (req, res) => {
    res.render('user/reg')
})


module.exports = router
