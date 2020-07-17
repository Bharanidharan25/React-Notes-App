const Note = require('../models/note')


module.exports.listItem = (req,res)=>{
    Note.find()
    .then((notes)=>{
        res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
}


module.exports.getItem = (req,res)=>{
    const id = req.params.id
    Note.findById(id)
    .then((note)=>{
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.postItem = (req,res)=>{
    const body = req.body
    const note = new Note({title:body.title,body:body.body})
    note.save()
    .then((note)=>{
        res.json(note)
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.updateItem = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Note.findByIdAndUpdate(id,body,{new:true})
    .then(note =>{
        if(note){
            res.json(note)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}


module.exports.deleteItem = (req,res)=>{
    const id = req.params.id
    Note.findByIdAndDelete(id)
    .then(note=>{
        if(note){
            res.json(note)
        }else{
            res.json({})
        }
    })
    .catch(err =>{
        res.json(err)
    })
}