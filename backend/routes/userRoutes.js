const express = require('express')

//controler functions
const {signupUser, loginUser, loginAdmin, getUsers} = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/loginUser', loginUser)

router.post('/loginAdmin', loginAdmin)

//signup route
router.post('/signup', signupUser)

//get all users
router.get('/', getUsers)


module.exports = router