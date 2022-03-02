const express =     require('express')
const { append } = require('express/lib/response')
const router =      new express.Router()
const User =        require('../models/user')



//create user route
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// sign in user route
router.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//get all users
router.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

//get user by _id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send('something went wrong')
        }

        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//update user by id route
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email','password']
    const isValidData = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidData){
        return res.status(400).send('Data to be updated is invalid')
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update)=> user[update] = req.body[update])

        await user.save()

        if (!user) {
            return res.status(400).send('something went wrong')
        }

        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


//delete user by id route
router.delete('/users/:id', async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(400).send('User not found')
        }

        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router

