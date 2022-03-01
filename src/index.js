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
        res.status(200).send(user)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})


//create task route
app.post('/task', (req, res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(200).send(task)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})


//seting up server
app.listen(port, ()=>{
    console.log(`server up and running on http://localhost:${port}`)
})