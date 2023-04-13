const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = mongoose.model('Task')

// create task
router.post('/tasks', async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            priority: req.body.priority
        })
        await task.save()
        res.send(task)
    }
    catch (err) {
        res.status(422).send(err.message)
    }   
})

// get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    }
    catch (err) {
        res.status(422).send(err.message)
    }
})

// Mark task as completed
router.patch('/tasks/:id/complete', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            completed: true
        }, { new: true })
        res.send(task)
    }
    catch (err) {
        res.status(422).send(err.message)
    }
})

// Mark task as canceled
router.patch('/tasks/:id/cancel', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            canceled: true
        }, { new: true })
        res.send(task)
    }
    catch (err) {
        res.status(422).send(err.message)
    }
})

// Delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    }
    catch (err) {
        res.status(422).send(err.message)
    }
})

module.exports = router