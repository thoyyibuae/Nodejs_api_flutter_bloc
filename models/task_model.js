const mongoose = require('mongoose')

// int  ? id;
// String ? taskName;
// String ? taskDescription;
// String ? assignedPerson;


const dataSchema = new mongoose.Schema({

    id: {
        type: Number,
        require: true
    },
    taskName :{
        type: String,
        require:true
    },
    taskDescription :{
        type: String,
        require:true
    },
    assignedPerson: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Task', dataSchema)