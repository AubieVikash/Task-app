const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     res.status(503).send('Site under maintenance. Try back in some time')
// })

app.use(express.json())
app.use(
    userRouter, 
    taskRouter,
)


//setting up server
app.listen(port, () => {
    console.log(`server up and running on http://localhost:${port}`)
})