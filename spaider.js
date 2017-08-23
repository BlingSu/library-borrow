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
    callback: function (err, res, $) {
        $('.bang_list li').each(function (index, item) {
            var book = new Book()
            book.title = $(item).find('.name a').text()
            book.img = $(item).find('.pic a img').attr('src')
            book.link = $(item).find('.pic a').attr('href')
            book.price = Number(($(item).find('.price p span').eq(0).text()).replace('¥', ''))
            book.author = $(item).find('.publisher_info a').eq(0).attr('title')
            book.publisher = $(item).find('.publisher_info a').last().text()
        })
        book.save((err => {
            if (err) { console.log(err) }
                else { console.log('save is ok') }
        })
    }
})
