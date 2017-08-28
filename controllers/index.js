var express = require('express')
var db = require(_globalPath + '/db')
console.log(db, 'db -> index.js')
var router = express()

var blog = db.blog

router.get('/list', (req, res) => {
    blog.find({})
    .then((data) => {
        res.render('list', {data:data})
        console.log(data, 'list -> data')
    })
})
