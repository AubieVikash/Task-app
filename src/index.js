const express =     require('express')
require('./db/mongoose')
const User =        require('./models/user')
const Task =        require('./models/task')

const app =  express()
const port = process.env.PORT || 3000


app.use(express.json())

//create user route
app.post('/user', (req, res)=>{
    const user = new User(req.body)
    // console.log(user)
    user.save().then(()=>{
        res.send(user)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})

//get all users
app.get('/users', (req, res)=>{
    User.find().then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

//get user by _id
app.get('/users/:id', (req, res)=>{
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send('no such user found')
        }

        res.send(user)
    }).catch((error)=>{
        res.status(500).send('something went wrong')
    })
})


//create task route
app.post('/task', (req, res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.send(task)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})

//get all tasks route
app.get('/tasks', (req, res)=>{
    Task.find().then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(404).send(error)
    })
})

//get task by _id route
app.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id

    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send('no such task found')
        }

        res.send(task)
    }).catch((error)=>{
        res.status(500).send('something went wrong')
    })
})


//seting up server
app.listen(port, ()=>{
    console.log(`server up and running on http://localhost:${port}`)
})