const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()


/* art-template */
var template = require('art-template')
template.config('base', '')
template.config('extname', '.html')

app.engine('.html', template.__express)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

/* 模糊匹配 */
app.all('/admin/*',(req,res,next)=>{
    var path = req.path
    console.log(path)
    //如果当前访问的是管理后台的登陆页面,那么不需要判断是否登陆
    if( path == '/admin/login' ){
        next()
    }
    else {
        // 如果cookies中存在管理员信息
        console.log(req.cookies)
        if (req.cookies.admin_user_name) {
            next()
        }
        else {
            res.redirect('/admin/login')
        }
    }
})

app.get('/', (req, res) => { res.redirect('/books/list') })

app.use('/books/',require('./routes/books'))
app.use('/user/',require('./routes/user'))

app.use('/admin/login/',require('./routes/admin/admin_user'))
app.use('/admin/student/', require('./routes/admin/student'))


app.listen(3333, () => {
    console.log('the server is running in 3333~~~')
})
