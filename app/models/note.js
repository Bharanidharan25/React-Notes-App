const mongoose = require('mongoose')
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title:{type:String},
    body:{type:String},
    color:{type:Object,default:{r:0,g:0,b:0,a:0}},
    createdAt:{type:Date,default:Date.now()}
})

const Note = mongoose.model('Note',noteSchema)

module.exports = Note