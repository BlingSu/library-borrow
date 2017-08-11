var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send('成功搭起页面')
})

app.listen(4000, () => {
    console.log('the server is running in 4000~~~')
})
