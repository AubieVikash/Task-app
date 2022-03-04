const express =     require('express')
const router =      new express.Router()
const Task =        require('../models/task')
const auth =        require('../middleware/auth')


//create task route
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get all tasks route
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get task by _id route
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            res.status(404).send('something went wrong')
        }

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//update task by id route
router.patch('/tasks/:id', auth, async (req, res)=>{
    const allowedUpdates = ['task', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send('Data to be updated is not vaild')
    }

    try {
        const task = await Task.findById({ _id: req.params.id, owner: req.user._id})

        if(!task){
            res.status(400).send('something went wrong')
        }

        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


//delete task by id route
router.delete('/tasks/:id', auth, async (req, res)=>{
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(400).send('Task not found')
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router