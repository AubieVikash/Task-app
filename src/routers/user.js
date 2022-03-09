const express =     require('express')
const { append } =  require('express/lib/response')
const User =        require('../models/user')
const auth =        require('../middleware/auth')
const multer =      require('multer')
const sharp =       require('sharp')
const router =      new express.Router()



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



const upload = multer({
    limits: {
        fileSize: 1000000,
        },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload an image'))
        }

        cb(undefined, true)
    }
})


//add user profile picture
router.post('/users/profile/avatar', auth, upload.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send('Image uploaded successfully')
}, (error, req, res, next)=>{
    res.status(400).send({error: error.message})
})


//delete user profile picture
router.delete('/users/profile/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

//get user avatar
router.get('/users/:id/avatar', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(user.avatar)

    } catch (error) {
        res.status(404).send()   
    }
})


module.exports = router

