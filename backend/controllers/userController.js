const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// steps 
// Existing user check 
// Hashed Password 
// User Creation 
// Token Generate 

const getUsers = async (req, res) =>{
    // const user_id = req.user._id

    const users  = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

//login user
const loginUser = async (req, res) =>{

    const {email, password} = req.body;

    try{
        const user = await User.loginUser(email, password)

        //create a token 
        const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET)

        res.status(200).json({user: user, token: token})
    }catch (error){
        res.status(400).json({error: error.message})
    }   
}

const loginAdmin = async (req, res) =>{

    const {email, password, secretKey} = req.body;

    try{
        const user = await User.loginAdmin(email, password, secretKey)

        //create a token 
        const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET)

        res.status(200).json({user: user, token: token})
    }catch (error){
        res.status(400).json({error: error.message})
    }   

}

//signup user
const signupUser = async (req, res) =>{

    // const {email, firstName, lastName, password, country, userType, secretKey} = req.body

    // try{
    //     const existingUser = await User.findOne({email: email});
    //     if(existingUser){
    //         return res.status(400).json({message: "User already exists"});
    //     }
    //     const hashedPasssword = await bcrypt.hash(password, 10);

    //     const result = await User.signup({
    //         email: email,
    //         firstName: firstName,
    //         lastName: lastName,
    //         password: hashedPasssword,
    //         country: country,
    //         userType: userType, 
    //         secretKey: secretKey
    //     })

    //     //create a token 
    //     const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET)

    //     res.status(200).json({user: result, token: token})
    // }catch (error){
    //     res.status(400).json({error: error.message})
    // }   

    const {email, firstName, lastName, password, userType, secretKey} = req.body

    try{
        const user = await User.signup(email, firstName, lastName, password, userType, secretKey)

        //create a token 
        const token = createToken(user._id)
        // const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET)

        res.status(200).json({email, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }  

}

module.exports = {signupUser, loginUser, loginAdmin, getUsers}