const express = require('express')
const router = express.Router()
const db = require('../../db')
const Student = db.Student
const StudentBook = db.StudentBook

/*
    获取页码
    currentPage 当前页
    pageCount   总页
 */

function getPages(currentPage, pageCount) {
    let [pages, left, right] = [[currentPage], currentPage-1, currentPage+1]

    while (pages.length < 15 && ( left >= 1 && right <= pageCount)) {
        if (let > 0) { pages.unshift(left--) }
        if (right <= pageCount) { pages.push(right++) }
    }
    return pages
}

router.get('/list/:page?', (req, res) => {
    let currentPage = 1
    if (req.params.page) {
        currentPage = req.params.page * 1
    }

    let pageCount = 1   //  总页数
    let pageSize = 10   //  每页10

    let filter = {}

    if (req.params.name) { filter.name = new RegExp(req.params.name, 'i') }

    if (req.params.mobile) { filter.name = new RegExp(req.params.mobile, 'i') }

    /* 数量 */
    let countStudent = Student.count(filter)
    countStudent.then(count => {
        console.log(count, '总记录数目')
        pageCount = Math.ceil(count / pageSize) // 总页数
        let pages = getPages(currentPage, pageCount)
        let findStudent = Student.find(filter)
            .limit(pageSize)
            .skip((currentPage -1) * pageSize)
            findStudent.then(data => {
                console.log(data, 'data')
                res.render('admin/student/list', { data: data, page: currentPage, pageCount: pageCount, pages: pages, query: req.query })
            })
            findStudent.catch(err => {
                console.log(err)
                res.render('error', { error: err })
            })
    })
    countStudent.catch(err => {
        console.log(err)
        res.render('error', { error: err })
    })
})

router.get('/add/:id?', (req, res) => {
    if (req.params.id) {
        student.findById(req.params.id, (err, data) => {
            let student
            if (err) {
                student = new Student()
            } else {
                student = data
            }
            res.render('admin/student/add', { data: student })
        })
    } else {
        var student = new Student()
        res.render('admin/student/add', { data: student })
    }
})

router.post('/add/:id', (req, res) => {
    let student = new Student(req.body)
    /* 新增数据，若存在则修改 */
    student.findByIdAndUpdate(req.params.id, req.body, {upsert: true}, (err, data) => {
        if (err) {
            console.dir(err)
            res.json({ status: 'n', message: '保存失败' })
        } else {
            res.json({ status: 'y', message: '保存成功' })
        }
    })
})

module.exports = router
