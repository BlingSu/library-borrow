/* 数据 */

const express = require('express')
const db = require('mongoose')
db.connect('mongodb://localhost/books_db', {useMongoClient : true})

db.Promise = Promise

const Schema = db.Schema
const bookSchema = new Schema({
    title: String,
    img: String,
    link: String,
    price: String,
    author: String,
    publicsher: String
})

const studentSchema = new Schema({
    name: String,
    gender: String,
    birthday: {
        type: Date,
        default: Date.now()
    },
    user_name: String,
    pwd: String,
    mobile: String,
    email: String,
    address: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

/*
    ref的时候需要指定模型的名字即 db.model()中参数一的值
    mongoose通过population实现集合数据的关联
*/
const studentBookSchema = new Schema({
    booked_date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    }
})

// 日期
studentBookSchema.methods.getBookedDate = function() {
    return (`${this.booked_date.getFullYear()}-${this.booked_date.getMonth() + 1}-${this.booked_date.getDate()}  ${this.booked_date.getHours()}:${this.booked_date.getMinutes()}`)
}

/*
    通过methods,定义一个instance方法
    在模型的实例上进行调用
*/

studentSchema.methods.getAge = function() {
    return (new Date()).getFullYear() - this.birthday.getFullYear()
}

studentSchema.methods.getBirthday = function() {
    return (`${this.birthday.getFullYear()}-${this.birthday.getMonth() + 1}-${this.birthday.getDate()}`)
}

const Book = db.model('books', bookSchema)
const Student = db.model('student', studentSchema)
const StudentBook = db.model('student_book', studentBookSchema)

module.exports = {
    Book: Book,
    Student: Student,
    StudentBook: StudentBook
}
