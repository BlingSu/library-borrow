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

var Book = db.model('Book', bookSchema)

module.exports = {
    Book: Book
}
