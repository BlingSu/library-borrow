const express = require('express')
const router = express.Router()
const db = require('../db')
const Book = db.Book
const Student = db.Student
var StudentBook = db.StudentBook


router.get('/list', (req, res) => {
    if (req.cookies.user_id) {
        Book.find(req.cookies.id)
        .then(data => {
            res.render('books/list', { isLogined: true, user:data })
        })
    } else {
        res.render('books/list', { isLogined: false })
    }
})

router.get('/get_data/:page?', (req, res) => {
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
        .then(resp => {
            if (resp.length > 0) {
                res.json({ status: 'y', data: resp, current_page: currentPage })
            } else {
                res.json({ status: 'n', msg: '没有更多数据' })
            }
        })
        .catch(err => {
            res.json({ status: 'n', data: [], msg: '获取数据失败' })
        })
})


router.post('/pick', (req, res) => {
    if (req.cookies.user_id) {
        StudentBook.count({ user_id: req.cookies.user_id, book_id: req.body.id })
        .then(count => {
            if (count > 0) {
                res.json({ status: 'n', message: '您已借了这本书' })
            } else {
                let newBook = new StudentBook()
                newBook.user_id = req.cookies.user_id,
                newBook.book_id = req.body.id
                newBook.save()
                .then(data => {
                    if (data) {
                        console.log(data)
                    }
                    res.json({ status: 'y', message: '借书成功~~~' })
                })
            }
        })
    } else {
        res.json({ status: 'n', message: '请先登录!' })
    }
})

module.exports = router
