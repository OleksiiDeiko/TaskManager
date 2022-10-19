const task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-errors')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const newTask = await task.create(req.body)
    res.status(201).json({ newTask })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const oneTask = await task.findOne({ _id: taskID })
    if (!oneTask) {
        return next(createCustomError(`No task found with id ${taskID}`, 404))
    }
    res.status(200).json({ oneTask })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const oneTask = await task.findOneAndUpdate(
        { _id: taskID },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )
    if (!oneTask) {
        return next(createCustomError(`No task found with id ${taskID}`, 404))
    }
    res.status(200).json({ oneTask })

})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const oneTask = await task.findOneAndDelete({ _id: taskID })
    if (!oneTask) {
        return next(createCustomError(`No task found with id ${taskID}`, 404))
    }
    res.status(200).send()
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}