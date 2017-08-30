/* 数据 */

var express = require('express')
var db = require('mongoose')
db.connect('mongodb://localhost/books_db', {useMongoClient : true})

db.Promise = Promise

var Schema = db.Schema
var bookSchema = new Schema({
    title: String,
    img: String,
    link: String,
    price: String,
    author: String,
    publicsher: String
})

var studentSchema = new Schema({
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

var Book = db.model('Book', bookSchema)
var Student = db.model('student', studentSchema)

module.exports = {
    Book: Book,
    Student: Student
}
