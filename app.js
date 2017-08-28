var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static('./www'))

_globalPath = __dirname

/* art-template */
const template = require('art-template')


app.get('/', (req, res) => { res.redirect('api/list') })

app.use('/api',require('./controllers/index'))

app.listen(3333, () => {
    console.log('the server is running in 3333~~~')
})
