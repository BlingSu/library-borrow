var Crawler = require('crawler')

var db = require('mongoose')
db.connect('mongodb://localhost/books_db', { useMongoClient: true })

var Book = db.model('book', {
    title: String,
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
    callback: function (error, res, done) {
        if (error) {
            console.log(error)
        } else {
            var $ = res.$
            var book = new Book()
            $('.bang_list li').each(function (index, item) {
                book.title = $(item).find('.name a').text()
                book.img = $(item).find('.pic a img').attr('src')
                book.link = $(item).find('.pic a').attr('href')
                book.price = Number(($(item).find('.price p span').eq(0).text()).replace('¥', ''))
                book.author = $(item).find('.publisher_info a').eq(0).attr('title')
                book.publisher = $(item).find('.publisher_info a').last().text()
                book.save(err => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('save is ok')
                    }
                })
                done()
            })
        }
    }
})

var arr = []

for (let i = 0; i < 25; i++) {
    arr[i] = 'http://bang.dangdang.com/books/newhotsales/1-'+(i+1);
    spalider.queue(arr)
}

