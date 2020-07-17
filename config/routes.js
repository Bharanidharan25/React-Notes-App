const express = require('express')
const route = express.Router()
const noteController = require('../app/controllers/noteController')

route.get('/notes',noteController.listItem)
route.get('/notes/:id',noteController.getItem)
route.post('/notes',noteController.postItem)
route.delete('/notes/:id',noteController.deleteItem)
route.put('/notes/:id',noteController.updateItem)



module.exports = route