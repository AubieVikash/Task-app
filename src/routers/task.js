const express =     require('express')
const router =      new express.Router()
const Task =        require('../models/task')


//create task route
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get all tasks route
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(201).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get task by _id route
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            res.status(400).send('something went wrong')
        }

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//update task by id route
router.patch('/tasks/:id', async (req, res)=>{
    const allowedUpdates = ['task', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send('Data to be updated is not vaild')
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!task){
            res.status(400).send('something went wrong')
        }

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


//delete task by id route
router.delete('/tasks/:id', async (req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(400).send('Task not found')
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router