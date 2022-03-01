const mongoose =    require('mongoose')
const validator =   require('validator')

mongoose.connect('mongodb+srv://AubieVikash:Aubergine2022@cluster0.bdpkh.mongodb.net/task-manager-api', {
    useNewUrlParser: true
})



const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('This is not a valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowercase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    age:{
        type: Number,
        default: 18,
        validate(value){
            if (value < 18){
                throw new Error('Age must be 18 or more')
            }
        }
    },
    gender:{
        type: String
    }
})


const user = new User({
    name: '  Jen Smith ',
    email: 'ABC.12@gmail.COM',
    password: 'helloWorld'
})

// user.save().then(()=>{
//     console.log(user)
// }).catch((error)=>{
//     console.log(error)
// })

const Task = mongoose.model('Task', {
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})


const task = new Task({
    task: '    Task 2  '
})


task.save().then(()=>{
    console.log(task)
}).catch((error)=>{
    console.log(error)
})