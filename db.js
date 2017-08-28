/* 数据 */

var express = require('express')
var db = require('mongoose')
db.connect('mongodb://localhost/books_db')


var Schema = db.Schema

var blogSchema = new Schema({
    title: String,
    img: String,
    link: String,
    price: String,
    author: String,
    publicsher: String
})

var Blog = db.model('Blog', blogSchema)

module.exports = {
    Blog: Blog
}
