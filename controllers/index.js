var express = require('express')
var router = express()
var db = require(_globalPath + '/db')
var Book = db.Book


router.get('/list', (req, res) => {
    Book.find({})
    .then((data) => {
        res.render('list', {data:data})
        console.log(data, 'list -> data')
    })
})


module.exports = router
