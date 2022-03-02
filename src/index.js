const express =     require('express')
require('./db/mongoose')
const User =        require('./models/user')
const Task =        require('./models/task')

const app =  express()
const port = process.env.PORT || 3000


app.use(express.json())

//create user route
app.post('/user', async (req, res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get all users
app.get('/users', async (req, res)=>{

    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get user by _id
app.get('/users/:id', async (req, res)=>{
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send('something went wrong')
        }

        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


//create task route
app.post('/task', async (req, res)=>{
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get all tasks route
app.get('/tasks', async (req, res)=>{
    try {
        const tasks = await Task.find()
        res.status(201).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get task by _id route
app.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if(!task){
            res.status(400).send('something went wrong')
        }

        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


//setting up server
app.listen(port, ()=>{
    console.log(`server up and running on http://localhost:${port}`)
})