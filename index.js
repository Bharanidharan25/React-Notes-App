const express = require('express')
const route = require('./config/routes')
const port = 3010
const app = express()
app.use(express.json())
const connectDB = require('./config/database')
const cors = require('cors')

app.use(cors())
connectDB()
app.use('/',route)


app.listen(port,()=>{
    console.log('listening to port',port)
})