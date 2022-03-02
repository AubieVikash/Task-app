const mongoose =    require('mongoose')
const validator =   require('validator')
const bcrypt =      require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
            if(value.toLowerCase().includes('password')){
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
    }
})

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return user
}


//middleware to bcrypt password before saving the user
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema)


module.exports = User