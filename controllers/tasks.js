const task = require('../models/task')
const getAllTasks = async (req, res) => {
    try {
        const tasks = await task.find({})
        res.status(200).json({ tasks })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createTask = async (req, res) => {
    try {
        const newTask = await task.create(req.body)
        res.status(201).json({ newTask })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const getTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const oneTask = await task.findOne({_id:taskID})
        if(!oneTask){
            return res.status(404).json({msg: `No task found with id ${taskID}`})
        }
        res.status(200).json({ oneTask })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const oneTask = await task.findOneAndUpdate(
            {_id:taskID}, 
            req.body, 
            {
                new:true, 
                runValidators:true,
            }
        )
        if(!oneTask){
            return res.status(404).json({msg: `No task found with id ${taskID}`})
        }
        res.status(200).json({ oneTask })
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const oneTask = await task.findOneAndDelete({_id:taskID})
        if(!oneTask){
            return res.status(404).json({msg: `No task found with id ${taskID}`})
        }
        res.status(200).send()
    } catch (err) {
        res.status(500).json({ msg: err })
    }
}




module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}