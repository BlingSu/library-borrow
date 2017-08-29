var express = require('express')
var router = express.Router()
var db = require('../db')
var Book = db.Book


router.get('/list', (req, res) => {
    Book.find({})
    .then((data) => {
        res.render('books/list', {data:data})
    })
})

router.get('/get_data/:page?', (req, res) => {
    console.log(req)
    let currentPage = 1
    let pageSize = 10
    let keyWord = req.query.keyWord
    let filter = {}

    if (keyWord) {
        filter = { title: new RegExp(keyWord, 'i') }
    }
    if (req.params.page) {
        currentPage = Number(req.params.page)
    }
    if (currentPage <= 0) {
        currentPage = 1
    }
    /*
        limit 限制返回结果的数量
        skip 跳过前几个，返回其余
        sort 1正-1反
     */
    Book.find(filter).limit(pageSize).skip((currentPage - 1) * pageSize).sort({id:-1})
        .then((resp) => {
            console.log(data, '==========data')
            if (resp.length > 0) {
                res.json({ status: 'y', data: resp, current_page: currentPage })
            } else {
                res.json({ status: 'n', msg: '没有更多数据' })
            }
        })
        .catch((err) => {
            res.json({ status: 'n', data: [], msg: '获取数据失败' })
        })
})

module.exports = router
