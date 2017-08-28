var express = require('express')
var path = require('path')

var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))


/* art-template */
var template = require('art-template')
template.config('base', '')
template.config('extname', '.html')
app.engine('.html', template.__express)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')


app.get('/', (req, res) => {
    res.send('成功搭起页面')
})

app.listen(6666, () => {
    console.log('the server is running in 6666~~~')
})
