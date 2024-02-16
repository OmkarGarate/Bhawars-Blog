require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const featuredRoutes = require('./routes/featuredRoutes')
const bodyParser = require('body-parser');
const featured = require('./models/featured');

const app = express()
const PORT = process.env.PORT
const DB = process.env.URI

mongoose.connect(DB)
    .then(() => {
        console.log('Connected to database & listening to port ', PORT)
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())//to use body of request(req.body())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'));

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/blogs', blogRoutes)
app.use('/users', userRoutes)
app.use('/featured', featuredRoutes)

app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)
})
