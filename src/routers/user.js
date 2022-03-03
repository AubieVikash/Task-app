const express =     require('express')
const { append } = require('express/lib/response')
const router =      new express.Router()
const User =        require('../models/user')
const auth =        require('../middleware/auth')



//create user route
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(500).send(error)
    }
})

// sign in user route
router.post('/users/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//log out user from a single session route
router.post('/users/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()

        res.send('Logged out!!')
    } catch (error) {
        res.status(500).send('something went wrong')
    }
})


//logout user of all sessions route
router.post('/users/logout/all', auth, async(req, res)=>{
    try {
        req.user.tokens = []

        await req.user.save()

        res.send('logged out of all sessions')
    } catch (error) {
        res.status(500).send('something went wrong')
    }
})



//get user profile
router.get('/users/profile', auth, async (req, res) => {

    try {
        res.status(201).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})


//update user by id route
router.patch('/users/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email','password']
    const isValidData = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidData){
        return res.status(400).send('Data to be updated is invalid')
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach((update)=> req.user[update] = req.body[update])

        await req.user.save()
        res.status(201).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})


//delete user by id route
router.delete('/users/profile', auth, async(req, res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //     return res.status(400).send('Profile not found')
        // }

        await req.user.remove()
        res.status(201).send('profile succesfully deleted')
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router

