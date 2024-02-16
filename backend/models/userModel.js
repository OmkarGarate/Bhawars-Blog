const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    userType:{
        type: String,
        required: true
    },
    secretKey:{
        type: String,
        default: ""
    }
})

//static signup method
userSchema.statics.signup = async function(email, firstName, lastName, password, userType, secretKey){

    //validation
    if(!email || !password)
    {
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash,
            userType: userType, 
            secretKey: secretKey
    })

    return user

}

//static login method
userSchema.statics.loginUser = async function(email, password){ 
    //validation
    if(!email || !password)
    {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)
    

    if(!match){
        throw Error('Incorrect password')
    }

    return user


}

//static login method
userSchema.statics.loginAdmin = async function(email, password, secretKey){
    //validation
    if(!email || !password || !secretKey)
    {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email, secretKey})

    if(!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user


}

module.exports = mongoose.model('User', userSchema)
