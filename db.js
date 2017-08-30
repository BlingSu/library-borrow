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

const Book = db.model('Book', bookSchema)
const Student = db.model('student', studentSchema)
const StudentBook = db.model('student_book', studentBookSchema)

module.exports = {
    Book: Book,
    Student: Student,
    StudentBook: StudentBook
}
