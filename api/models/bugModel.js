const mongoose = require('mongoose'); 

const bugSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User",
    },
    description: {
        type: String, 
        required: [true, 'Please add a description'],
    },
    state: {
        type: String, 
        required: [true, 'states: New, Assigned, Complete, Cancelled'],
    }, 
    priority: {
        type: String, 
        required: [true, 'Pirority: Blocker, High, Medium, Low'],
    }
}, {
    timestamps: true  
})

module.exports = mongoose.model('Bug', bugSchema);