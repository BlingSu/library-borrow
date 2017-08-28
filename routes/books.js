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
})

module.exports = router
