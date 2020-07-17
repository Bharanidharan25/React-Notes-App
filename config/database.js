const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/notes',{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected to db")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB
