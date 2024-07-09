const mongoose = require('mongoose')



const dataSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    description :{
        type: String,
        require:true
    },
    isbn :{
        type: String,
        require:true
    },
    authorName: {
        type: String,
        require: true
    },
    writtenYear: {
        type: String,
        require: true,
     
    }
})

module.exports = mongoose.model('Book', dataSchema)