const mongoose = require('mongoose')


const Task = mongoose.model('Task', {
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})


module.exports = Task