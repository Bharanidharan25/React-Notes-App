const mongoose = require('mongoose')
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title:{type:String},
    body:{type:String},
    createdAt:{type:Date,default:Date.now()}
})

const Note = mongoose.model('Note',noteSchema)

module.exports = Note