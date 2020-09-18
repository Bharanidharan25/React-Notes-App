const express = require('express')
const path = require('path')
const route = require('./config/routes')
const connectDB = require('./config/database')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')


const publicPath = path.join(__dirname,'/ui/public')
const port = 3010
const app = express()
let server = http.createServer(app);
let io = socketIo(server);
global.io = io;


app.use(express.json())
app.use(express.static(publicPath));
app.use(cors())


connectDB()
app.use('/',route)

io.on('connection', (socket)=>{
    console.log('client Connected')
    socket.on('disconnect',() => console.log('client is disconnected'))
})

server.listen(port,()=>{
    console.log('listening to port',port)
})