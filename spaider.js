var Crawler = require('crawler')

var db = require('mongoose')
db.connect('mongodb://localhost/books_db')

var Book = db.model('book', {
    title: String,
    description: String,
    img: String,
    link: String,
    price: String,
    author: String,
    publicsher: String
})

var spalider = new Crawler({
    maxConnections: 10,
    forceUTF8: true,
    incomingEncoding: 'gb2312',
    callback: function (err, res, $) {}
})
