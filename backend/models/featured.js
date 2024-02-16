const mongoose = require('mongoose')

const featured = mongoose.Schema({
    featuredBlog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

module.exports = mongoose.model('Featured', featured)