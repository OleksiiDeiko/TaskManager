const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:String,
    completed:Boolean
})

module.exports = mongoose.model('task', taskSchema)