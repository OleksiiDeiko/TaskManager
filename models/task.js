const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'no name is given'],
        trim: true,
        maxlength:[20, 'name schould not be longer than 20 characters']
    },
    completed:{
       type:Boolean,
       default: false
    }
})

module.exports = mongoose.model('task', taskSchema)